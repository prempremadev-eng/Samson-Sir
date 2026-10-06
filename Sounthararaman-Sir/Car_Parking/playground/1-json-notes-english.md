# Exercise 1 – JSON.parse & JSON.stringify (Notes – English)

Date: 2026-10-06
File: `1-json.js`

---

## Step 1 – We started with a text

```js
const text = '{"vehicleNumber" : "TN09ABI234","name": "prem"}';
```

It looks like an object. But it has outer `' '` (single quotes).
In JavaScript, anything inside `' '` is just **text (a string)**.

> 📷🥞 It is like a photo of a dosa — it looks like a dosa, but you cannot eat it.

---

## Step 2 – Two questions

```js
console.log(typeof text)   // → string
console.log(text.name)     // → undefined
```

| Question | Output | Why |
|---|---|---|
| `typeof text` | `string` | It has outer `' '` quotes, so it is text |
| `text.name` | `undefined` | A string does not have a property called `name` |

---

## Step 3 – Why is `text.name` `undefined`?

A string is only **a sequence of letters**:

```
index:  0   1   2   3   4   5 ...
letter: {   "   v   e   h   i ...
```

- What a string has: `text.length` (how many letters), `text[0]` (the first letter, `{`)
- Even though the letters "name" are inside, JavaScript does not read or understand them
- When you ask for a property that does not exist, JavaScript answers **`undefined`** ("there is nothing with that name")

---

## Step 4 – `JSON.parse()` : text ➜ object

```js
const obj = JSON.parse(text)
console.log(typeof obj)   // → object
console.log(obj)          // → { vehicleNumber: 'TN09ABI234', name: 'prem' }
console.log(obj.name)     // → prem
```

**Behind the scenes:** parse reads the text letter by letter and builds an object.

| Letter it reads | What parse thinks |
|---|---|
| `{` | Start a new object |
| `"vehicleNumber"` | This is a key |
| `:` | A value is coming next |
| `"TN09ABI234"` | This is the value (a string) |
| `,` | Another key is coming |
| `"name"` `:` `"prem"` | One more key + value |
| `}` | The object is finished → return it |

💡 When Node prints an object, the keys have **no quotes** (`vehicleNumber:`). Text keeps its quotes (`"vehicleNumber"`). This is how you can tell them apart.

⚠️ If the text breaks the rules (e.g. a missing `"`), parse **throws an error** → Exercise 2 (`try / catch`).

---

## Step 5 – `JSON.stringify()` : object ➜ text

```js
const back = JSON.stringify(obj)
console.log(back)          // → {"vehicleNumber":"TN09ABI234","name":"prem"}
console.log(typeof back)   // → string
console.log(back.name)     // → undefined
```

**Behind the scenes:** it goes through **every key** in the object and writes it as text.

| Step | Text being built |
|---|---|
| Start | `{` |
| key `vehicleNumber` | `{"vehicleNumber":"TN09ABI234"` |
| key `name` | `{"vehicleNumber":"TN09ABI234","name":"prem"` |
| End | `{"vehicleNumber":"TN09ABI234","name":"prem"}` |

- Every key is included, nothing is skipped
- It does not add spaces (`" : "` becomes `":"`)

---

## Step 6 – What is `JSON`? What is `parse`?

| | What it is |
|---|---|
| `JSON` | A built-in **object** (not a class). It lives inside the JavaScript engine, so no `require` is needed |
| `parse` / `stringify` | **Methods** inside the `JSON` object (a function inside an object is called a method) |
| `.` (dot) | Means "inside the box" — `JSON.parse` = the parse inside the JSON box |

Same pattern: `console.log`, `Math.round`, `JSON.parse`

JSON has a second meaning: **JavaScript Object Notation** — a format for writing data as text.

---

## Step 7 – `typeof` words (a fixed list)

| `typeof` result | Example |
|---|---|
| `string` | `'hello'`, `'{...}'` — all text is this (there is no type called "text"!) |
| `number` | `42` |
| `boolean` | `true` / `false` |
| `object` | `{ name: 'prem' }` |
| `undefined` | A value that does not exist |
| `function` | `JSON.parse` |

⚠️ `typeof` is all lowercase. `typeOf` gives an error.

---

## 🔄 Summary

```
          JSON.parse(text)
  text  ─────────────────▶  object
(letters)                  (.name works)
        ◀─────────────────
         JSON.stringify(obj)
```

| | Type | `.name` |
|---|---|---|
| `text` | string | ❌ undefined |
| `JSON.parse(text)` | object | ✅ prem |
| `JSON.stringify(obj)` | string | ❌ undefined |

---

## 🏨 Where is this used in the real app?

```
React form (object) ──stringify──▶ "text" ──network──▶ "text" ──parse──▶ index.js (object)
```

- **React** (`VehicleEntry.jsx`): `JSON.stringify` before sending the data
- **Backend** (`entry_api/index.js` → `getBody`): `JSON.parse` after receiving it

Data always travels over the network as **text**. That is why we need both.

---

## 🗣️ Spoken English practice

Try saying these out loud:

- "This looks like an object, but it is actually a string, because it has quotes around it."
- "`text.name` returns `undefined` because a string does not have a `name` property."
- "`JSON.parse` converts a JSON string into a JavaScript object."
- "`JSON.stringify` converts an object back into a string."
- "We stringify the data before sending it, and we parse it after receiving it."
- "`JSON` is a built-in object, and `parse` is one of its methods."
