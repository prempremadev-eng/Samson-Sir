# 🧊 Revision 2 – Part 3: Store room thirakkuradhu (en story + corrections)

Date: 2026-10-07
File: `my-vehicle-app/functions/entry_api/index.js`

---

## 💬 My learning rule

> **"I don't need output, I need *why* is it needed."**

---

## 📖 Code

```js
module.exports = async (req, res) => {
  try {
    const app = catalyst.initialize(req, { scope: 'admin' });
    const table = app.datastore().table('ParkingEntries');

    const result = await table.getPagedRows({ maxRows: 10 });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ rows: result.data }));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
};
```

---

## ✍️ En story (en words la — 90% correct 👏)

> async — inga store room-ku poga vendiyadhu varum, poittu vara konjam time aagum, adhanaala inga wait panra oru situation varum nu mention pannanum. req, res — recipe-a oru plate la vechu kudukkuranga. Adutha velai la thappu varalaam, adhanaala `try` block la vekkalaam. Key vandhu, admin permission vaanginom. Key vechu datastore-ku poi open panni ParkingEntries table (shelf) target pannu, adhukku per `table`. Andha table-ku poi 10 items eduthu vaanga, return vara time aagum, so wait — `await`. Kondu vandha result-a plate la vei — `res.writeHead` (200 success, content type application/json, so object-a text aa maathi `res.end` ku kudu). Store room la eduthu vara mudiyala na, `err` show pannu, text aa poganum. Idha export pannunga nu `catalyst serve` kitta sollanum.

---

## ✅ / 🟡 Check

| # | En story | Technically | |
|---|---|---|---|
| 1 | `async` — store room poi vara time aagum, wait situation | `async` = "inga `await` irukku" sticker 🏷️ | ✅ |
| 2 | `req, res` — recipe-a plate la vechu kudukkuranga | Recipe = full function. `req` = order slip, `res` = kaali plate | 🟡 |
| 3 | Thappu varalaam → `try` | Ex 2 | ✅ |
| 4 | Admin permission | `scope: 'admin'` = owner saavi | ✅ |
| 5 | Key function-ku **recipe** venum | **Order slip** (`req`) venum — hidden hotel details | 🟡 |
| 6 | Datastore open → ParkingEntries target → `table` | | ✅ |
| 7 | 10 items, time aagum → `await` | | ✅ |
| 8 | `res.writeHead` = plate la vekkuradhu | Plate mela **label** (status + type) | 🟡 |
| 9 | `application/json`, object → text → `res.end` | Ex 1 | ✅ |
| 10 | Problem → `err` text | **500** status oda | ✅ |
| 11 | Export → `catalyst serve` kitta | Jannal 🪟 | ✅ |

---

## 🟡 Corrections

### `req, res` ≠ recipe

| | Enna | Hotel la |
|---|---|---|
| Function `{ ... }` | Un code | 📖 **Recipe** |
| `req` | Customer enna kettaar (URL, GET/POST, body) | 📝 **Order slip** (ulla varudhu) |
| `res` | Customer-ku anuppura response | 🍽️ **Kaali plate** (veliya pogum) |

### `initialize(req, ...)` — yen `req`?

`catalyst serve` order slip kooda **hidden details** attach pannum:
- Endha project (`my-vehicle-app-2`)
- Endha environment (Development)
- Login token 🎫

`initialize(req)` adha eduthu **sariyaana hotel-oda store room saavi** ready pannum.

🏨 Order slip-oda **hotel license + owner ID card** clip pannirukku.

### `res.writeHead` = label, `res.end` = content + anuppu

| Function | Enna | Hotel la |
|---|---|---|
| `res.writeHead(200, {...})` | Status + type **label** | 🏷️ "✅ OK (200), ulla JSON" |
| `res.end(text)` | Content vechu **anuppu** | 🍽️ Dosai vechu kudu |

| Status | Artham |
|---|---|
| 200 | ✅ Success |
| 404 | 🔍 Kandupudikka mudiyala |
| 500 | ❌ Server la problem |

---

## 📖 Corrected story

> **Cook-oda recipe** (`module.exports = async (req, res) => {...}`):
>
> Waiter (`catalyst serve`) order slip-um (`req`) kaali plate-um (`res`) kuduthu cook-a koopidraar. Recipe mela sticker: "**store room ku poga vendi varum, wait pannanum**" (`async`).
>
> "Problem varalaam, kavanamaa pannu" nu (`try`) cook start pannuraar:
>
> 1. **Order slip** la irukka hotel details vechu, **owner permission** oda (`scope: 'admin'`) saavi bunch ready (`catalyst.initialize(req, ...)`) → `app`
> 2. Bunch la **store room saavi** (`datastore()`) → **ParkingEntries shelf** target (`.table('ParkingEntries')`) → `table`
> 3. Shelf la **10 items** eduthu vara poraar (`getPagedRows({ maxRows: 10 })`). Dhooram → **wait** (`await`) → `result`
> 4. Plate mela **label**: "✅ OK, ulla JSON" (`writeHead(200, ...)`)
> 5. Items-a **text aa maathi** (`JSON.stringify`) plate la vechu **kudu** (`res.end`)
>
> Store room thirakka mudiyala na (`catch`) → label "❌ **500**", plate la **error message**.
>
> Recipe **jannal la** (`module.exports`) irukkuradhaala dhaan waiter-ku kidaikkudhu.

---

## 📦 Module = box, `module.exports` = jannal

| Word | Artham |
|---|---|
| Module | Ovvoru `.js` file-um oru **thani box** 📦 — ulla irukkuradhu veliya theriyaadhu |
| `module.exports = X` | Box oda **jannal** 🪟 — X mattum veliya pogum |
| `require('...')` | Vera box-oda jannal la irundhu **edukkuradhu** |

**Yen venum?** Illana `catalyst serve` un recipe-a kandupudikka mudiyaadhu → error.

## 🧩 `(req, res)` & `async` — yaar kudukkuraanga?

| Word | Yaar | Artham |
|---|---|---|
| `req` | `catalyst serve` (waiter) | 📝 Order slip |
| `res` | `catalyst serve` (waiter) | 🍽️ Plate |
| `async` | **Naan** ezhudhuradhu (keyword) | 🏷️ "Wait step irukku" |
| `await` | **Naan** ezhudhuradhu (keyword) | ⏳ "Inga wait pannu" |

Rule: `await` irundhaa function mela `async` kandippa venum 👫
