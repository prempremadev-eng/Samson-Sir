# Exercise 6 – getBody (ellam serthu) (Notes)

Date: 2026-10-06 · Time: 6:28 → 6:55 PM + 7:18 → 7:33 PM (~42 min, tea break thavira)
File: `6-getBody.js`

---

## Step 1 – Idea

Ex 5 Part C la ezhudhina code-ai **oru function kulla** pottom. Pudhusaa onnum illa 😊

**getBody velai:** network la thundu thundaa varra body-a serthu, object aa maathi thirumba kudukkum. Crash aagaadhu.

🏨 Hotel la: **order slip padikkura assistant** 📝 — envelope ellam open panni, ottu, padichu, "idho order details" nu cook kitta kudupaar.

---

## Step 2 – Part A: getBody function

```js
const EventEmitter = require('events');

function getBody(req) {
  return new Promise((resolve) => {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch { resolve({}); }
    });
  });
}
```

| Line | Endha exercise |
|---|---|
| `let data = ''` | Ex 5 (`box`) |
| `req.on('data', ...)`, `data += chunk` | Ex 5 ✅ |
| `req.on('end', ...)` | Ex 5 ✅ |
| `try { } catch { }` | Ex 2 ✅ |
| `data ? ... : {}` | Ex 3 ✅ |
| `JSON.parse(data)` | Ex 1 ✅ |
| `new Promise((resolve) => ...)`, `resolve(...)` | Ex 4 ⏸️ — ippo **"result-a thirumba kudu"** |

---

## Step 3 – Part B: Fake order anuppi test

```js
const req = new EventEmitter();

getBody(req).then((body) => {
  console.log('Body kidaichathu:', body);
  console.log('Name:', body.name);
});

req.emit('data', '{"name":');
req.emit('data', '"prem"}');
req.emit('end');
```

**Guess:** Body kidaichadhu object, Name: prem ✅

**Output:**
```
Body kidaichathu: { name: 'prem' }
Name: prem
```

`body` **object** — `getBody` ulla `JSON.parse` aagiduchu, so `body.name` work aagudhu 🎉

| Line | Artham |
|---|---|
| `getBody(req)` | Order slip padikka aarambi |
| `.then((body) => ...)` | Padichu mudinjaa, result `body` la varum |
| `req.emit(...)` | Fake ah thundu thundaa anuppurom |

---

## Step 4 – Part C: 3 case test 🛡️

```js
// Test 1: sariyaana body
const req1 = new EventEmitter();
getBody(req1).then((body) => console.log('Test 1:', body));
req1.emit('data', '{"name":"prem"}');
req1.emit('end');

// Test 2: body illa
const req2 = new EventEmitter();
getBody(req2).then((body) => console.log('Test 2:', body));
req2.emit('end');

// Test 3: thappaana body
const req3 = new EventEmitter();
getBody(req3).then((body) => console.log('Test 3:', body));
req3.emit('data', '{"name":');
req3.emit('end');
```

**Output:**
```
Test 1: { name: 'prem' }
Test 2: {}
Test 3: {}
```

| Test | Body | Output | Yen |
|---|---|---|---|
| 1 | `{"name":"prem"}` | `{ name: 'prem' }` | Sariyaana JSON → parse → object ✅ |
| 2 | (onnum illa) | `{}` | `data = ''` → falsy → `{}` (**Ex 3**) |
| 3 | `{"name":` (thappu) | `{}` | Parse 💥 → `catch` → `{}` (**Ex 2**) |

**3 case-lum crash aagala, eppavume object varudhu** 🛡️💪

---

## Step 5 – Naan fix panna bugs 🐛🕵️

| Line | Bug | Error | Fix |
|---|---|---|---|
| 31 | `req.end('end')` | `TypeError: req.end is not a function` | `req.emit('end')` |
| 42 | `getbody` (small b) | `ReferenceError: getbody is not defined` | `getBody` |
| 48–49 | `req` (thappaana variable) + `.end` | `TypeError: req.end is not a function` | `req3.emit(...)` |

| Error type | Artham |
|---|---|
| `TypeError` | Thappaana type use pannirukka (eg. function illaadha onna call pannadhu) |
| `ReferenceError` | Illaadha per-a use pannirukka (spelling / case) |

⭐ **Lessons:**
- **EventEmitter la `.on` and `.emit` mattum dhaan** — `.end` illa (rendu dhadava vandhuchu!)
- JavaScript la **capital / small letter vera vera** — `getBody` ≠ `getbody`
- Copy pannum bodhu **variable per maathanum** — `req3` create pannittu `req` use pannadhu
- Error vandhaa: **file per + line number** paaru → error type → message padi
- Fix pannittu **Ctrl + S** maraka koodaadhu

---

## Step 6 – Test 3-a sariyaakka?

`'{"name":'` la `"prem"` value-um `}`-um missing.

| Part | Irukka? |
|---|---|
| `{` | ✅ |
| `"name"` | ✅ |
| `:` | ✅ |
| `"prem"` value | ❌ |
| `}` | ❌ |

**Vazhi 1:** orey thundu la full — `req3.emit('data', '{"name":"prem"}')`
**Vazhi 2:** innoru thundu — `req3.emit('data', '"prem"}')` (real network idhu maadhiri dhaan)

Naan try pannadhu: `'{"name":"divya"}'` → `Test 3: { name: 'divya' }` ✅

⚠️ Aana Test 3 oda **purpose** = thappaana body vandhaa crash aagaama `{}` varudhaa nu test. Sariyaakkina adhu Test 1 maadhiri aagidum. Moonu case-um test-la irukkanum.

---

## 🧩 Summary – ellam connect aachu

| Exercise | getBody la | |
|---|---|---|
| Ex 1 JSON | `JSON.parse(data)` | ✅ |
| Ex 2 try / catch | `try { } catch { resolve({}) }` | ✅ |
| Ex 3 ternary | `data ? ... : {}` | ✅ |
| Ex 4 Promise | `new Promise`, `resolve`, `.then` | ⏸️ |
| Ex 5 Events | `req.on('data')`, `req.on('end')` | ✅ |
| **Ex 6 getBody** | **Ellam serthu, 3 case test pass** | ✅ |

---

## ➡️ Adutha step

Indha `getBody`-a **real `index.js`** la vekkanum:
`my-vehicle-app/functions/entry_api/index.js` → 5.4 Part 2

Real la `req` = **network la varra request** — `emit` naama pannamaattom, **Node thaana** pannum.
