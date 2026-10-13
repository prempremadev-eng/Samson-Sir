# 🃏 Revision 7 – Phase 6: Table → Cards + CSS – Notes in English

Date: 2026-10-13
Files: `my-vehicle-app/src/pages/Dashboard.jsx`, `my-vehicle-app/src/App.css`

---

## Recall quiz result: 5 / 8

- I forgot why the initial state is `[]` and not `""`: a string has no `.map()`, so the page would crash.
- I knew the main answers, but I often missed the **why** part.

🗣️ *"I scored five out of eight. I need to remember the reasons, not only the answers."*

---

## Why cards instead of a table?

The guard uses the app on a **phone**. A table with five columns doesn't fit on a small screen. A card shows each vehicle in its own box, with the details stacked.

🗣️ *"Cards work better on a phone, because each vehicle gets its own box."*

---

## 6.7 – Card structure

```jsx
<li className="record-card" key={row.ROWID}>
  <div className="record-card-row">
    <span>{row.VehicleNumber}</span>
    <span>{row.Status}</span>
  </div>
  <div className="record-card-meta">{row.EntryType}</div>
  <div className="record-card-meta">🕐 {row.InTime}</div>
</li>
```

- A `<span>` stays on the same line. A `<div>` starts a new line.
- Catalyst column names start with a **capital letter** (`VehicleNumber`, `Status`). My React variables start with a small letter (`vehicleNumber`, `rows`).
- An empty value (`null`) shows nothing, and the page doesn't crash.

🗣️ *"Table columns start with a capital letter, but my variables start with a small letter."*
🗣️ *"If I'm not sure about a column name, I open the API URL and copy it."*

---

## 6.8 – Card CSS

```css
.record-list      { list-style: none; padding: 0; }
.record-card      { border: 1px solid #ccc; border-radius: 8px; padding: 12px; margin-bottom: 10px; }
.record-card-row  { display: flex; justify-content: space-between; }
.record-card-meta { font-size: 14px; color: gray; }
```

- `list-style: none` removes the bullets.
- `display: flex` puts the children in a row.
- `justify-content: space-between` pushes one item to the left and the other to the right.

🗣️ *"I removed the bullets with list-style none."*
🗣️ *"Flex with space-between puts the number on the left and the status on the right."*

---

## My mistakes

| Mistake | Fix |
|---|---|
| `row.vehicleNumer` | `row.VehicleNumber` |
| `row.status` | `row.Status` |
| `row.entryTypeLabel` (a variable name) | `row.EntryType` (the column name) |
| Didn't save after fixing | Ctrl + S |

🗣️ *"I used a variable name instead of the column name."*
🗣️ *"I forgot to save the file, so the old code was still there."*

---

## What's left on the Dashboard (about 40% done)

Total/IN/OUT boxes (`.filter()`), status badge colours, search, type and status filters, date filter, banner and polish.

🗣️ *"Tomorrow I'll learn filter, so I can count the IN and OUT vehicles."*
