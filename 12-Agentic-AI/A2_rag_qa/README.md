# A2 — Document Q&A System (RAG)

A Retrieval-Augmented Generation system that answers questions about three different technical documents, with evidence that it works: a chunking comparison, a retrieval upgrade that fixes a real failure, and RAGAS scores for the baseline and the upgrade.

**Pipeline:** ingest → clean → chunk (×2 strategies, compared) → embed → index (ChromaDB) → retrieve (dense **or** hybrid BM25 + dense) → generate (Groq) → evaluate (RAGAS)

---

## 1. Setup

```bash
cd A2_rag_qa
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
echo "GROQ_API_KEY=your_key_here" > .env     # never commit this file
```

Run the pipeline step by step:

| Command | What it does |
|---|---|
| `python ingest.py` | Reads the 3 PDFs and prints the characters per document |
| `python compare_chunking.py` | Compares fixed-size vs recursive chunking → `results/chunking_comparison.md` |
| `python index.py` | Embeds the recursive chunks and stores them in ChromaDB (`chroma_db/`) |
| `python hybrid.py` | Shows vector vs BM25 vs hybrid ranking for one exact-term question |
| `python rag.py` | Ask your own question (hybrid retrieval + Groq answer) |
| `python evaluate.py` | Runs the 10-question RAGAS evaluation for dense and hybrid → `results/` |

The first run downloads the embedding model `all-MiniLM-L6-v2` (~90 MB).

## 2. Files

| File | Role |
|---|---|
| `ingest.py` | Load PDFs with `pypdf`, remove the repeated website menu, join one-word lines |
| `chunking.py` | Strategy 1: fixed-size chunking (500 chars, 50 overlap) |
| `recursive_chunking.py` | Strategy 2: recursive chunking (500 chars, 50 overlap) |
| `compare_chunking.py` | Side-by-side numbers for both strategies |
| `index.py` | ChromaDB storage + MiniLM embeddings |
| `hybrid.py` | BM25 keyword ranking + vector ranking, fused with Reciprocal Rank Fusion |
| `rag.py` | Retrieval + grounded answer generation (`mode="dense"` or `mode="hybrid"`) |
| `eval_set.json` | 10 question / ground-truth pairs |
| `evaluate.py` | RAGAS evaluation (4 metrics) for both retrieval modes |
| `results/` | Chunking table, generated answers, raw RAGAS CSVs, score summary |
| `EXAMPLE_RUN.md` | Example question/answer transcript |
| `ERRORS.md`, `reels/`, `DAY-1-*.md` | My learning notes (errors I hit, visual explainers, daily summary) |

## 3. Documents and why

| Document | Pages | Topic | Why it is useful for retrieval |
|---|---|---|---|
| `docs/catalyst_data_store.pdf` | 11 | Zoho Catalyst Data Store (cloud relational DB) | Product documentation in prose and bullet lists |
| `docs/chromadb_getting_started.pdf` | 6 | ChromaDB getting-started guide | Mixes prose with Python code blocks |
| `docs/groq_rate_limits.pdf` | 3 | Groq API rate limits | Dense tables of model IDs and numbers (`openai/gpt-oss-20b 30 1K 8K 200K`) and HTTP header names |

The three are genuinely different (a database product, a vector DB tutorial, an API policy), so retrieval has to pick the right source. The Groq document is deliberately the hard case: its answers live in table rows of IDs and numbers, which is where pure embedding search struggles.

**Data-quality finding:** the Catalyst PDF was saved from a website. Every one of its 11 pages ended with the same ~30-line navigation menu (`STORAGE, Tables, Columns, ZCQL, Cron…`), and the text came out one word per line. `ingest.py` detects lines that **every** page ends with and removes them, then joins the one-word lines. This cut the Catalyst text from **6,890 to 3,299 characters**: more than half of it was menu text that would otherwise have been embedded as "content".

## 4. Chunking: two strategies compared

Both strategies use the same size (500 characters) and overlap (50), so the only difference is **where** they cut.

| Strategy | Chunks | Avg size | Smallest | Biggest | Starts in the middle of a word |
|---|---|---|---|---|---|
| Fixed-size (`CharacterTextSplitter`, `separator=""`) | 24 | 451 | 59 | 500 | **15 of 24** |
| Recursive (`RecursiveCharacterTextSplitter`) | 26 | 389 | 37 | 500 | **0 of 26** |

Example boundary (same place in the Catalyst text, chunk 5):

| Strategy | How the chunk ends |
|---|---|
| Fixed-size | `…refer to these help pages: • Data St` ✂️ |
| Recursive | `…refer to these help pages: • Data Store - Java` ✅ |

And a real overlap example from the ChromaDB guide with fixed-size chunks: chunk 17 begins with `ctory create a new Python project…`, half of the word *directory*.

**Findings**

- Fixed-size cuts through a word in 62% of its chunks; recursive never does, because it tries paragraph breaks, then line breaks, then spaces, and only cuts mid-word as a last resort.
- Recursive produces slightly more, slightly smaller chunks (26 vs 24). The extra two are in the ChromaDB guide, where recursive keeps code lines together instead of filling every chunk to exactly 500 characters.
- Broken words hurt both embeddings and BM25: half-words like `ctory` or `St` are noise tokens.

**Decision:** the rest of the pipeline uses **recursive chunking**. Both functions stay in the repo and `compare_chunking.py` reproduces the table.

## 5. Vector database

**ChromaDB** (local, persistent, `chroma_db/`), with `all-MiniLM-L6-v2` sentence-transformer embeddings (384 dimensions). Each chunk is stored with its text and a `source` metadata label, so every answer can name the file it came from. `index.py` deletes and rebuilds the collection on each run, so re-running never duplicates chunks.

## 6. Advanced RAG technique: hybrid retrieval (BM25 + dense, RRF)

**Why this technique for these documents:** the Groq document is full of exact identifiers (`openai/gpt-oss-20b`, `openai/gpt-oss-safeguard-20b`, `x-ratelimit-limit-tokens`, `429`) and table rows of numbers. Dense embeddings capture *meaning*, but they blur exact IDs and numbers. Section 3.4 of the brief describes this case: "dense embeddings miss exact terms; documents mix natural language with IDs, codes, or jargon".

**The failure it fixes (observed, not assumed):**

Question: *"How many requests per minute is the limit for openai/gpt-oss-20b?"*

| Retrieval | Where the answer chunk ranked | Answer |
|---|---|---|
| Dense only | #6 (outside the top 4) | "I don't know based on the documents." ❌ |
| BM25 only | **#1** (exact tokens `gpt`, `oss`, `20b`) | — |
| **Hybrid (RRF)** | in the top 4 | "The limit is **30 requests per minute** for openai/gpt-oss-20b." ✅ |

**How it works:** take the top 10 from vector search and the top 10 from BM25 (`rank_bm25`), give each chunk `1 / (60 + rank)` points from each list (Reciprocal Rank Fusion), and keep the 4 chunks with the most points. A chunk that is good on meaning *and* on exact words rises to the top; a chunk that only one method finds can still get in.

## 7. Evaluation with RAGAS

**Setup:** 10 question / ground-truth pairs in `eval_set.json` (4 Catalyst, 3 ChromaDB, 3 Groq; ground truths are short facts, not model-style sentences). Each question is run through the pipeline twice, once with **dense** retrieval (baseline) and once with **hybrid** retrieval. The generator is `openai/gpt-oss-20b`; the RAGAS judge is a different, larger model, `openai/gpt-oss-120b`, with MiniLM embeddings for answer relevancy. All four core metrics are reported.

**Raw output:** `results/ragas_dense.csv`, `results/ragas_hybrid.csv` (per question), `results/answers_*.json` (answers + retrieved chunks), `results/ragas_summary.md`.

### Scores (mean of 10 questions)

| Retrieval | Faithfulness | Answer relevancy | Context recall | Context precision |
|---|---|---|---|---|
| Dense (baseline) | 0.725 | 0.814 | 0.900 | 0.808 |
| **Hybrid (BM25 + dense)** | **0.800** | **0.926** | **1.000** | **0.883** |
| Change | +0.075 | +0.112 | +0.100 | +0.075 |

### Per question

| # | Topic | Dense F / AR / CR / CP | Hybrid F / AR / CR / CP |
|---|---|---|---|
| 1 | Catalyst: ZCQL | 1.00 / 0.98 / 1.00 / 1.00 | 1.00 / 0.98 / 1.00 / 1.00 |
| 2 | Catalyst: OLAP | 1.00 / 1.00 / 1.00 / 1.00 | 1.00 / 1.00 / 1.00 / 1.00 |
| 3 | Catalyst: bulk operations | 1.00 / 0.91 / 1.00 / 0.33 | 1.00 / 0.91 / 1.00 / 0.50 |
| 4 | Catalyst: metrics | 1.00 / 0.96 / 1.00 / 1.00 | 1.00 / 0.96 / 1.00 / 1.00 |
| 5 | Chroma: default n_results | 0.50 / 0.70 / 1.00 / 1.00 | 1.00 / 0.96 / 1.00 / 1.00 |
| 6 | Chroma: unique IDs | 1.00 / 0.99 / 1.00 / 0.75 | 1.00 / 0.99 / 1.00 / 0.83 |
| 7 | Chroma: in-memory client | 0.75 / 0.85 / 1.00 / 1.00 | 1.00 / 0.81 / 1.00 / 1.00 |
| 8 | Groq: HTTP 429 | 0.50 / 0.95 / 1.00 / 1.00 | 0.50 / 0.95 / 1.00 / 1.00 |
| 9 | Groq: safeguard-20b RPM | **0.00 / 0.00 / 0.00 / 0.00** | 0.50 / 0.89 / **1.00** / 0.50 |
| 10 | Groq: x-ratelimit-limit-tokens | 0.50 / 0.82 / 1.00 / 1.00 | 0.00 / 0.83 / 1.00 / 1.00 |

F = faithfulness, AR = answer relevancy, CR = context recall, CP = context precision.

### Interpretation

**What is strong**

- **Retrieval coverage is complete with hybrid (context recall 1.00).** Every question had the chunk it needed in the top 4. The one dense miss (Q9, a model ID inside a table) is exactly the failure hybrid was added for: dense scored 0 on all four metrics and answered "I don't know"; hybrid retrieved the table row and answered "3 requests per minute" correctly.
- **The Catalyst and ChromaDB questions are solid** (Q1–Q7 faithfulness 1.00 with hybrid). Prose documents with clean text are easy for this pipeline once the website menu is stripped out.
- **No hallucination on out-of-scope questions.** The grounded prompt makes the model say "I don't know based on the documents" instead of answering from memory (see `EXAMPLE_RUN.md`).

**What is weak, and why**

- **Faithfulness on the Groq document (Q8–Q10: 0.50, 0.50, 0.00), even though all three answers are correct** and the right chunk was retrieved (recall 1.00). Two likely causes, visible in the data:
  1. Every answer ends with a citation line such as `Source: docs/groq_rate_limits.pdf`. RAGAS splits the answer into statements and checks each one against the retrieved text. The citation is not in the chunk text (the file name is metadata), so that statement counts as unsupported, which halves the score of a two-statement answer.
  2. The Groq PDF extracts badly: the table has no column headers in the text (`openai/gpt-oss-20b 30 1K 8K 200K`), and symbols turned into `�` (`Tokens Per Minute �TPM�`). The judge cannot confirm "30 is the requests-per-minute column" or "TPM" from that text, even though the generator inferred it correctly.
  So the low faithfulness here is mostly a **measurement and extraction** problem, not hallucination. A metric only shows *that* something is off; reading the rows showed *what*.
- **Context precision 0.50 on Q3 and Q9.** The right chunk was found but ranked second, behind a less useful chunk from the same document. This is a ranking problem, not a coverage problem.

**What I would fix next**

1. Put the source label inside each context passed to RAGAS (or drop the citation line from the answer text) so citations are no longer scored as unsupported claims.
2. Extract the Groq table properly (a table-aware parser, or rebuild each row as `model: X, RPM: 30, RPD: 1K, TPM: 8K, TPD: 200K`) and replace the `�` symbols.
3. Add a cross-encoder **reranker** after hybrid retrieval to push the best chunk to rank 1 and raise context precision.
4. Grow the evaluation set beyond 10 questions; with 10, one question moves a mean by 0.1.

## 8. Example run

See [`EXAMPLE_RUN.md`](EXAMPLE_RUN.md).
