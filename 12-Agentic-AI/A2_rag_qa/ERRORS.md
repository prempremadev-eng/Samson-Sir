# A2 RAG Q&A — Error Collection 🐞

Every error I hit while building A2, with the reason (WHY) and the fix.
(Setup errors from earlier → see `00-SETUP-NOTES.md`)

## 📋 Summary

| # | Date | File : Line | Error message | Type |
|---|---|---|---|---|
| 1 | 13 Oct | `ingest.py` (location) | — (file was inside `docs/`) | Wrong path |
| 2 | 13 Oct | `ingest.py:2` | `NameError: name 'docs' is not defined` | Missing quotes |
| 3 | 13 Oct | `ingest.py:3` | (no error, but no output) | Missing print |

---

## Error 1 — File in the wrong folder 📂

**What happened:** I created `ingest.py` inside the `docs/` folder.

❌ **Wrong**
```
A2_rag_qa/
└── docs/
    ├── groq_rate_limits.pdf
    └── ingest.py        ← code file in the PDF folder
```

✅ **Right**
```
A2_rag_qa/
├── ingest.py            ← code file in the main folder
└── docs/
    └── groq_rate_limits.pdf
```

**Fix command**
```bash
cd ~/Documents/Samson-Sir/12-Agentic-AI/A2_rag_qa
mv docs/ingest.py .
```

**Why (simple English):** The `docs/` folder is a bookshelf. Only the books (PDFs) go there. Code files stay in the main project folder. The `.` in `mv docs/ingest.py .` means "move it to the folder I am in now".

---

## Error 2 — Path without quotes ✍️

**Error message**
```
File "ingest.py", line 2, in <module>
    reader = PdfReader(docs/groq_rate_limits.pdf)
NameError: name 'docs' is not defined
```

❌ **Wrong**
```python
reader = PdfReader(docs/groq_rate_limits.pdf)
```

✅ **Right**
```python
reader = PdfReader("docs/groq_rate_limits.pdf")
```

**Why (simple English):** Without quotes, Python thinks `docs` is a variable (a box with a name). It looks for that box, cannot find it, and raises a **NameError**. With quotes, Python knows it is just **text**, the path to the file.

**Remember:** a file path is always text → always put it in `" "`.

---

## Error 3 — No print, no output 🔇

**What happened:** The program ran with no error, but the screen showed nothing.

❌ **Wrong**
```python
reader.pages
```

✅ **Right**
```python
print(len(reader.pages))
```
Output: `3`

**Why (simple English):** `reader.pages` only *gets* the pages. It does not count them or show them.
- `len( )` → **counts** the pages 🔢
- `print( )` → **shows** the result on the screen 📺

**Remember:** if you want to see something, you must `print()` it.

---

## 🧠 My mistake patterns

| Mistake type | Count | Tip to myself |
|---|---|---|
| Missing quotes | 1 | File paths and words are text → `" "` |
| Wrong path / missing `/` | 1 (+1 in setup) | Run `pwd` first: "Where am I?" |
| Missing print | 1 | No `print()` = no output |
