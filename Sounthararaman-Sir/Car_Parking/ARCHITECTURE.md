# 🏗️ my-vehicle-app – Architecture & Table Plan

Date: 2026-10-07

---

## 🏗️ Overall architecture

```
┌──────────────── 🏠 FRONTEND (React, port 5173) ────────────────┐
│                                                                 │
│  Home ──▶ VehicleEntry (/in/:entryType)   VehicleOut   Dashboard│
│              │ form submit                    │ OUT       │ list│
└──────────────┼────────────────────────────────┼───────────┼─────┘
               │ POST                           │ POST      │ GET
               │ {vehicleNumber, name, …}       │ {rowId}   │
               ▼                                ▼           ▼
┌──────────────── 👨‍🍳 BACKEND (entry_api, port 3000) ────────────┐
│  getBody(req) → body                                            │
│  POST (new)    → table.insertRow(...)          ← Part 4         │
│  POST (rowId)  → table.updateRow(Status: OUT)  ← Phase 7        │
│  GET           → table.getPagedRows()          ← Part 3         │
└──────────────────────────────┬──────────────────────────────────┘
                               │ zcatalyst-sdk-node (🔑)
                               ▼
┌──────────────── 🧊 DATA STORE (Zoho cloud) ─────────────────────┐
│  ParkingEntries table                                           │
└─────────────────────────────────────────────────────────────────┘
```

| Layer | Hotel la | Folder |
|---|---|---|
| 🏠 Frontend (React) | Dining hall | `my-vehicle-app/src/` |
| 👨‍🍳 Backend (function) | Kitchen + cook | `my-vehicle-app/functions/entry_api/` |
| 🧊 Data Store | Store room | Zoho cloud (`my-vehicle-app-2` → Development) |

---

## 📋 `ParkingEntries` table – ovvoru column-um enga irundhu?

| Column | Enga irundhu varum | Yaar fill pannuvaanga | Example | Eppo (step) |
|---|---|---|---|---|
| `ROWID` | Catalyst thaana | ☁️ Data Store | `5022500000004…` | Auto |
| `CREATEDTIME` | Catalyst thaana | ☁️ Data Store | `2026-10-07 13:10` | Auto |
| `MODIFIEDTIME` | Catalyst thaana | ☁️ Data Store | | Auto |
| `CREATORID` | Catalyst thaana | ☁️ Data Store | | Auto |
| `VehicleNumber` ⭐ | Form input | 🙋 User type pannuvaar | `TN09AB1234` | Part 4 / 5.5 |
| `Name` | Form input | 🙋 User | `Prem` | Part 4 / 5.5 |
| `PhoneNumber` | Form input | 🙋 User | `9876543210` | Part 4 / 5.5 |
| `EntryType` | **URL** (`/in/:entryType`) | ⚛️ React (`useParams`) | `visitor` | 5.5 |
| `InTime` | **Current time** | ⚛️ React (submit pannum bodhu) | `2026-10-07T13:10` | 5.5 |
| `Status` | **Default value** | ☁️ Data Store (default `IN`) | `IN` → apram `OUT` | Auto / Phase 7 |

**3 vagai:**
- 🙋 **User type pannuradhu** — VehicleNumber, Name, PhoneNumber (form la already irukku ✅)
- ⚛️ **React thaana podradhu** — EntryType (URL la irundhu), InTime (clock la irundhu)
- ☁️ **Catalyst thaana podradhu** — ROWID, times, Status default

Table details: Table ID `50225000000046100`, ellam `varchar`, `VehicleNumber` mandatory, `Status` default `IN`.

---

## 🔄 Oru vehicle-oda full life (oru row)

```
1. 🚗 Vehicle ulla varudhu
   VehicleEntry form → POST → insertRow
   ┌─────────────┬──────┬────────────┬───────────┬──────────────────┬────────┐
   │VehicleNumber│ Name │ PhoneNumber│ EntryType │ InTime           │ Status │
   │TN09AB1234   │ Prem │ 9876543210 │ visitor   │ 2026-10-07T13:10 │ IN     │
   └─────────────┴──────┴────────────┴───────────┴──────────────────┴────────┘

2. 📋 Dashboard paakkuradhu
   GET → getPagedRows → list la indha row theriyum

3. 🚗 Vehicle veliya poradhu
   VehicleOut → POST {rowId} → updateRow → Status: OUT
```

---

## 🍽️ GET vs POST

| Customer order | Method | Cook velai | Page |
|---|---|---|---|
| "Shelf la enna irukku?" | **GET** | Rows padichu kudu | Dashboard |
| "Idha shelf la vei" | **POST** | `getBody` → `insertRow` | VehicleEntry |
| "Indha vehicle poyiduchu" | **POST** (`rowId` oda) | `updateRow` → `Status: OUT` | VehicleOut |

---

## 📖 `index.js` – kadaisi la eppadi irukkum

```js
const catalyst = require('zcatalyst-sdk-node');     // Part 1 ✅

function getBody(req) { ... }                       // Part 2 ✅

module.exports = async (req, res) => {
  const table = ...('ParkingEntries');              // Part 3: store room + shelf

  if (req.method === 'GET') {                       // Part 3: "shelf la enna irukku?"
    → rows list anuppu
  }
  if (req.method === 'POST') {                      // Part 4: "idha shelf la vei"
    const body = await getBody(req);                //   ← getBody inga use aagum!
    → table.insertRow(body)
  }
};
```

---

## 🗓️ Steps, table action & time estimate

⏱️ Time = en speed la approx (playground maadhiri pudhu concept vandhaa konjam koodum).

| Step | Enna | Method | Table action | Columns | Approx time | Status |
|---|---|---|---|---|---|---|
| 5.4 Part 1 | `require` SDK | — | — | — | — | ✅ |
| 5.4 Part 2 | `getBody` | — | — | — | — | ✅ |
| **5.4 Part 3** | Store room thira, read | GET | `getPagedRows` | Ellam (ippo `[]`) | **~30–45 min** | ⏳ Ippo |
| **5.4 Part 4** | Save (curl test) | POST | `insertRow` | VehicleNumber, Name, PhoneNumber | **~1 h** | ❌ |
| **5.5** | React form `fetch` | POST | `insertRow` | + EntryType, InTime | **~1–1.5 h** | ❌ |
| | **Phase 5 total (form → cloud save 🎉)** | | | | **~3 h** | |
| Phase 6 | Dashboard list | GET | `getPagedRows` | Ellam display | ~2 h | ❌ |
| Phase 7 | VehicleOut | POST | `updateRow` | Status → OUT (+ OutTime) | ~2–3 h | ❌ |

---

## 🔮 Future tables (reference app la irukku, apram)

| Table / storage | Velai | Phase |
|---|---|---|
| `ParkingEntries` | Vehicle entries | ✅ Ippo |
| `GuardProfiles` | Login user ↔ guard number | Phase 8 (Login) |
| Stratus bucket | Vehicle photos | Phase 10 (Photo) |

Reference `ParkingEntries` la innum columns irukku (`EmployeeNumber`, `ComingFrom`, `WhomToMeet`, `Remarks`, `OutTime`, `GuardNumber`…). Thevai varum bodhu add pannuvom. Small ah start, step by step valarkkalaam 🌱
