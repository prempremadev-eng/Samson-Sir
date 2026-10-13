# A2 RAG Project — My Learning Plan 📚

Goal: understand **every line** of the A2 project, and explain it without notes.
Plan made: 13 Oct 2026 · Start: after submitting A2 (14 Oct)
Pace: **2–3 hours a day → ~15 days** (4–5 hours a day → ~8 days)

Tick a box `[x]` when a day is done.

---

## 🧱 What I need to know first (prerequisites)

### Layer 1: Python basics 🐍

| Concept | Used in the project as | Status on 13 Oct |
|---|---|---|
| Variables, strings | `text = ""`, `"docs/..."` | ✅ Learned |
| Lists `[ ]` | `files = [...]`, `chunks = []` | ✅ Learned (Error #7: missing comma) |
| Dictionaries `{ }` | `{"source": ..., "text": ...}` | 🟡 Used, not studied |
| `for` loops, loop inside a loop | each book → each page | ✅ Learned |
| `if / else` | `if mode == "hybrid":` | 🟡 |
| Functions: `def`, `return` | `load_documents()` | ✅ Learned (Error #8: return inside loop) |
| `import` from my own files | `from ingest import load_documents` | 🟡 |
| f-strings | `f"chunk-{number}"` | ❌ |
| List comprehension | `[c["text"] for c in chunks]` | ❌ |
| Read / write files, JSON | `eval_set.json`, `results/` | ❌ |

### Layer 2: Tools 🛠️

| Concept | Status |
|---|---|
| Terminal: `cd`, `ls`, `mv`, `pwd` | ✅ |
| `.venv`, `pip install`, `source .venv/bin/activate` | ✅ |
| `.env` + API key safety | ✅ |
| Git: add, commit, push | 🟡 |

### Layer 3: AI concepts 🤖

| Concept | Simple meaning | Status |
|---|---|---|
| LLM + API call | Sending a message to the "cook" over the internet | 🟡 (from A1) |
| Prompt | The instructions I give the LLM | 🟡 (from A1) |
| Chunking | Cutting text into small cards | ✅ |
| Embedding | Text → numbers that describe meaning | ❌ |
| Similarity / distance | How close two meanings are | ❌ |
| Vector database | A shelf sorted by meaning | ❌ |
| BM25 | Search by exact words | ❌ |
| RRF | Combine two ranked lists with points | ❌ |
| RAGAS | A critic giving marks to answers | ❌ |

---

## 📅 Phase 1: Python foundations (5 days)

**Why first:** the M3–M7 code is full of these. Without them, every line looks like magic.

- [ ] **Day 1 — Dictionaries.** Playground: a hotel menu `{"dosa": 40, "idli": 20}` → get, add, loop over items.
- [ ] **Day 2 — if / else + f-strings.** Playground: `if price > 30:` print `f"{item} is costly"`.
- [ ] **Day 3 — List comprehension.** Playground: `[price * 2 for price in prices]`, then `[c["text"] for c in chunks]`.
- [ ] **Day 4 — Files + JSON.** Playground: save the menu to `menu.json`, read it back.
- [ ] **Day 5 — Import from my own file.** Playground: `menu.py` → `from menu import get_price`, and why `if __name__ == "__main__":` matters.

## 📅 Phase 2: AI concepts, each one alone (4 days)

**Why:** learn each idea small and separate before seeing it inside the project.

- [ ] **Day 6 — Embeddings + distance.** Playground: embed 3 sentences ("dosa is tasty", "idli is soft", "cars are fast") and see which two are closest.
- [ ] **Day 7 — ChromaDB alone.** Playground: add 5 sentences to a collection, query it, read `distance`.
- [ ] **Day 8 — BM25 + RRF alone.** Playground: rank 5 sentences by exact words, then fuse two ranked lists by hand on paper.
- [ ] **Day 9 — RAGAS scores.** Read `results/ragas_hybrid.csv`: what do faithfulness, answer relevancy, context recall and context precision mean? Why did Q10 get faithfulness 0?

## 📅 Phase 3: Project walk-through, one file a day (6 days)

**How:** I retype each file from scratch with hints, compare with the working version, then make a reel 🎬.

- [ ] **Day 10 — `ingest.py`** (with the new menu-cleaning part)
- [ ] **Day 11 — `recursive_chunking.py` + `compare_chunking.py`** (playground `recursive_debug.py` first)
- [ ] **Day 12 — `index.py`** (embeddings + ChromaDB)
- [ ] **Day 13 — `rag.py`** (prompt + Groq, why "I don't know")
- [ ] **Day 14 — `hybrid.py`** (BM25 + RRF)
- [ ] **Day 15 — `evaluate.py` + `README.md`** (RAGAS run, reading the results)
- [ ] ⭐ **Final test — explain the whole project without notes**

---

## 🔁 Every day looks like this

| Time | Do |
|---|---|
| 10 min | Recall quiz on yesterday (no peeking) 🧠 |
| 20 min | **Why** is this needed? Hotel story 🏨 |
| 60–90 min | Playground: I type, guess the output, run 🧪 |
| 20 min | Notes (Tamil + English) + push |
| 10 min | Spoken English lines 🗣️ |

Errors → `ERRORS.md` 🐞 · Time → `TIME-LOG.md` ⏱️

## ⚖️ Total

| Phase | Days | Hours |
|---|---|---|
| 1. Python foundations | 5 | ~12 |
| 2. AI concepts | 4 | ~10 |
| 3. Project walk-through | 6 | ~15 |
| **Total** | **~15** | **~37** |

**To start a day:** `cd ~/Documents/Samson-Sir/12-Agentic-AI` → `claude --continue` → say **"learning start"** 🚀
