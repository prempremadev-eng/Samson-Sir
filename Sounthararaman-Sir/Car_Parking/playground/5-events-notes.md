# Exercise 5 – Events (`.on` / `.emit`) (Notes)

Date: 2026-10-06 · Time: 4:55 → 6:22 PM (~1 h 27 min)
File: `5-events.js`

---

## Step 1 – Event na enna?

**Event = "edhavadhu nadandhuchu"** nu oru signal 🔔

| Real life | Event |
|---|---|
| Door bell adikkudhu | "bell" event |
| Phone ring aagudhu | "ring" event |
| Customer hotel ulla varraar | "customer" event |

| Word | Meaning | |
|---|---|---|
| `.on` | **Kaathirundhu kelu** 👂 — "indha event nadandhaa, idha pannu" nu munnaadiye solli vei | 📝 Note |
| `.emit` | **Signal anuppu** 📢 — event-a nadathu | 🔘 Switch press |

🏨 Hotel la: waiter kitta *"Customer vandhaa 'Vanakkam' sollu"* nu sollura. Customer varra varaikkum waiter summa irupaar.

---

## Step 2 – Part A: Oru event

```js
const EventEmitter = require('events');
const hotel = new EventEmitter();

hotel.on('customer', () => {
  console.log('Vanakkam! 🙏');
});

console.log('Hotel open');
hotel.emit('customer');
```

| Line | Artham |
|---|---|
| `require('events')` | Node la irukka events tool (built-in, download vendaam) |
| `new EventEmitter()` | Pudhu event machine — hotel 🏨 |
| `hotel.on('customer', ...)` | "customer vandhaa idha pannu" — **ippo run aagaadhu** |
| `hotel.emit('customer')` | Bell adi 🔔 → `.on` function run aagum |

**Output:**
```
Hotel open
Vanakkam! 🙏
```

⭐ `.on` **mudhal la ezhudhiyirundhaalum mudhalla print aagala**. `emit` varra varaikkum wait pannudhu 👂

---

## Step 3 – Part B: Event kooda data anuppalaam

```js
hotel.on('order', (food) => {
  console.log('Order vandhuchu:', food);
});

hotel.emit('order', '🥞 Dosai');
hotel.emit('order', '🍚 Idli');
```

```
hotel.emit('order', '🥞 Dosai')
                      │
                      ▼
hotel.on('order', (food) => ...)   → food = '🥞 Dosai'
```

**Output:**
```
Order vandhuchu: 🥞 Dosai
Order vandhuchu: 🍚 Idli
```

- `(food)` = **plate** 🍽️ — `emit` kudukkura value plate la vizhum
- **Oru `.on`, pala `emit`** — `.on` oru dhadava solli vechaa podhum, ovvoru `emit`-kkum thirumba run aagum
- Step 1 (Ex 4) la paartha `eat('🥞')` → `food = '🥞'` maadhiri dhaan

---

## Step 4 – Loop illa, switch 🔘 (en observation)

| Loop (`for` / `while`) | Event (`.on` + `emit`) |
|---|---|
| Thirumba thirumba check: "vandhuchaa? vandhuchaa?" 🔁 | Summa wait. Vandhaa **switch on** 🔘 |
| Naama control pannurom | Veliya irundhu (network) control aagudhu |
| 🏨 Waiter ovvoru nimishamum kadhavu kitta poi paakkuraar | 🏨 Kadhavu la bell. Adichaa mattum waiter varraar |

Idhu per: **event-driven programming**.

---

## Step 5 – Part C: Thundu thundaa data (`data` + `end`)

Network la body **thundu thundaa (chunks)** varum. Node:
- ovvoru thundu-kkum → **`'data'`** event
- ellam vandhu mudinjaa → **`'end'`** event

Fake ah panni paarthom:

```js
const req = new EventEmitter();
let box = '';

req.on('data', (chunk) => {
  console.log('Thundu vanthuchu:', chunk);
  box += chunk;                       // box = box + chunk
});

req.on('end', () => {
  console.log('Ellam vanthuchu full :', box);
});

req.emit('data', '{"name":');
req.emit('data', '"prem"}');
req.emit('end');
```

**Output:**
```
Thundu vanthuchu: {"name":
Thundu vanthuchu: "prem"}
Ellam vanthuchu full : {"name":"prem"}
```

**`box` eppadi valarudhu 📦**

| Step | Event | `chunk` | `box` |
|---|---|---|---|
| Start | — | — | `''` |
| 1 | `data` | `{"name":` | `{"name":` |
| 2 | `data` | `"prem"}` | `{"name":"prem"}` |
| 3 | `end` | — | print ✅ |

---

## Step 6 – Naan kandupudicha 2 bugs 🐛🕵️

| Bug | Problem | Output la theriyudhu | Fix |
|---|---|---|---|
| 1 | Rendu `.on`-um `'data'` ku kaathirundhuchu | "Ellam vanthuchu" ovvoru thundu-kkum print aachu. `emit('end')` ku yaarum kaathirukkala 🔇 | 2nd `.on` → `'end'` |
| 2 | `'"prem}'` — `"` missing | Full: `{"name":"prem}` (thappaana JSON) | `'"prem"}'` |

⭐ **Lesson:** oru event-ku **pala `.on`** vekkalaam, ellam run aagum. Adhanaala **event name correct ah** irukkanum.

💡 `'end'` event data anuppaadhu — `(chunk)` vechaa `undefined` dhaan. `() =>` nu ezhudhinaa clean.

---

## 🎯 Step 7 – Idhu dhaan `getBody`!

| En Part C | `getBody` (real) |
|---|---|
| `let box = '';` | `let data = '';` |
| `req.on('data', (chunk) => { box += chunk; })` | `req.on('data', (chunk) => { data += chunk; });` |
| `req.on('end', () => { ... box ... })` | `req.on('end', () => { ... JSON.parse(data) ... })` |
| `req.emit(...)` — naama fake ah | **Node thaana** emit pannum (network la irundhu) |

```js
req.on('end', () => {
  try { resolve(data ? JSON.parse(data) : {}); }   // Ex 1 + Ex 3
  catch { resolve({}); }                            // Ex 2
});
```

| Case | `data` | Result |
|---|---|---|
| Sariyaana body | `'{"name":"prem"}'` | truthy → parse → `{ name: 'prem' }` ✅ |
| Body illa | `''` | falsy → `{}` |
| Thappaana body | `'{"name":'` | parse 💥 → catch → `{}` |

**3 case-lum object varum, crash aagaadhu** 🛡️

💡 `resolve` ippo **"result-a thirumba kudu"** nu nyabagam vechukko. Adhu Promise (Ex 4 ⏸️) part.

---

## 🧩 Ellam connect aagudhu

| Exercise | getBody la |
|---|---|
| Ex 1 JSON ✅ | `JSON.parse(data)` |
| Ex 2 try / catch ✅ | `try { } catch { }` |
| Ex 3 ternary ✅ | `data ? ... : {}` |
| Ex 4 Promise ⏸️ | `new Promise`, `resolve` |
| **Ex 5 Events ✅** | **`req.on('data')`, `req.on('end')`** |
