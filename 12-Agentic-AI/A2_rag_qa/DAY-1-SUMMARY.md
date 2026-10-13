# Day 1 Summary — 13 Oct 2026 (A2 RAG Q&A)

⏱️ 11:04 → 17:46 (lunch 30 min, tea 15 min) ≈ **5 h 50 min** of work

## ✅ What I did

| Step | File | Result |
|---|---|---|
| Setup | `.venv`, `.env`, `.gitignore`, `requirements.txt`, `docs/` | 3 different PDFs ready |
| M1 | `ingest.py` | Reads all 3 PDFs → boxes with `source` + `text` (6890 / 3205 / 3265 characters) |
| M2 step 1 | `chunking.py` | Fixed-size chunks (500, overlap 50) → **32 chunks** |
| M2 step 2 | `recursive_chunking.py` | Recursive chunks → **32 chunks**. Line 24 still has the `*` typo (Error #9) |
| Visuals | `reels/` | Reel 1 (read one PDF), Reel 2 (read all PDFs), Reel 3 (fixed-size chunking) |
| Notes | `00-SETUP-NOTES.md`, `ERRORS.md` | 5 setup mistakes + 9 code errors with wrong/right code |

## 🐞 Errors today

| # | Error | Type |
|---|---|---|
| 1 | `ingest.py` inside `docs/` | Wrong path |
| 2 | `NameError: name 'docs'` | Missing quotes |
| 3 | No output | Missing print |
| 4 | `IndentationError` | Missing indent |
| 5 | `expected ':'` | Missing colon |
| 6 | `'return' outside function` | Missing indent |
| 7 | `FileNotFoundError` with joined path | Missing comma (silent) |
| 8 | Only 16 chunks | `return` inside the loop (silent) |
| 9 | `repr() takes exactly one argument (60 given)` | Extra `*` |

**Pattern:** most mistakes are small symbols: quotes, commas, colons, spaces. Biggest learning: **silent bugs** (#7, #8) show no error, so always check if the numbers make sense.

## 📊 Honest rating

| Area | Rating | Note |
|---|---|---|
| Concept | ⭐⭐⭐⭐☆ | Explained the whole `load_documents` flow in my own words, almost perfectly |
| Debugging | ⭐⭐⭐☆☆ | Traced the error from line 20 → 12 → list. Still need hints to find the root cause |
| Recall | ⭐⭐⭐☆☆ | Quiz: Q1 perfect, Q3 half, Q2 + bonus skipped |
| Typing | ⭐⭐☆☆☆ | Many small symbol mistakes (`,` `:` `*` indent) |
| Effort | ⭐⭐⭐⭐⭐ | Almost 6 hours, kept asking "why" |
| **Overall** | ⭐⭐⭐⭐☆ | Strong start. Speed is the risk for the deadline |

## ⏭️ Next session (start here)

1. Fix `recursive_chunking.py` line 24 (remove the `*`) → run → compare how chunk 5 ends
2. Playground: `playground/recursive_debug.py` (tiny text, see how the smart knife cuts)
3. M3 `index.py` → ChromaDB
4. M4 `rag.py` → Groq answer · M5 hybrid (BM25) · M6 RAGAS · M7 README

⚠️ **Deadline: 14 Oct, 9:00 am IST.** M3–M7 are still left.
