# Exercise 5 – Events (`.on` / `.emit`) (Notes – English)

Date: 2026-10-06 · Time: 4:55 → 6:22 PM (~1 h 27 min)
File: `5-events.js`

---

## Step 1 – What is an event?

**An event is a signal that "something happened"** 🔔

| Real life | Event |
|---|---|
| The doorbell rings | a "bell" event |
| The phone rings | a "ring" event |
| A customer walks into the hotel | a "customer" event |

| Word | Meaning | |
|---|---|---|
| `.on` | **Listen** 👂 — tell it in advance: "when this event happens, do this" | 📝 A note |
| `.emit` | **Send the signal** 📢 — make the event happen | 🔘 Press the switch |

🏨 In the hotel: you tell the waiter, *"When a customer comes in, say 'Vanakkam'."* Until a customer arrives, the waiter just waits.

---

## Step 2 – Part A: one event

```js
const EventEmitter = require('events');
const hotel = new EventEmitter();

hotel.on('customer', () => {
  console.log('Vanakkam! 🙏');
});

console.log('Hotel open');
hotel.emit('customer');
```

| Line | Meaning |
|---|---|
| `require('events')` | Node's built-in events tool (no download needed) |
| `new EventEmitter()` | A new event machine — the hotel 🏨 |
| `hotel.on('customer', ...)` | "When a customer comes, do this" — **it does not run yet** |
| `hotel.emit('customer')` | Ring the bell 🔔 → the `.on` function runs |

**Output:**
```
Hotel open
Vanakkam! 🙏
```

⭐ Even though `.on` is **written first, it does not print first**. It waits until `emit` happens 👂

---

## Step 3 – Part B: sending data with an event

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

- `(food)` is the **plate** 🍽️ — the value that `emit` sends lands on the plate
- **One `.on`, many `emit`s** — you set up `.on` once, and it runs again for every `emit`
- Same as Step 1 of Ex 4: `eat('🥞')` → `food = '🥞'`

---

## Step 4 – Not a loop, a switch 🔘 (my observation)

| Loop (`for` / `while`) | Event (`.on` + `emit`) |
|---|---|
| Keeps checking again and again: "Is it here? Is it here?" 🔁 | Just waits. When it arrives, the **switch turns on** 🔘 |
| We are in control | Something outside (the network) is in control |
| 🏨 The waiter walks to the door every minute to check | 🏨 There is a bell on the door. The waiter only comes when it rings |

This style is called **event-driven programming**.

---

## Step 5 – Part C: data arriving in pieces (`data` + `end`)

Over the network, the body arrives **in pieces (chunks)**. Node emits:
- a **`'data'`** event for every piece
- an **`'end'`** event once everything has arrived

We faked it like this:

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

**How `box` grows 📦**

| Step | Event | `chunk` | `box` |
|---|---|---|---|
| Start | — | — | `''` |
| 1 | `data` | `{"name":` | `{"name":` |
| 2 | `data` | `"prem"}` | `{"name":"prem"}` |
| 3 | `end` | — | printed ✅ |

---

## Step 6 – The 2 bugs I found 🐛🕵️

| Bug | Problem | What the output showed | Fix |
|---|---|---|---|
| 1 | Both `.on` calls were listening for `'data'` | "Ellam vanthuchu" printed for every piece. Nobody was listening for `emit('end')` 🔇 | Change the 2nd `.on` to `'end'` |
| 2 | `'"prem}'` — a `"` was missing | Full: `{"name":"prem}` (invalid JSON) | `'"prem"}'` |

⭐ **Lesson:** you can attach **many `.on` listeners** to one event, and they all run. That is why the **event name must be correct**.

💡 The `'end'` event sends no data — if you write `(chunk)`, it will just be `undefined`. Writing `() =>` is cleaner.

---

## 🎯 Step 7 – This is exactly `getBody`!

| My Part C | `getBody` (real) |
|---|---|
| `let box = '';` | `let data = '';` |
| `req.on('data', (chunk) => { box += chunk; })` | `req.on('data', (chunk) => { data += chunk; });` |
| `req.on('end', () => { ... box ... })` | `req.on('end', () => { ... JSON.parse(data) ... })` |
| `req.emit(...)` — we faked it | **Node emits it by itself** (from the network) |

```js
req.on('end', () => {
  try { resolve(data ? JSON.parse(data) : {}); }   // Ex 1 + Ex 3
  catch { resolve({}); }                            // Ex 2
});
```

| Case | `data` | Result |
|---|---|---|
| Correct body | `'{"name":"prem"}'` | truthy → parse → `{ name: 'prem' }` ✅ |
| No body | `''` | falsy → `{}` |
| Broken body | `'{"name":'` | parse 💥 → catch → `{}` |

**We always get an object back, and it never crashes** 🛡️

💡 For now, think of `resolve` as **"give the result back"**. It belongs to Promise (Ex 4 ⏸️).

---

## 🧩 Everything connects

| Exercise | Where it is in getBody |
|---|---|
| Ex 1 JSON ✅ | `JSON.parse(data)` |
| Ex 2 try / catch ✅ | `try { } catch { }` |
| Ex 3 ternary ✅ | `data ? ... : {}` |
| Ex 4 Promise ⏸️ | `new Promise`, `resolve` |
| **Ex 5 Events ✅** | **`req.on('data')`, `req.on('end')`** |

---

## 🗣️ Spoken English practice

Try saying these out loud:

- "An event is a signal that something has happened."
- "`.on` listens for an event, and `.emit` triggers it."
- "The listener does not run until the event is emitted."
- "We can send data along with an event, and the listener receives it as a parameter."
- "This is not a loop — it is event-driven. The code just waits for the signal."
- "The request body arrives in chunks, so we collect each chunk in a variable."
- "When the `end` event fires, we parse the full text into an object."
- "I found the bug: both listeners were listening for `data` instead of `end`."
