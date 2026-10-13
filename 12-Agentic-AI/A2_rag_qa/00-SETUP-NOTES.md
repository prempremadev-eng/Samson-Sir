# A2 RAG Q&A — Step 0: Setup Notes (13 Oct 2026)

Assignment: **Document Q&A System (RAG)** — due 14 Oct 2026, 9 am IST.
Ithu code ezhuthurathukku munnadi panna **setup** velai.

---

## 🏨 Story (hotel)

Hotel open pannurathukku munnadi:
- **Kitchen** ready pannanum → `.venv` (Python virtual environment)
- **Cooking tools** vaanganum → `pip install` (chromadb, langchain, groq…)
- **Secret recipe locker** → `.env` (GROQ_API_KEY)
- **"Veliya kaattaatha" list** → `.gitignore`
- **Menu books** store room la vaikkanum → `docs/` folder la 3 PDFs

Ithellam ready aana apram thaan cook (code) samaikka mudiyum.

---

## ✅ Enna pannen (timeline — file timestamps vachu)

| Time | Step | Command / File | Ethuku (WHY) |
|---|---|---|---|
| 09:13 | Folder create | `mkdir A2_rag_qa` | Assignment-ku thaniya idam |
| 09:14 | Virtual env | `python3 -m venv .venv` | Intha project packages vera project-a kalakkaama irukka |
| 09:30–09:53 | Modules install | `pip install ...` | Chroma, LangChain, Groq, sentence-transformers, pypdf, ragas, rank-bm25 |
| 09:33 | API key | `.env` → `GROQ_API_KEY=...` | Key-a code la ezhuthakkoodaathu (secret) |
| 09:48 | Ignore list | `.gitignore` → `.env`, `.venv/`, `chroma_db/` | Secret & periya folder GitHub-ku pogaama |
| 10:01 | Package list save | `pip freeze > requirements.txt` | Vera yaarum same setup panna (`pip install -r requirements.txt`) |
| 10:19–10:32 | 3 PDFs download | `docs/` | RAG-ku "menu books" |

Python version: **3.10.12**

### 📚 3 Documents (vera vera topic — rule 3.1 ✅)

| File | Pages | Topic |
|---|---|---|
| `docs/catalyst_data_store.pdf` | 11 | Zoho Catalyst Data Store (database) |
| `docs/chromadb_getting_started.pdf` | 6 | ChromaDB (vector database) |
| `docs/groq_rate_limits.pdf` | 3 | Groq API rate limits (numbers, model names) |

---

## ❌ Errors I faced & fix

| # | Enna pannen | Error / Problem | Kaaranam (WHY) | Fix |
|---|---|---|---|---|
| 1 | `docs/` ulla irunthu `ls -lh docs` | `cannot access 'docs': No such file or directory` | Naan already `docs` **ulla** irunthen. Ulla `docs` nu innoru folder illa | `cd ..` → parent folder-ku poyittu `ls -lh docs` |
| 2 | `cd .` | Onnum aagala | `.` = **ippo irukkura** folder. `..` = **parent** folder | `cd ..` use pannanum |
| 3 | `mv "docs/Getting Started - Chroma Docs.pdf" chromadb_getting_started.pdf` | File `docs/` la illa, **main folder**-ku poyiduchu | Destination la `docs/` **maranthutten** (missing `/` path — my common mistake!) | `mv chromadb_getting_started.pdf docs/` |
| 4 | File name la space (`Rate Limits - GroqDocs.pdf`) | Command la thappa pirinjidum | Shell space-a "next word" nu ninaikkum | `\ ` (backslash-space) illa `"quotes"` use pannanum. Best: space illaatha peru vachiten |
| 5 | `zoho catalyst data store introduction` | `.pdf` extension illa | Download pannum pothu extension varala | `mv "docs/zoho catalyst data store introduction" docs/catalyst_data_store.pdf` |

### 🧠 Kathukitta rules

| Rule | Example |
|---|---|
| `.` = ippo irukkura idam, `..` = oru step mela | `cd ..` |
| `mv` la **destination path** full-a kudu | `mv a.pdf docs/a.pdf` |
| File name la space vendaam, `_` use pannu | `groq_rate_limits.pdf` |
| Doubt-a irunthaa `pwd` → naan enga irukken? | `pwd` |

---

## 🇬🇧 English Notes

- I created a separate folder and a Python **virtual environment** so this project's packages don't clash with other projects.
- I installed the modules (ChromaDB, LangChain, Groq, sentence-transformers, pypdf, RAGAS, rank-bm25) and saved them with `pip freeze > requirements.txt`.
- I kept my API key in `.env` and added `.env` and `.venv/` to `.gitignore`, so secrets never go to GitHub.
- I downloaded 3 different documents and renamed them without spaces.
- Mistakes: I ran `ls docs` from inside `docs`, I forgot `docs/` in an `mv` destination, and one file had no `.pdf` extension.

### 🗣️ Spoken English practice

1. "First, I set up a virtual environment so my packages stay isolated."
2. "I never hard-code my API key; I keep it in a `.env` file."
3. "I got 'No such file or directory' because I was already inside the folder."
4. "I forgot the destination path, so the file moved to the wrong place."
5. "I renamed the files without spaces to avoid shell problems."
6. "I chose three documents on different topics so that retrieval has to tell them apart."
