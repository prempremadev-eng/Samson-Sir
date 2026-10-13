# A2 RAG Q&A — Error Collection 🐞

Every error I hit while building A2, with the reason (WHY) and the fix.
(Setup errors from earlier → see `00-SETUP-NOTES.md`)

| # | Date / Time | File : Line | Error message | Kaaranam (WHY) | Fix | Type |
|---|---|---|---|---|---|---|
| 1 | 13 Oct | `ingest.py` (location) | — (file `docs/` folder-kulla create aachu) | Code file-a **menu book shelf (`docs/`)** la vachitten. `docs/` = PDFs mattum | `ingest.py`-a main `A2_rag_qa/` folder-ku move pannanum | Wrong path |
| 2 | 13 Oct | `ingest.py:2` | `NameError: name 'docs' is not defined` | File path-a **quotes illaama** ezhuthinen. Python `docs` oru variable nu ninaichu thedichu, kidaikkala | Path-a `" "` ulla podanum | Missing quotes |
| 3 | 13 Oct | `ingest.py:3` | (Error illa, aana output-um varaathu) | `reader.pages` mattum ezhuthinen. **Ennala (`len`)**, **print-um pannala** | `print(len(...))` | Missing print |

## 🧠 Patterns (en common mistakes)

| Mistake type | Count |
|---|---|
| Missing quotes | 1 |
| Wrong path / missing `/` | 1 (+1 in setup) |
| Missing print | 1 |
