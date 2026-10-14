# 🚗 Revision 8 – Filter, search and Vehicle OUT – Notes in English

Date: 2026-10-14

---

## Today the whole flow works

A vehicle comes in, appears on the Dashboard, goes out from the VehicleOut page, and the Dashboard updates.

🗣️ *"Today my app can bring a vehicle in, show it on the Dashboard, and mark it out."*

---

## `.filter()`

`.filter()` keeps only the items that match a condition.

```js
const inCount = rows.filter((row) => row.Status === 'IN')
```

- `.map()` changes every item. `.filter()` selects some items.
- React can't show an object or a list directly, so I use `.length`.
- `'OUT'` and `'out'` are different. The wrong case gives no error, just a wrong number.

🗣️ *"filter keeps only the rows where the status is IN."*
🗣️ *"I typed 'out' in small letters, so the count was always zero."*
🗣️ *"When everything showed zero, the real problem was that the backend wasn't running."*

---

## Template strings

```jsx
className={`status-badge status-${row.Status.toLowerCase()}`}
```

- Backticks let me put variables inside a string with `${ }`.
- It gives the same result as `+`, but it's easier to read.
- A space inside a class name makes two classes.

🗣️ *"A template string is easier to read than joining strings with plus."*
🗣️ *"The badge class changes with the status, so IN is green and OUT is red."*

---

## Search

```js
const filteredRows = rows.filter((row) =>
  row.VehicleNumber.toLowerCase().includes(search.toLowerCase())
)
```

- `.includes()` returns true or false.
- I change both sides to lower case, so the case doesn't matter.
- An empty search matches everything, because every string includes an empty string.
- The filter keeps the **whole row**, not only the number.
- `length === 0 && <p>` shows a message only when nothing matches.

🗣️ *"The search box filters the cards, but the summary boxes still count all the vehicles."*
🗣️ *"If nothing matches, the page shows 'No vehicle found'."*

---

## Vehicle OUT – backend

```js
if (body.rowId) {
  const row = await table.updateRow({ ROWID: body.rowId, Status: 'OUT' })
  ...
  return
}
```

- The same POST endpoint does two jobs. If the body has a `rowId`, it updates; otherwise it inserts.
- `return` stops the code, so it doesn't insert a new row by mistake.
- `updateRow` changes an existing row. `insertRow` creates a new one.

🗣️ *"If the request has a row ID, the function marks that row as OUT."*
🗣️ *"Without return, the function would also create a new empty row."*
🗣️ *"Ctrl + C didn't work because I had paused the server with Ctrl + Z."*

---

## Vehicle OUT – frontend

```js
const handleMarkOut = async (id) => { ... body: JSON.stringify({ rowId: id }) ... }
<button onClick={() => handleMarkOut(row.ROWID)}>Mark OUT</button>
```

- React event names are camelCase: `onClick`, not `onclick`.
- I pass a function with `() =>`. If I call it directly, every vehicle would go out when the page loads.
- After a successful update, I remove the card with `filter`.

🗣️ *"I wrote the VehicleOut page myself from the hints."*
🗣️ *"onclick with a small c does nothing in React, and there's no error."*
🗣️ *"The card disappears after the vehicle is marked out."*

---

## Status filter (half done)

The condition with two `!==` and `&&` was too hard to follow. The playground version was clear:

```js
rows.filter((row) => row.Status === statusFilter)
```

🗣️ *"I didn't understand the long condition, but the playground example made it clear."*
🗣️ *"I was tired, so I stopped and will continue tomorrow."*
