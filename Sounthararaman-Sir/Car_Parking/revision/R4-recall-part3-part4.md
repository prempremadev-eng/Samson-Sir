# 🧠 Revision 4 – Recall quiz: Part 3 + Part 4

Date: 2026-10-08 · Time: 11:17 → 11:45 AM
Score: **5½ / 8** 👍 (Q7 full chain 💯)

---

## 📝 En answers

| # | Question | En answer | Correct | |
|---|---|---|---|---|
| 1 | `module.exports` yen venum? | theriyala | Jannal 🪟 — `catalyst serve` un function-a edukka | 📖 |
| 2 | `(req, res)` yaar kudukkuraanga? | Terminal la vehicle, name kuduthom | **`catalyst serve`** (waiter). `req` = order slip 📝, `res` = plate 🍽️ | 🟡 |
| 3 | `await` use pannina function mela enna? | DB ku poitu vara time aagum | `await` meaning ✅ — aana function mela **`async`** podanum | 🟡 |
| 4 | GET / POST eppadi kandupudikkuradhu? | `req.method === post` | ✅ — aana **`'POST'`** (capital + quotes) | ✅🟡 |
| 5 | POST la `return` yen? | Post pannitta return pannanum | ✅ + **keezha GET code odaama**, plate rendu dhadava kudukka koodaadhu | ✅🟡 |
| 6 | 201? 500? | 201 = store aachu, 500 = internal server error | ✅ 201 = **Created** | ✅ |
| 7 | "Empty row" real kaaranam? | JSON format sariyaa anuppala → getBody chunk serthu parse fail → `{}` → table la vekka mudiyala → 500 | ✅ 💯 full chain | ✅ |
| 8 | POST test panna? | curl | ✅ | ✅ |

**⭐ Gavanikka:** Q1 (jannal), Q2 (yaar kudukkuraanga), Q3 (`async`), Q4 (`'POST'` capital).

---

## 📖 Q1: `module.exports` yen venum?

Ovvoru `.js` file = **thani box** 📦 — ulla irukkuradhu veliya theriyaadhu.
**`module.exports` = jannal** 🪟 — adhula vecha function-a mattum `catalyst serve` edukka mudiyum.
Illana waiter-ku recipe kidaikkaadhu → error.

> **"Jannal illana waiter-ku dosai illa"** 🪟🥞

## 📖 Q2: `(req, res)`

| | Yaar kudukkuraanga | Enna |
|---|---|---|
| `req` | `catalyst serve` 🧑‍💼 | 📝 Order slip — method, URL, body |
| `res` | `catalyst serve` 🧑‍💼 | 🍽️ Kaali plate — response anuppa |

Nee **ezhudhura** (function), **waiter call pannum** (customer vandhaa).

## 📖 Q3: `async` + `await` = pair 👫

```js
module.exports = async (req, res) => {    // 🏷️ async — "wait step irukku" sticker
  const result = await table.getPagedRows(…);   // ⏳ await — "inga wait pannu"
};
```

`await` irundhu `async` illana → **error**.

## 📖 Q4: `'POST'` — capital + quotes

```js
if (req.method === 'POST')   // ✅
if (req.method === post)     // ❌ post = variable (illa) → error
if (req.method === 'post')   // ❌ match aagaadhu (method eppavume capital)
```

---

## ❓ En doubt: curl la JSON kuduthoma, text kuduthoma?

**Rendum!** — **JSON format la ezhudhina text** 😄

| Kelvi | Badhil |
|---|---|
| Type? | **Text (string)** — network la eppavume text (Ex 1) |
| Format? | **JSON rules** padi: `{"key":"value"}` |
| "Idhu JSON" nu yaar sonnadhu? | `-H "Content-Type: application/json"` — **label** 🏷️ |

```js
const text = '{"name":"prem"}';   // JSON maadhiri theriyum, typeof = string (dosai photo 📷🥞)
```

## 🔄 Full flow

```
curl -d '{"vehicleNumber":"TN09…"}'        📝 JSON format text
   │  -H Content-Type: application/json    🏷️ label
   │  🔪 network la thundu thundaa
   ▼
if (req.method === 'POST')
   ▼
getBody(req)
   ├─ req.on('data') → data += chunk       🧩 serthu (innum text)
   └─ req.on('end')  → JSON.parse(data)    📷→🥞 text → OBJECT
   ▼
body = { vehicleNumber: 'TN09…', name: 'Prem', … }
   ▼
insertRow({ VehicleNumber: body.vehicleNumber, … })
```

## 🟡 Destructure illa — property access

Naama `body.vehicleNumber` — **dot (`.`) vechu property edutthom** (property access).

**Destructuring** vera syntax, adhe velai:
```js
const { vehicleNumber, name, phoneNumber } = body;   // 👈 destructuring
```

| Vazhi | Code | Enga use |
|---|---|---|
| Property access | `body.vehicleNumber` | ✅ `index.js` |
| Destructuring | `const { entryType } = useParams()` | ✅ un React `VehicleEntry.jsx` 😉 |
