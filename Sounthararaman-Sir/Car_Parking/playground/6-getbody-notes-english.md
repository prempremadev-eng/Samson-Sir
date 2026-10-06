# Exercise 6 – getBody (everything together) (Notes – English)

Date: 2026-10-06 · Time: 6:28 → 6:55 PM + 7:18 → 7:33 PM (~42 min, not counting the tea break)
File: `6-getBody.js`

---

## Step 1 – The idea

We took the code from Ex 5 Part C and put it **inside one function**. Nothing new 😊

**What getBody does:** it collects the body that arrives over the network in pieces, turns it into an object, and gives it back. It never crashes.

🏨 In the hotel: an **assistant who reads the order slip** 📝 — opens every envelope, sticks the pieces together, reads it, and hands the cook "here are the order details".

---

## Step 2 – Part A: the getBody function

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

| Line | Which exercise |
|---|---|
| `let data = ''` | Ex 5 (`box`) |
| `req.on('data', ...)`, `data += chunk` | Ex 5 ✅ |
| `req.on('end', ...)` | Ex 5 ✅ |
| `try { } catch { }` | Ex 2 ✅ |
| `data ? ... : {}` | Ex 3 ✅ |
| `JSON.parse(data)` | Ex 1 ✅ |
| `new Promise((resolve) => ...)`, `resolve(...)` | Ex 4 ⏸️ — for now, **"give the result back"** |

---

## Step 3 – Part B: testing with a fake order

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

**My guess:** the body is an object, Name: prem ✅

**Output:**
```
Body kidaichathu: { name: 'prem' }
Name: prem
```

`body` is an **object** — `JSON.parse` already ran inside `getBody`, so `body.name` works 🎉

| Line | Meaning |
|---|---|
| `getBody(req)` | Start reading the order slip |
| `.then((body) => ...)` | When reading is done, the result arrives in `body` |
| `req.emit(...)` | We send the pieces ourselves (fake) |

---

## Step 4 – Part C: testing 3 cases 🛡️

```js
// Test 1: correct body
const req1 = new EventEmitter();
getBody(req1).then((body) => console.log('Test 1:', body));
req1.emit('data', '{"name":"prem"}');
req1.emit('end');

// Test 2: no body
const req2 = new EventEmitter();
getBody(req2).then((body) => console.log('Test 2:', body));
req2.emit('end');

// Test 3: broken body
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

| Test | Body | Output | Why |
|---|---|---|---|
| 1 | `{"name":"prem"}` | `{ name: 'prem' }` | Valid JSON → parse → object ✅ |
| 2 | (nothing) | `{}` | `data = ''` → falsy → `{}` (**Ex 3**) |
| 3 | `{"name":` (broken) | `{}` | Parse 💥 → `catch` → `{}` (**Ex 2**) |

**No crash in any of the 3 cases — we always get an object back** 🛡️💪

---

## Step 5 – The bugs I fixed 🐛🕵️

| Line | Bug | Error | Fix |
|---|---|---|---|
| 31 | `req.end('end')` | `TypeError: req.end is not a function` | `req.emit('end')` |
| 42 | `getbody` (lowercase b) | `ReferenceError: getbody is not defined` | `getBody` |
| 48–49 | `req` (wrong variable) + `.end` | `TypeError: req.end is not a function` | `req3.emit(...)` |

| Error type | Meaning |
|---|---|
| `TypeError` | You used something as the wrong type (e.g. calling something that is not a function) |
| `ReferenceError` | You used a name that does not exist (spelling / capital letters) |

⭐ **Lessons:**
- **An EventEmitter only has `.on` and `.emit`** — there is no `.end` (this bug came up twice!)
- JavaScript is **case-sensitive** — `getBody` ≠ `getbody`
- When you copy code, **change the variable name** — I created `req3` but used `req`
- When you see an error: look at the **file name + line number** → the error type → read the message
- After fixing, **don't forget Ctrl + S**

---

## Step 6 – Making Test 3 valid

`'{"name":'` is missing the `"prem"` value and the `}`.

| Part | Present? |
|---|---|
| `{` | ✅ |
| `"name"` | ✅ |
| `:` | ✅ |
| `"prem"` value | ❌ |
| `}` | ❌ |

**Way 1:** send it all in one piece — `req3.emit('data', '{"name":"prem"}')`
**Way 2:** send one more piece — `req3.emit('data', '"prem"}')` (this is how the real network works)

What I tried: `'{"name":"divya"}'` → `Test 3: { name: 'divya' }` ✅

⚠️ But the **purpose** of Test 3 is to check that a broken body returns `{}` without crashing. If we fix it, it just becomes Test 1 again. All three cases should stay in the tests.

---

## 🧩 Summary – everything connects

| Exercise | In getBody | |
|---|---|---|
| Ex 1 JSON | `JSON.parse(data)` | ✅ |
| Ex 2 try / catch | `try { } catch { resolve({}) }` | ✅ |
| Ex 3 ternary | `data ? ... : {}` | ✅ |
| Ex 4 Promise | `new Promise`, `resolve`, `.then` | ⏸️ |
| Ex 5 Events | `req.on('data')`, `req.on('end')` | ✅ |
| **Ex 6 getBody** | **Everything together, all 3 tests pass** | ✅ |

---

## ➡️ Next step

Put this `getBody` into the **real `index.js`**:
`my-vehicle-app/functions/entry_api/index.js` → step 5.4 Part 2

In real life, `req` is **the request coming over the network** — we don't call `emit` ourselves; **Node does it for us**.

---

## 🗣️ Spoken English practice

Try saying these out loud:

- "getBody collects the request body piece by piece and turns it into an object."
- "It returns a promise, so we use `.then` to get the result."
- "I tested three cases: a valid body, an empty body, and a broken body."
- "In every case, it returns an object, so the server never crashes."
- "A `ReferenceError` means I used a name that does not exist."
- "A `TypeError` means I tried to call something that is not a function."
- "JavaScript is case-sensitive, so `getBody` and `getbody` are different."
- "In the real app, Node emits the `data` and `end` events for us."
