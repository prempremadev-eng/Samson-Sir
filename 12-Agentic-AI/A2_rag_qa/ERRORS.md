# A2 RAG Q&A — Error Collection 🐞

Every error I hit while building A2, with the reason (WHY) and the fix.
(Setup errors from earlier → see `00-SETUP-NOTES.md`)

## 📋 Summary

| # | Date | File : Line | Error message | Type |
|---|---|---|---|---|
| 1 | 13 Oct | `ingest.py` (location) | — (file was inside `docs/`) | Wrong path |
| 2 | 13 Oct | `ingest.py:2` | `NameError: name 'docs' is not defined` | Missing quotes |
| 3 | 13 Oct | `ingest.py:3` | (no error, but no output) | Missing print |
| 4 | 13 Oct | `ingest.py:11-16` | `IndentationError: expected an indented block after 'for' statement on line 11` | Missing indent |
| 5 | 13 Oct | `ingest.py:14` | `SyntaxError: expected ':'` (shows after fixing #4) | Missing colon |
| 6 | 13 Oct | `ingest.py:17` | `SyntaxError: 'return' outside function` (shows after fixing #4, #5) | Missing indent |
| 7 | 13 Oct | `ingest.py:4` | No error! But `FileNotFoundError` later with a strange joined path | Missing comma |
| 8 | 13 Oct | `chunking.py:15` | No error! But only 16 chunks (only 1 book was cut) | Wrong indent (too much) |
| 9 | 13 Oct | `recursive_chunking.py:24` | `TypeError: repr() takes exactly one argument (60 given)` | Extra symbol `*` |
| 10 | 13 Oct | `compare_chunking.py` (location) | `can't open file '.../A2_rag_qa/compare_chunking.py': No such file or directory` | Wrong path (file inside `results/`) |

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

## Error 4 — Missing indent inside `for` ↔️

**Error message**
```
  File "ingest.py", line 12
    reader = PdfReader(path)
    ^
IndentationError: expected an indented block after 'for' statement on line 11
```

❌ **Wrong**
```python
    for path in files:
    reader = PdfReader(path)      # same level as "for"
```

✅ **Right**
```python
    for path in files:
        reader = PdfReader(path)  # 4 more spaces
```

**Why (simple English):** Python uses **spaces** to know what is *inside* a `for`, `def` or `if`. A line ending with `:` is like opening a door 🚪. Everything that belongs inside must move **4 spaces to the right**. If nothing is inside, Python says "the room is empty!" → IndentationError.

---

## Error 5 — Missing `:` after `for` 🚪

❌ **Wrong**
```python
for page in reader.pages
```

✅ **Right**
```python
for page in reader.pages:
```

**Why (simple English):** The `:` tells Python "the inside part starts on the next line". Every `for`, `if`, `def`, `while` line must end with `:`.

---

## Error 6 — `return` outside the function 🏠

❌ **Wrong**
```python
def load_documents():
    documents = []
    ...
return documents          # at the left edge = outside the function
```

✅ **Right**
```python
def load_documents():
    documents = []
    ...
    return documents      # 4 spaces = inside the function
```

**Why (simple English):** `return` means "the cook gives the plate back". It must be **inside** the kitchen (the function). At the left edge it is outside the kitchen, and Python does not know which function to return from.

---

## Error 7 — Missing comma in a list (silent bug!) 🤫

❌ **Wrong**
```python
files = [
    "docs/catalyst_data_store.pdf"        # no comma
    "docs/chromadb_getting_started.pdf",
    "docs/groq_rate_limits.pdf",
]
```
Python silently joins the two texts into **one**:
`"docs/catalyst_data_store.pdfdocs/chromadb_getting_started.pdf"`
→ only **2** items in the list, and the first path does not exist → `FileNotFoundError`.

**Real error I got**
```
  File "ingest.py", line 20, in <module>
    docs =  load_documents()
  File "ingest.py", line 12, in load_documents
    reader = PdfReader(path)
  ...
FileNotFoundError: [Errno 2] No such file or directory: 'docs/catalyst_data_store.pdfdocs/chromadb_getting_started.pdf'
```
Notice: the error points to **line 12**, but the real mistake is on **line 4**.

✅ **Right**
```python
files = [
    "docs/catalyst_data_store.pdf",
    "docs/chromadb_getting_started.pdf",
    "docs/groq_rate_limits.pdf",
]
```

**Why (simple English):** In a list, the comma separates the items. Without it, Python sticks two texts together and gives **no warning**. This is the most dangerous kind of bug: no error at the place of the mistake.

---

## Error 8 — `return` inside the loop (silent bug!) 🤫

**What happened:** No error, but `Fixed-size chunks: 16`. Only the **first** book (Catalyst) was cut. ChromaDB and Groq were never cut.

❌ **Wrong**
```python
    for doc in documents:
        pieces = splitter.split_text(doc["text"])
        for piece in pieces:
            chunks.append({"source": doc["source"], "text": piece})
        return chunks          # 8 spaces = inside the "for doc" loop
```

✅ **Right**
```python
    for doc in documents:
        pieces = splitter.split_text(doc["text"])
        for piece in pieces:
            chunks.append({"source": doc["source"], "text": piece})
    return chunks              # 4 spaces = after the loop finishes
```

**Why (simple English):** `return` means "stop and go home now" 🏠. Inside the loop, the function goes home after **book 1** and never comes back for books 2 and 3. After the loop (4 spaces), it goes home only when **all** books are done.

**How I could catch it:** 6890 characters ÷ ~450 = ~16. That is the size of **one** book, not three. **Always check if the number makes sense!**

---

## Error 9 — An extra `*` breaks the text into 60 pieces ⭐

**Error message**
```
  File "recursive_chunking.py", line 24, in <module>
    print("Recursive :",repr(*recursive[5]["text"][-60:]))
TypeError: repr() takes exactly one argument (60 given)
```

❌ **Wrong**
```python
print("Recursive :", repr(*recursive[5]["text"][-60:]))
```

✅ **Right**
```python
print("Recursive :", repr(recursive[5]["text"][-60:]))
```

**Why (simple English):** In Python, a `*` in front of a value inside `( )` means **"open the bag and pour everything out"**. A text of 60 letters becomes **60 separate letters**. `repr()` can take only **1** thing, but it got **60** → TypeError.

**How to read this error:** "takes exactly one argument (60 given)" → I gave 60 things instead of 1 → look for something that splits one value into many → the `*`.

---

## Error 10 — Code file inside the `results/` folder (again!) 📂

**Error message**
```
can't open file '/home/prem/.../A2_rag_qa/compare_chunking.py': [Errno 2] No such file or directory
```

❌ **Wrong**
```
A2_rag_qa/
└── results/
    └── compare_chunking.py   ← code file in the output folder
```

✅ **Right**
```
A2_rag_qa/
├── compare_chunking.py       ← code files stay in the main folder
└── results/                  ← only the saved tables go here
```

**Fix command**
```bash
mv results/compare_chunking.py .
```

**Why (simple English):** Same as Error #1. When I create a new file, VS Code puts it in the folder that is **selected** in the sidebar. I had `results/` selected. Python looks for the file in the folder where I run the command, so it could not find it.

**Tip:** Before creating a file, click on the **main project folder** in the sidebar. Or check with `ls` that the file is where I think it is.

---

## 🧠 My mistake patterns

| Mistake type | Count | Tip to myself |
|---|---|---|
| Missing quotes | 1 | File paths and words are text → `" "` |
| Wrong path / missing `/` | 2 (+1 in setup) | Run `pwd` first: "Where am I?" · click the main folder before "New File" |
| Missing print | 1 | No `print()` = no output |
| Missing indent | 2 | After a line ending in `:` → move right 4 spaces |
| Too much indent | 1 | `return` goes **after** the loop, not inside it |
| Extra symbol (typo) | 1 | Compare my line with the line above it, character by character |
| Missing colon `:` | 1 | `for` / `if` / `def` lines end with `:` |
| Missing comma | 1 | Every item in a list ends with `,` |
