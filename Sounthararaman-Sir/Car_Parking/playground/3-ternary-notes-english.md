# Exercise 3 – `? :` Ternary & truthy / falsy (Notes – English)

Date: 2026-10-06
File: `3-ternary.js`

---

## Step 1 – What is a ternary?

A short way to write **if / else on one line**.

```js
// if / else
let result;
if (data) {
  result = 'data irukku';
} else {
  result = 'data illa';
}

// ternary – same job, one line
const result = data ? 'data irukku' : 'data illa';
```

| Part | Meaning |
|---|---|
| `data` | The **question** — is there data? |
| `?` | "If yes…" |
| `'data irukku'` | Use this when it is true |
| `:` | "Otherwise…" |
| `'data illa'` | Use this when it is false |

🏨 In the hotel: **"Is there batter ? dosa : idli"** 😄

---

## Step 2 – Part A: two pieces of data

```js
const data1 = '{"name":"prem"}';
const data2 = '';

const r1 = data1 ? 'data irukku' : 'data illa';
const r2 = data2 ? 'data irukku' : 'data illa';
```

| | Value | My guess | Output |
|---|---|---|---|
| `r1` | `'{"name":"prem"}'` | data irukku | ✅ data irukku |
| `r2` | `''` (empty) | data illa | ✅ data illa |

**Why is `''` treated as "no"?** JavaScript decides whether the value before `?` counts as true or false:

| Value | What JavaScript thinks | Name |
|---|---|---|
| Text with letters in it | ✅ true | **truthy** |
| `''` empty string | ❌ false | **falsy** |

🏨 If the batter tin has batter → dosa. **Empty tin** → idli.

---

## Step 3 – Part B: guessing 8 values (5 / 8 correct 👏)

| # | Value | My guess | Correct | |
|---|---|---|---|---|
| 1 | `0` | falsy | falsy | ✅ |
| 2 | `5` | truthy | truthy | ✅ |
| 3 | `''` | falsy | falsy | ✅ |
| 4 | `' '` (a space) | falsy | **truthy** | 🪤 trap |
| 5 | `null` | falsy | falsy | ✅ |
| 6 | `undefined` | falsy | falsy | ✅ |
| 7 | `'false'` | falsy | **truthy** | 🪤 trap |
| 8 | `{}` | falsy | **truthy** | 🪤 trap |

---

## Step 4 – The traps explained 🪤

| Value | Why it is truthy | Hotel / example |
|---|---|---|
| `' '` (a space) | It looks empty, but it has **one character (a space)**. Length = 1 | One drop of batter in the tin — the tin is not empty |
| `'false'` | It is inside quotes → **text** (5 letters). Not the boolean `false` | 📷 Like the "dosa photo" — it says "false", but it is not really false |
| `{}` | **All objects are truthy**, even empty ones | 📦 An empty box is still a box |

---

## Step 5 – Easy rule: only these are falsy

| Falsy | |
|---|---|
| `false` | the boolean false |
| `0`, `-0`, `0n` | zero |
| `''` | empty string (not even a space) |
| `null` | |
| `undefined` | |
| `NaN` | "Not a Number" |

**Anything not on this list → truthy** (`' '`, `'false'`, `'0'`, `{}`, `[]`, `5`…)

---

## Step 6 – `JSON.parse('')` → error

```js
try {
  JSON.parse('');
} catch (err) {
  console.log(err.message);   // → Unexpected end of JSON input
}
```

| Part | Meaning |
|---|---|
| `SyntaxError` | The JSON breaks the rules (same type as in Exercise 2) |
| `Unexpected end` | The text ended before parsing could even start |
| `of JSON input` | In the JSON text that was given |

**Why?** `JSON.parse` looks at the first character to decide "is this an object (`{`), a string (`"`)…". `''` has no first character at all.

🏨 The cook opens the order slip — it is a **blank piece of paper** 📄

💡 Giving it `' '` (just a space) causes **the same error**. JSON ignores spaces.

---

## Step 7 – Using a ternary to avoid the error 🛡️

```js
const data = '';
const body = data ? JSON.parse(data) : {};
console.log(body);   // → {}
```

**My guess:** `{}` ✅

`''` is falsy → `JSON.parse` is **never called** → it returns `{}` straight away. No error!

---

## 📊 Summary

| What I learned | |
|---|---|
| `a ? b : c` | if / else on one line |
| truthy / falsy | Only 8 values are falsy; everything else is truthy |
| Traps | `' '`, `'false'`, `{}` → truthy |
| `JSON.parse('')` | `SyntaxError: Unexpected end of JSON input` |
| Protection | `data ? JSON.parse(data) : {}` |

---

## 🏨 Where is this used in the real app?

`entry_api/index.js` → `getBody`:

```js
try { resolve(data ? JSON.parse(data) : {}); }
catch { resolve({}); }
```

| Body | What happens |
|---|---|
| No body (`''`) | Ternary → `{}` (parse is never called) |
| Broken body | Parse inside `try` 💥 → `catch` → `{}` |
| Correct body | Parse ✅ → object |

**Ternary + try / catch = two layers of safety** 🛡️🛡️

---

## 🗣️ Spoken English practice

Try saying these out loud:

- "A ternary is a short way to write if / else on one line."
- "If the condition is truthy, it returns the first value; otherwise, it returns the second."
- "An empty string is falsy, but a string with just a space is truthy."
- "The string `'false'` is truthy because it is text, not a boolean."
- "All objects are truthy, even an empty object."
- "`JSON.parse` throws an error if you give it an empty string."
- "We check the data with a ternary first, so `JSON.parse` is never called on empty text."
