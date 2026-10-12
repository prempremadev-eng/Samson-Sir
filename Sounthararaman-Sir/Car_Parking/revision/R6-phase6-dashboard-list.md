# 📋 Revision 6 – Phase 6: Dashboard list (GET) – 6.1 → 6.6

Date: 2026-10-12 · Time: 12:09 → 14:53 + 21:57 → 22:56 (~3 h 43 min)
Files: `my-vehicle-app/src/pages/Dashboard.jsx`, `playground/8-length.js`, `playground/9-map.js`

---

## ❓ Yen venum?

Phase 5 la waiter order-a **store room register la ezhudhittaar** ✍️. Aana manager 👔 kekkaraaru:
> "Inniku ulla evlo vandi? Yaaru yaaru?"

Catalyst Console open panni paakka mudiyaadhu (guard-ku theriyaadhu, theriyavum koodadhu). So **app kulla-ye** Dashboard la list kaattanum.

| | Phase 5 | **Phase 6** |
|---|---|---|
| Direction | React ➡️ Store room | Store room ➡️ React |
| Method | POST (ezhudhu ✍️) | **GET (padi 👀)** |
| Hotel | Register la ezhudhu | Register-a **kondu vandhu kaattu** |

---

## 🗺️ Full journey

```
🏠 Dashboard open
   │ useEffect(…, [])  → oru thadava mattum
   │ loadRows()  → fetch GET
   ▼
👨‍🍳 entry_api (3000)  → POST illa → getPagedRows({maxRows:10})
   ▼
🧊 ParkingEntries  → { rows: [ 7 dabba 📦 ] }
   ▼
🏠 setRows(data.rows) → re-render → "7 vandi irukku" + table 📒
```

---

## 6.1 – Kitchen test (browser la URL)

`http://localhost:3000/server/entry_api/` → `{ rows: [...] }` · **7 rows**

| Ennoda guess | Result |
|---|---|
| `{rows: [...]}` | ✅ |
| 10 rows | ❌ → **7**. `maxRows: 10` = "10-ku **mela** kudukkaadhe", "correct-aa 10" illa |
| `TN22CD9999` irukkum | ✅ |

**Catalyst thaane fill pannra columns 🎁:** `ROWID` (Aadhaar maadhiri 🪪), `CREATEDTIME`, `MODIFIEDTIME`, `CREATORID`, `Status` (default `IN`)

---

## 6.2 – `useEffect`: "page open aanavudane oru thadava"

**Problem:** component kulla nera fetch → `setRows` → re-render → fetch thirumba → … **infinite loop** 🔁 (waiter thanni glass 🥛🥛🥛 vechikitte iruppaar)

```js
useEffect(() => {
  // page open aana appo run aagum
}, [])   // ← [] = oru thadava mattum ⭐
```

**StrictMode** (`main.jsx`): development la effect **2 thadava** odum (Console la 🔵 **2** badge). Training waiter test 🧑‍🎓 — production la 1 thadava dhaan.

| | 2 thadava ponaa |
|---|---|
| GET 👀 | Problem illa (padikka mattum) |
| POST ✍️ | **2 rows save** aagidum ⚠️ → adhanaala POST button click la, GET useEffect la |

---

## 6.3 – `useEffect` kulla fetch

```js
useEffect(() => {
  const loadRows = async () => {
    const response = await fetch(import.meta.env.VITE_API_BASE)
    const data = await response.json()
    console.log(data)
  }
  loadRows()   // ← call panna marakkaadhe!
}, [])
```

| Rule | Yen |
|---|---|
| `useEffect(async …)` ❌ | async eppavume **Promise** return pannum, useEffect-ku adhu puriyaadhu |
| `loadRows` create + `loadRows()` call | Recipe book la ezhudhinaa dosa varaadhu 📖 — "**samai!**" nu sollanum 🔥 |
| GET-ku `{ method, headers, body }` venaam | Default-aave GET, naama edhuvum anuppala |

**Log order (ennoda guess ✅ correct):** `A` → `1 2 3 4 5 6` (terminal) → `B` → `C`. `await` = waiter kaathu nikkiraaru ⏳

---

## 6.4 – `useState([])` + `.length`

```js
const [rows, setRows] = useState([])   // useEffect-ku MELA
...
setRows(data.rows)                     // dabba thirandhu register mattum
...
<p>{rows.length} vandi irukku</p>
```

| Kelvi | Answer |
|---|---|
| Starting value? | `[]` kaali register 📒 — apram varra data-vum array. `""` (paper 📄) illa, `{}` (dabba 📦) illa |
| `setRows(data)` vs `setRows(data.rows)` | `data` = object 📦 → `.length` = `undefined`. `data.rows` = array 📒 → `7` |
| Screen | Mudhalla `0 vandi`, fetch apram `7 vandi` (re-render ✨) |

**Playground `8-length.js`:** `data.length` → `undefined` · `data.rows` → `[ 'TN01','TN02','TN03' ]` · `data.rows.length` → `3`

---

## 6.5 – `.map()`: ovvoru item-kum orey velai

🥞 Cook 7 plate layum orey maadhiri dosa podraaru.

**Playground `9-map.js`:**
```js
rows.map((row) => { return 'Vehicle - ' + row })
// [ 'Vehicle - TN01', 'Vehicle - TN02', 'Vehicle - TN03' ]

rows.map((row) => { return row.VehicleNumber + ' - ' + row.Name })
// [ 'TN01 - Ravi', 'TN02 - Kumar' ]
```

**JSX la:**
```jsx
{rows.map((row) => (
  <li key={row.ROWID}>{row.VehicleNumber} - {row.Name}</li>
))}
```

| Rule | Yen |
|---|---|
| `=> (` | JSX nera return. `=> {` pottaa `return` ezhudhanum |
| `key` | Table number 🪑#1 maadhiri — endha item-nu React-ku theriyanum. **Unique** → `ROWID` |
| `key` enga | `.map()` return pannra **veliya** tag la |

---

## 6.6 – `<table>`: register book 📒

| Tag | Register book |
|---|---|
| `<table>` | Muzhu book |
| `<thead>` | Column names page (**map pannakoodadhu**, orey thadava) |
| `<tbody>` | Entries |
| `<tr>` | Oru vandi line (**map kulla**) |
| `<th>` / `<td>` | Heading box / data box |

```jsx
<tbody>
  {rows.map((row) => (
    <tr key={row.ROWID}>
      <td>{row.VehicleNumber}</td>
      <td>{row.Name}</td>
    </tr>
  ))}
</tbody>
```

**`))}` close** = open panna reverse order (shirt button 👔). HTML table-ku **default border illa** → CSS venum (HTML = veedu 🏠, CSS = paint 🖌️).

---

## 🐛 Inniku ennoda thappugal

| # | Thappu | Correct | Eppadi kandupudichom |
|---|---|---|---|
| 1 | `useState()` → `useState({})` | `useState([])` | 3 round! `{` curly vs `[` square |
| 2 | `useState` `useEffect`-ku keezha | Mela | ESLint `setRows is declared here` |
| 3 | `key` illa → `key={row.id}` | `key={row.ROWID}` | `id` column illa → `undefined` |
| 4 | `rows.map(row)=>{` | `rows.map((row) => (` | `Parsing error: Unexpected token =>` |
| 5 | `<tr>` map-ku veliya | Map kulla | Ellaa vandi orey line la varum |
| 6 | Orey `<td>` la 2 value | 2 `<td>` | Heading 2 column → data 2 box |
| 7 | `npm run dev` 2 thadava → 5174 | Pazhaiyadhu Ctrl + C | `ss -ltnp` |

---

## 🧠 Recall (notes paakkaama sollu)

1. Dashboard la fetch yen button click la illa, `useEffect` la?
2. `[]` illaama `useEffect` ezhudhinaa enna aagum?
3. Development la log yen 2 thadava? Production la?
4. `useState` starting value `[]` — yen `""` illa?
5. `data.length` vs `data.rows.length`?
6. `key` yen venum? Namma app la edhu key?
7. `<thead>` yen `.map()` kulla podakoodadhu?
8. `))}` — moonu bracket-um edhukku?
