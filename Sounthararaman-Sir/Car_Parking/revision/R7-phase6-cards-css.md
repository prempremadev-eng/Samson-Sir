# 🃏 Revision 7 – Phase 6: Table → Cards + CSS (6.7 – 6.8)

Date: 2026-10-13 · Time: 22:10 → 22:55 (~45 min)
Files: `my-vehicle-app/src/pages/Dashboard.jsx`, `my-vehicle-app/src/App.css`
Reference: `~/vehicle-entry-lancorVendorEntrance/src/pages/Dashboard.jsx` (original cards)

---

## 🧠 Mudhalla: R6 recall quiz result – 5 / 8

| Q | Result | Nyabagam vechukka |
|---|---|---|
| 1 useEffect yen | 🟡 | Dashboard-la **button illa** → page open aanavudane thaane load |
| 2 `[]` illaama | ✅ | Infinite loop 🔁 |
| 3 2 thadava | 🟡 | StrictMode bug test, **production 1x** |
| 4 `[]` yen, `""` illa | ❌ | `"".map()` 💥 crash. Starting value = **same type** |
| 5 length | ✅ | Object 📦 `undefined`, array 📒 count |
| 6 key | ✅ | `ROWID` 🪪 |
| 7 thead map illa | 🟡 | Map kulla ponaa heading **7 thadava** repeat |
| 8 `))}` | 🟡 | Reverse order: `)` JSX, `)` map, `}` JSX code |

---

## ❓ Yen cards? (table illa)

Guard **phone** 📱 la dhaan use pannuvaar. Phone odukkam.

| | Table 📒 | Cards 🃏 |
|---|---|---|
| 5 columns | Phone la side scroll 😵 | Ovvoru vandi-kum oru box, info keezha keezha ✅ |

🍽️ Waiter-oda **order chit** 🧾 maadhiri: ovvoru table-kum oru chit.

---

## 6.7 – Cards structure

```
┌──────────────────────────────┐
│ TN22CD9999              IN   │  ← record-card-row (number + status)
│ visitor                      │  ← record-card-meta
│ 🕐 2026-10-08T11:38:06.641Z  │  ← record-card-meta
└──────────────────────────────┘
```

```jsx
<ul className="record-list">
  {rows.map((row) => (
    <li className="record-card" key={row.ROWID}>
      <div className="record-card-row">
        <span>{row.VehicleNumber}</span>
        <span>{row.Status}</span>
      </div>
      <div className="record-card-meta">{row.EntryType}</div>
      <div className="record-card-meta">🕐 {row.InTime}</div>
    </li>
  ))}
</ul>
```

| Tag | Velai |
|---|---|
| `<ul>` | Ellaa cards |
| `<li key>` | Oru vandi = oru card (**map kulla**) |
| `<span>` | Orey line la pakkam pakkam |
| `<div>` | Pudhu line |

### ⭐ Column per rule

```
Table column (Catalyst)    →  Capital start:  VehicleNumber, Status, EntryType, InTime, ROWID
React variable / form key  →  small start:    vehicleNumber, entryType, form, rows
```

Doubt-aa irundhaa: `http://localhost:3000/server/entry_api/` open panni **copy** pannu.

### CSS illaama screen la

| Paathadhu | Yen |
|---|---|
| `•` bullets | `<ul>`/`<li>` default |
| Border illa | `<div>`/`<li>` default border illa |
| `TN22CD9999IN` ottikittu | `<span>` orey line, space illa |
| Kadaisi 2 vandi type/time illa | 5.5-ku munnadi save → `null`. Kaali `<div>` crash aagaadhu ✅ |

---

## 6.8 – Card CSS (`App.css`)

```css
.record-list      { list-style: none; padding: 0; }
.record-card      { border: 1px solid #ccc; border-radius: 8px; padding: 12px; margin-bottom: 10px; text-align: left; }
.record-card-row  { display: flex; justify-content: space-between; }
.record-card-meta { font-size: 14px; color: gray; }
```

| Property | Velai |
|---|---|
| `list-style: none` | Bullets edu |
| `display: flex` | Pillaigala orey line la vari-aa vei (Phase 4 `.entry-form` la use pannadhu) |
| `justify-content: space-between` | Oru plate left 🍽️ ……… 🍽️ innoru plate right |

✅ Rendu `???`-um **naane** fill panninen!

---

## 🐛 Inniku thappugal

| Line | Thappu | Correct |
|---|---|---|
| 25 | `row.vehicleNumer` | `row.VehicleNumber` (capital V + `b` missing) |
| 26 | `row.status` | `row.Status` |
| 28 | `row.entryTypeLabel` (variable per) | `row.EntryType` (column per) |
| 25 | Fix pannina apram **save** pannala | **Ctrl + S** 💾 |

---

## 🗺️ Dashboard baaki (~40% done)

| Step | Feature | Pudhu concept |
|---|---|---|
| 6.9 | 👥 Total · ⬇️ IN · ⬆️ OUT boxes | `.filter()` |
| 6.10 | Status badge color | `` `status-${...}` `` |
| 6.11 | 🔍 Search | `.includes()`, `.toLowerCase()` |
| 6.12 | Type + Status filter pills | Pala `useState` |
| 6.13 | 📅 Date filter | `type="date"`, `.startsWith()` |
| 6.14 | Banner + date pill + polish | `toLocaleDateString()` |

---

## 🧠 Recall (naalaikku, notes paakkaama)

1. Yen cards, table illa?
2. `<span>` vs `<div>` — screen la enna vithyaasam?
3. Table column per vs React variable per — capital rule enna?
4. `display: flex` + `justify-content: space-between` enna pannum?
5. Bullets eppadi edukkradhu?
6. Kaali `EntryType` (`null`) irundhaa screen la enna aagum? Crash aagumaa?
