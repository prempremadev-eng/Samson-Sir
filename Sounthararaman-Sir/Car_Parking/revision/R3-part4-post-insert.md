# 💾 Revision 3 – Part 4: Shelf la porul vei (POST → `insertRow`)

Date: 2026-10-07 · Time: 5:43 → 8:01 PM (~2 h 18 min)
File: `my-vehicle-app/functions/entry_api/index.js`

---

## ❓ Yen venum?

Part 3 la cook **paakka mattum** theriyum (GET). Customer **porul kuduthaa** (vehicle details), adha **shelf la vekka** theriyaadhu. Adhu illaama form submit pannina data engayum save aagaadhu.

---

## 🗺️ Plan

```
🙋 curl (ippo) / React form (5.5)
     │ POST  {"vehicleNumber":"TN09AB1234","name":"Prem","phoneNumber":"9876543210"}
     ▼
👨‍🍳 module.exports
     ├─ GET?  → shelf paaru (Part 3 ✅)
     └─ POST? → ① getBody(req)        📝 slip padi (Part 2 ✅)
                ② table.insertRow(…)  🧊 shelf la vei
                ③ 201 + saved row     🍽️ receipt kudu
```

---

## 📖 Code (POST part)

```js
if (req.method === 'POST') {
  const body = await getBody(req);
  console.log('p1. body vandhuchu :', body);

  const row = await table.insertRow({
    VehicleNumber: body.vehicleNumber,
    Name: body.name,
    PhoneNumber: body.phoneNumber,
  });
  console.log('p2.self la vechitten ROWID:', row.ROWID);

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ entry: row }));
  return;
}
```

| Line | Hotel la |
|---|---|
| `if (req.method === 'POST')` | "Porul kudukkura order ah?" |
| `await getBody(req)` | 📝 Assistant-a koopidu, slip padi 🔗 (getBody ↔ module.exports connection!) |
| `table.insertRow({...})` | 🧊 Shelf la vei (column names-oda) |
| `await` | Store room dhooram, wait |
| `row` | Shelf la vecha item — ROWID, CREATEDTIME Catalyst podum |
| `201` | 🏷️ "Pudhusaa create aachu" label (200 = OK, 201 = Created) |
| **`return`** | 🛑 "Order mudinjidichu, keezha GET code run pannaadha" |

---

## 🔤 Name mapping

| Body (small start — React style) | Table column (capital start) |
|---|---|
| `body.vehicleNumber` | `VehicleNumber` |
| `body.name` | `Name` |
| `body.phoneNumber` | `PhoneNumber` |

Cook **translate** pannuraar.

---

## 🟦🟩🟨 Endha code eppo odum

```js
module.exports = async (req, res) => {
  1, 2, 3 (initialize, table)       🟦 Ellaa order-kkum

  if (req.method === 'POST') {
    getBody → insertRow → p1, p2     🟩 POST-ku mattum
    res.end(…)
    return;  🛑
  }

  4, getPagedRows, 5, 6              🟨 GET-ku mattum
}
```

| Order | 🟦 1, 2, 3 | 🟩 if block | 🟨 4, 5, 6 |
|---|---|---|---|
| **POST** | ✅ | ✅ | ❌ (`return` stop) |
| **GET** | ✅ | ❌ (`if` false) | ✅ |

En guess "ellamum varum" 🟡 → `return` irukkuradhaala 4, 5, 6 varaadhu. **Plate-a rendu dhadava kudukka koodaadhu** 🍽️🍽️❌

---

## 🚀 curl vechu POST test

```bash
curl -i -X POST http://localhost:3000/server/entry_api/ -H "Content-Type: application/json" -d '{"vehicleNumber":"TN09AB1234","name":"Prem","phoneNumber":"9876543210"}'
```

| Part | Artham | Hotel la |
|---|---|---|
| `-i` | Status + label kaattu | Receipt full ah |
| `-X POST` | POST method (default GET) | "Porul kudukkuren" |
| `-H "Content-Type: application/json"` | Naan anuppuradhu JSON | Parcel sticker 🏷️ |
| `-d '{...}'` | Body (data) | Porul 📦 |

⚠️ `-d '{ ... }'` — outer **single quote** `'`, ulla **double quote** `"`. **Ellaa keys-um `"` kulla.**

Browser address bar **GET mattum** anuppum → POST-ku `curl` (apram React `fetch`).

---

## 🐛 Naan fix panna bugs

| Bug | Error | Kaaranam | Lesson |
|---|---|---|---|
| `console.log('…' row.ROWID)` | `SyntaxError: missing ) after argument list` | `,` missing | SyntaxError = **full file odaadhu**, GET kooda poyidum |
| curl `phoneNumber:"…"` | `500` — `Empty row cannot be updated` | JSON key ku `"` illa | 👇 chain |

### 🔗 "Empty row" chain

```
curl -d '{… phoneNumber:"9876…"}'     ← 🐛 JSON rule thappu (key ku quotes illa)
        ▼
getBody: JSON.parse(data)             → 💥 SyntaxError (Ex 1)
        ▼
catch { resolve({}) }                 → body = {}  (Ex 2 + Ex 6 Test 3!)
        ▼
insertRow({ VehicleNumber: undefined, Name: undefined, PhoneNumber: undefined })
        ▼
Data Store: "Empty row cannot be updated" → catch → 500
```

Ex 6 Test 3 (thappaana body → `{}`) **real life la nadandhuchu** 😄 getBody crash aagala ✅, aana `{}` kuduthudhu.

💡 React `JSON.stringify` eppavume correct JSON podum — form la indha problem varaadhu.

---

## 🔎 500 error checklist

| Step | Enga | Enna paakkanum |
|---|---|---|
| 1 | curl **kadaisi line** / DevTools **Response** | `{"error":"…"}` → **enna** problem |
| 2 | **Serve terminal** | Kadaisi 🔍 step + `problem :` → **enga** problem |
| 3 | `index.js` | Andha step-ku **adutha line** dhaan crash |
| 4 | Zoho Console | Table columns / names |

```
Kadaisi 🔍 step   →   adutha line dhaan problem
3 varaikkum       →   getBody(req)
p1 varaikkum      →   insertRow(…)  (column / data)
p2 varaikkum      →   res.writeHead / end
```

💡 **Debug habit:** "fix pannitten" nu sonnaalum, **result-a kannala check pannu** (GET panni / Console Data View).

---

## 🎉 Result — en mudhal vehicle cloud la!

Console → Data Store → ParkingEntries → **Data View**:

| ROWID | CREATEDTIME | VehicleNumber | Name | PhoneNumber | EntryType | Status | InTime |
|---|---|---|---|---|---|---|---|
| 50225000000054015 | 2026-10-07 19:32:48 | **TN09AB1234** | **Prem** | **9876543210** | (kaali) | **IN** | (kaali) |

| Column | Yaar pottadhu |
|---|---|
| VehicleNumber, Name, PhoneNumber | 🙋 Curl body (`insertRow`) |
| Status = `IN` | ☁️ Default value |
| ROWID, CREATEDTIME, CREATORID | ☁️ Catalyst |
| EntryType, InTime | `null` — 5.5 la React anuppum |

---

## ➡️ Next: 5.5

curl badhila **VehicleEntry form** submit → `fetch` POST → row save. **Phase 5 complete** 🎉
