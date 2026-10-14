# 🚗 Revision 8 – Phase 6 (6.9 – 6.11) + Phase 7 Vehicle OUT

Date: 2026-10-14 · ~7 h 28 min
Files: `src/pages/Dashboard.jsx`, `src/pages/VehicleOut.jsx`, `src/App.css`, `functions/entry_api/index.js`
Playground: `10-filter.js`, `11-template.js`, `12-includes.js`, `13-status.js`

---

## 🗺️ Inniku full flow work aagudhu 🎉

```
1. Vehicle IN form  → insertRow ✍️              (Phase 5)
2. Dashboard        → Total · IN · OUT + search 🔍 (Phase 6)
3. VehicleOut page  → IN vandi list → Mark OUT 👆  (Phase 7)
   → POST { rowId } → updateRow → Status: OUT ✏️
4. Dashboard        → OUT 4, 🔴 red badge
```

---

## 6.9 – `.filter()`: condition match aagra items **mattum**

```js
const inCount  = rows.filter((row) => row.Status === 'IN')   // list
const outCount = rows.filter((row) => row.Status === 'OUT')
// screen: {inCount.length}
```

| `.map()` | `.filter()` |
|---|---|
| Ovvoru item-ayum **maathu** | Sila items-a **select** |
| 7 → 7 | 7 → 0..7 (adhe items) |
| 7 plate-la dosa 🥞 | Bill kattaadha customers mattum 🧾 |

| Bug | Paadam |
|---|---|
| `{inCount}` (list) screen la | 💥 `Objects are not valid as a React child` → `.length` venum |
| `'out'` | `'OUT' === 'out'` **false** → silent bug, error varaadhu, aana 0 kaattum 🤫 |
| `Summary-card` | CSS class **case-sensitive** |
| Ellaam 0 | **Backend (3000) odala!** `0` ≠ "vandi illa". Mudhalla server check |

CSS: `.summary-row { display: flex; gap }` · `.summary-card { flex: 1; flex-direction: column; align-items: center }`

---

## 6.10 – Status badge: template string

```jsx
<span className={`status-badge status-${row.Status.toLowerCase()}`}>{row.Status}</span>
// 'IN' → "status-badge status-in" → green 🟢
// 'OUT' → "status-badge status-out" → red 🔴
```

| Symbol | Meaning |
|---|---|
| `` ` `` backtick | Special string aarambam / mudivu (Esc keezha key) |
| `$` | "Inga variable varudhu" |
| `{ }` | Variable / JS code box |

- `'status-' + x` = `` `status-${x}` `` — same output. Backtick **padikka easy** + `${}` kulla JS code podalaam.
- `'single'` quote la `${}` work aagaadhu.
- className la **space = 2 class**. `status -in` ❌ → `status-in` ✅
- VS Code ~~`status`~~ kodu = pazhaiya browser word (deprecated). Error illa.

---

## 6.11 – 🔍 Search

```js
const [search, setSearch] = useState("")          // text → ""  (list illa!)
const filteredRows = rows.filter((row) => {
  return row.VehicleNumber.toLowerCase().includes(search.toLowerCase())
})
{filteredRows.map(...)}
{filteredRows.length === 0 && <p>🚫 No vehicle found</p>}
```

| Point | Explain |
|---|---|
| `.includes('22')` | Ulla irukkaa? → true / false |
| `toLowerCase()` rendu pakkamum | `TN22` vs `tn22` match aaga |
| `.includes("")` | **Eppavume true** → search kaali = ellaa vandi |
| `return true` | Filter **muzhu row** 📦 vechukkum, number mattum illa |
| Summary boxes | `rows` (ellaam) · Cards: `filteredRows` |
| `length && <p>` ❌ | 7 truthy → message thappaa varum; 0 → screen la `0` 😵 |
| `length === 0 && <p>` ✅ | 0 vandi-ku mattum message |

---

## 7.1 – Kitchen: `updateRow` ✏️

```js
if (body.rowId) {
  const row = await table.updateRow({ ROWID: body.rowId, Status: 'OUT' })
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.end(JSON.stringify({ entry: row }))
  return          // 🛑 illana keezha insertRow odum!
}
// keezha: insertRow (Phase 5)
```

**Yen inga?** Rendu vagai POST: body la `rowId` irundhaa → OUT ✏️, illana → pudhu vandi ✍️

| Bug | Paadam |
|---|---|
| `body.row.Id` | `body.row` undefined → 💥 → **Vehicle IN-um udaiyum** |
| `Status: body.status` | Kitchen la fix `'OUT'` → safe 🔒 |
| Serve Ctrl + C kekkala | `stat T` = Ctrl + Z pause! → `fg` / `kill` / `pgrep -af "catalyst serve"` |

curl: `curl -i -X POST <url> -H "Content-Type: application/json" -d '{"rowId":"..."}'`

---

## 7.2 – VehicleOut page (naane ezhudhinen! 🏆)

```js
setRows(data.rows.filter((row) => { return row.Status === 'IN' }))
```
Bugs: `useState("")` (list-ku `[]`), `{ }` without `return` (6.11 maadhiri).

## 7.3 – Mark OUT button

```js
const handleMarkOut = async (id) => {
  const response = await fetch(URL, { method: 'POST', headers, body: JSON.stringify({ rowId: id }) })
  if (!response.ok) return
  setRows(rows.filter((row) => row.ROWID !== id))   // card-a edu 🧹
}
<button onClick={() => handleMarkOut(row.ROWID)}>Mark OUT</button>
```

| Bug | Paadam |
|---|---|
| `if (response.ok) return` | `!` missing → success-la niruththidum |
| `onclick` | React = **camelCase** `onClick`. Small c → silent, onnum nadakkaadhu |
| `row.id` | `undefined` → `{}` → kitchen insertRow → **kaali row** 😱 → `row.ROWID` |
| `onClick={handleMarkOut(...)}` | ❌ page load-laye ellaam OUT! `() =>` venum (naan sariyaa pottaen ✅) |

---

## 6.12a – Status filter (paadhi)

`&&` + `!==` rendu negative → **puriyala**. Playground `13-status.js`:
```js
rows.filter((row) => row.Status === statusFilter)   // 'OUT' → TN02 mattum ✅
```
Next: `'all'` case.

---

## 🧠 Recall (naalaikku, notes paakkaama, **why**-oda)

1. `.map()` vs `.filter()` — enna vithyaasam?
2. `{inCount}` (list) screen la pottaa enna aagum? Yen?
3. Dashboard la ellaam 0 vandhaa, mudhalla enna check pannanum?
4. `` `status-${x}` `` — `` ` `` `$` `{}` moonum enna?
5. Search kaali-aa irundhaa yen ellaa vandi-um varudhu?
6. Kitchen la `if (body.rowId)` block la `return` illana enna aagum?
7. `onclick` vs `onClick`?
8. `onClick={handleMarkOut(row.ROWID)}` ezhudhinaa enna aagum?
