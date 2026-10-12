# 📋 Revision 6 – Phase 6: Dashboard list (GET) – Notes in English

Date: 2026-10-12
Files: `my-vehicle-app/src/pages/Dashboard.jsx`, `playground/8-length.js`, `playground/9-map.js`

---

## ❓ Why do we need it?

In Phase 5, the form **saved** each vehicle in the `ParkingEntries` table. But the manager wants to **see** the vehicles inside the app, without opening the Catalyst Console.

| | Phase 5 | Phase 6 |
|---|---|---|
| Direction | React → table | Table → React |
| Method | POST (write) | **GET (read)** |

🗣️ *"Phase 5 writes to the table. Phase 6 reads from the table."*

---

## 6.1 – Test the kitchen first

Opening `http://localhost:3000/server/entry_api/` in the browser returned `{ rows: [...] }` with **7 rows**.

- `maxRows: 10` means **"at most 10"**, not "exactly 10".
- Catalyst fills some columns automatically: `ROWID`, `CREATEDTIME`, `MODIFIEDTIME`, `CREATORID`, and the default `Status`.

🗣️ *"The function returned seven rows, because the table only had seven."*
🗣️ *"ROWID is a unique number that Catalyst gives to every row."*

---

## 6.2 – `useEffect`

If I call `fetch` directly in the component, `setRows` causes a re-render, which calls `fetch` again — an **infinite loop**.

```js
useEffect(() => {
  // runs after the page renders
}, [])   // empty array = run only once
```

In development, **StrictMode** runs the effect **twice** to catch bugs. In production it runs once.

🗣️ *"useEffect with an empty array runs only once, when the page opens."*
🗣️ *"In development, StrictMode runs it twice on purpose."*
🗣️ *"A GET twice is harmless, but a POST twice would save two rows."*

---

## 6.3 – Fetch inside `useEffect`

```js
useEffect(() => {
  const loadRows = async () => {
    const response = await fetch(import.meta.env.VITE_API_BASE)
    const data = await response.json()
    console.log(data)
  }
  loadRows()
}, [])
```

- The `useEffect` callback must not be `async`, because an async function returns a Promise.
- Defining `loadRows` does nothing by itself. I must **call** it with `loadRows()`.

🗣️ *"I create an async function inside the effect, and then I call it."*
🗣️ *"Writing a recipe doesn't cook the food. You have to start cooking."*

---

## 6.4 – `useState([])` and `.length`

```js
const [rows, setRows] = useState([])
setRows(data.rows)
<p>{rows.length} vandi irukku</p>
```

- Start with `[]`, because the data will be an array later.
- `data` is an object, so `data.length` is `undefined`. `data.rows` is the array, so `data.rows.length` is `7`.
- The screen shows `0` first, then `7` after the data arrives (re-render).

🗣️ *"The initial value should have the same type as the real data."*
🗣️ *"An object has no length, but an array does."*

---

## 6.5 – `.map()`

`.map()` does the **same job for every item** and returns a **new list**.

```jsx
{rows.map((row) => (
  <li key={row.ROWID}>{row.VehicleNumber} - {row.Name}</li>
))}
```

- `=> (` returns the JSX directly. With `=> {` you need `return`.
- Every item needs a **unique `key`**, so React can tell items apart. We use `ROWID`.

🗣️ *"map runs the same code for each row and gives me a new list."*
🗣️ *"The key must be unique, so I use ROWID."*

---

## 6.6 – HTML table

| Tag | Meaning |
|---|---|
| `<table>` | The whole table |
| `<thead>` / `<tbody>` | Heading part / data part |
| `<tr>` | One row |
| `<th>` / `<td>` | Heading cell / data cell |

- Only the `<tbody>` rows go inside `.map()`. The heading appears once.
- `<tr>` must be **inside** `.map()`, so each vehicle gets its own row.
- An HTML table has **no borders by default**. Borders come from CSS.

🗣️ *"The header is written once, and the rows come from map."*
🗣️ *"HTML builds the structure, and CSS makes it look nice."*

---

## 🐛 My mistakes today

| Mistake | Fix |
|---|---|
| `useState()` / `useState({})` | `useState([])` — square brackets |
| `useState` written after `useEffect` | Move it above |
| No `key`, then `key={row.id}` | `key={row.ROWID}` |
| `rows.map(row)=>{` | `rows.map((row) => (` |
| `<tr>` outside `.map()` | Put it inside |
| Two values in one `<td>` | One `<td>` per column |
| Started `npm run dev` twice (port 5174) | Stop the old one with Ctrl + C |

🗣️ *"I mixed up curly braces and square brackets three times."*
🗣️ *"ESLint told me that setRows was declared after I used it."*
