# 🐛 ERROR LOG – Naan face panna errors

Daily update aagum. Ovvoru error-um: **enna error → yen vandhuchu → eppadi fix → lesson**.

**Category:**
⌨️ **Typo** (spelling / capital / missing letter) · 🔣 **Syntax** (comma, quote, bracket) · 🧠 **Logic** (code order / idam thappu) · 📚 **Concept** (puriyaama) · 🛠️ **Tool / Env** (terminal, port, folder, git)

---

## 📊 Summary (till 2026-10-08)

| Category | Count | Most common |
|---|---|---|
| ⌨️ Typo | 9 | Missing `s` (`startWith`, `req.header`), capital letters (`Content-Type`, `InTime`), extra letter (`getPageedRows`) |
| 🔣 Syntax | 5 | **Comma missing** (3 times!), quote missing |
| 🧠 Logic | 5 | Code thappaana idathula (`fetch` in `if`, `return` order) |
| 📚 Concept | 4 | Scope (React variable kitchen la), `.on` event names |
| 🛠️ Tool / Env | 9 | **Ctrl + Z** (3 times!), wrong folder, port 3000 busy |
| **Total** | **32** | |

⭐ **Top 3 repeat mistakes:**
1. **Ctrl + Z ≠ stop** → stop = **Ctrl + C** (3 times)
2. **Comma `,` missing** between arguments / object properties (3 times)
3. **Wrong folder** (init in `~`, `.env` in `functions/`) → command / file munnaadi **`pwd`** paaru

---

## 📅 2026-10-05 — catalyst init / serve

| # | Error / Problem | Yen vandhuchu | Fix | Category | Lesson |
|---|---|---|---|---|---|
| 1 | `catalyst init` home folder (`/home/prem`) la run aachu — "You are initializing your home directory" | Terminal close aagi, pudhu terminal `~` la open aachu, `cd` marandhen | Files-a `my-vehicle-app` ku move, home la cleanup | 🛠️ | Command munnaadi **prompt / `pwd`** paaru |
| 2 | `[1]+ Stopped catalyst init` | **Ctrl + Z** press panninen (stop nu ninaichu) | `kill %1` | 🛠️ | Ctrl + Z = **pause**. Stop = **Ctrl + C** |
| 3 | `catalyst logout` → "are you sure?" ku `No` / `a` type | Prompt padikkaama type | `Y` → Enter | 🛠️ | Prompt-a padi, `(Y/n)` |

## 📅 2026-10-06 — Playground + getBody

| # | Error / Problem | Yen vandhuchu | Fix | Category | Lesson |
|---|---|---|---|---|---|
| 4 | `json.js` run pannina output illa | `console.log` illa | `console.log(...)` add | 📚 | Print panna dhaan theriyum |
| 5 | `text.name` → `undefined` | `'{...}'` = string, object illa | `JSON.parse(text)` | 📚 | Quotes kulla = text (dosai photo 📷🥞) |
| 6 | `typeOf` | Capital O | `typeof` (small) | ⌨️ | Keywords ellam small letters |
| 7 | `5-events.js`: "Ellam vanthuchu" ovvoru thundu-kkum print | Rendu `.on('data')` — 2nd `'end'` aa irukkanum | `req.on('end', …)` | 📚 | Event name correct ah irukkanum |
| 8 | `{"name":"prem}` (thappaana JSON) | `'"prem}'` la `"` missing | `'"prem"}'` | 🔣 | String value `"` la start & end |
| 9 | `TypeError: req.end is not a function` (2 times!) | `.emit` badhila `.end` | `req.emit('end')` | ⌨️ | EventEmitter la `.on` & `.emit` mattum |
| 10 | `ReferenceError: getbody is not defined` | Small `b` | `getBody` | ⌨️ | JavaScript case-sensitive |
| 11 | Test 3 la `req` use (req3 create panni) | Copy panni variable per maathala | `req3.emit(...)` | ⌨️ | Copy pannum bodhu per maathu |
| 12 | `ReferenceError: datra is not defined` → `data is not defined` | `}(datra)` — function kadaisi la extra `(…)` | `}` mattum | 🔣 | Function define = `}` podhum. `data` function kulla mattum (scope) |

## 📅 2026-10-07 — Part 3 (GET) + Part 4 (POST)

| # | Error / Problem | Yen vandhuchu | Fix | Category | Lesson |
|---|---|---|---|---|---|
| 13 | `problem : table.getPageedRows is not a function` | Extra `e` | `getPagedRows` | ⌨️ | `catch` pidichudhu 🛡️ — log padi |
| 14 | Response work aachu, aana `content-type` label illa (`curl -i`) | `'contentType'` → `'ContentType'` | `'Content-Type'` | ⌨️ | Working line-la irundhu **copy** pannu |
| 15 | DevTools la entry_api request theriyala | Network filter **Images** la irundhuchu | **All** filter | 🛠️ | Filter check pannu |
| 16 | Type `plain` (json illa) | Browser cache | **Ctrl + Shift + R** | 🛠️ | Hard refresh |
| 17 | `SyntaxError: missing ) after argument list` | `console.log('…' row.ROWID)` — `,` missing | `'…', row.ROWID` | 🔣 | Rendu argument naduvula `,` |
| 18 | `500: Empty row cannot be updated` | curl JSON la `phoneNumber:` key ku `"` illa → parse fail → getBody `{}` → kaali row | `"phoneNumber":` | 🔣 | Error message → chain pinnaadi pogu 🔗 |

## 📅 2026-10-08 — 5.5 React fetch + CORS

| # | Error / Problem | Yen vandhuchu | Fix | Category | Lesson |
|---|---|---|---|---|---|
| 19 | `git push`: `src refspec main does not match any` | Commit pannaama push | `git commit` → `git push` | 🛠️ | add → commit → push 📦 |
| 20 | `.env.development` work aagala | `functions/entry_api/` la create panninen | `my-vehicle-app/` ku move | 🛠️ | Vite `package.json` folder la mattum thedum |
| 21 | `fetch` validation `if` kulla | Idam thappu — kaali form na mattum anuppum | `if` ku veliya, keezha | 🧠 | Code **endha condition** la odudhu nu paaru |
| 22 | `fetch(URL = import.meta…)` | `URL =` thevai illa | Value nere | 🧠 | Built-in `URL`-a overwrite pannaadha |
| 23 | `Parsing error: Unexpected token body` | `headers:{…}` ku apram `,` missing | `,` add | 🔣 | Object properties naduvula `,` |
| 24 | "added" vandhuchu, **200**, row illa 🤥 | `import.meta.VITE_API_BASE` (`.env` missing) → `fetch(undefined)` → `5174/undefined` → Vite 200 | `import.meta.env.VITE_API_BASE` | ⌨️ | **200 ≠ success** — Network **Request URL** paaru |
| 25 | `Unreachable code` (ESLint) — error vandhaalum "added" | `return setSuccess…` ok check-ku munnaadi | ok check mela, success keezha | 🧠 | `return` = stop 🛑 |
| 26 | Error guard la error theriyala | `setSuccess(emptyForm)`, `setError('')`, `return` illa | `setSuccess('')`, delete, `return` | 🧠 | Guard pattern: error → success kaali → return 💂 |
| 27 | `catalyst server` / `catalyst serv` → `unknown command` | Typo | `catalyst serve` | ⌨️ | "Did you mean serve?" — CLI hint padi |
| 28 | Serve 3001 / 3002 la start; curl timeout | **Ctrl + Z** (2 times) — thoongura serve port pidichu vechirundhuchu | `fg` → Ctrl + C / `kill %1 %2` | 🛠️ | Ctrl + Z la port **free aagaadhu** 🔒 |
| 29 | Serve 3001 (Ctrl + Z illaama kooda) | Port 3000 la **vera project** serve (Daily-Learning-Tracker) | Andha serve stop | 🛠️ | `ss -ltnp \| grep 3000` |
| 30 | 🚫 **CORS Missing Allow Origin** (OPTIONS) | React 5174 ≠ kitchen 3000, permission letter illa | `allowLocalhost` + OPTIONS 204 | 📚 | Port vera = origin vera → browser permission kekkum |
| 31 | `req.header.origin` / `origin.startWith` → TypeError | `s` missing (2 times) | `req.headers`, `startsWith` | ⌨️ | Plural / English spelling |
| 32 | `EntryType`, `InTime` kaali (+ `entryType is not defined`) | Column per small letter; `entryType` React variable kitchen la illa | `InTime: body.inTime`, `EntryType: body.entryType` | 📚 | Left = column per (capital), right = `body.*` (scope) |

---

## 🧰 Debug checklist (errors la irundhu kathukittadhu)

| Problem | Mudhalla paaru |
|---|---|
| Red error | **File per + line number** → error type → message |
| `TypeError: X is not a function` | Spelling (extra / missing letter) |
| `ReferenceError: X is not defined` | Spelling / capital / scope (variable endha file la?) |
| `SyntaxError` | Comma / quote / bracket — full file odaadhu |
| 500 | curl body `{"error":…}` + serve terminal kadaisi 🔍 log |
| 200 aanaa velai illa | Network → **Request URL** correct ah? |
| CORS 🚫 | Network → OPTIONS row → Response headers la `Access-Control-Allow-Origin`? |
| Port maarudhu | `ss -ltnp \| grep 3000` + `jobs` (Ctrl + Z?) |
| File work aagala | `pwd` — correct folder ah? |
