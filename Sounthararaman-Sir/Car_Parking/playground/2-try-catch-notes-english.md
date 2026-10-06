# Exercise 2 – try / catch (Notes – English)

Date: 2026-10-06
File: `2-try.catch.js`

---

## Step 1 – Why do we need it?

In Exercise 1, we gave `JSON.parse` a **correct** text.
But what if **bad** text comes over the network? → The program **crashes**, and none of the code below it runs.

If the backend (`index.js`) crashes → the whole hotel closes 😱
`try / catch` is how we prevent that 🛡️

---

## Step 2 – Part A: We saw the crash with our own eyes 💥

```js
const badText = '{"name":"prem"';   // the closing } is missing

console.log('Start');

const obj = JSON.parse(badText);
console.log(obj.name);

console.log('End');
```

**My guess:** "Start" prints, then it crashes, and "End" never prints ✅ (correct!)

**Output:**
```
Start
SyntaxError: Expected ',' or '}' after property value in JSON at position 14 (line 1 column 15)
    at JSON.parse (<anonymous>)
    at Object.<anonymous> (.../playground/2-try.catch.js:4:18)
    ...
```

| Line | Printed? |
|---|---|
| `Start` | ✅ |
| `obj.name` | ❌ crashed |
| `End` | ❌ |

---

## Step 3 – Reading the error message

| Part | Meaning |
|---|---|
| `SyntaxError` | Error type: "the JSON breaks the rules" |
| `Expected ',' or '}'` | After `"prem"` it expected a `,` or a `}`, but nothing came |
| `position 14` | The problem is at character 14 of the text |
| `at JSON.parse` | The function where it crashed |
| **`2-try.catch.js:4:18`** | **Your file, line 4, column 18** ⭐ |

💡 When you see an error, first look for the line with **your file name + line number**.
The `node:internal/...` lines are Node's own internal files — you can ignore them for now.

---

## Step 4 – Part B: We stopped the crash with `try / catch` 🛡️

```js
const badText = '{"name":"prem"';

console.log('Start');

try {
  const obj = JSON.parse(badText);
  console.log(obj.name);
} catch (err) {
  console.log('JSON thappu:', err.message);
}

console.log('End');
```

**Output:**
```
Start
JSON thappu: Expected ',' or '}' after property value in JSON at position 14 (line 1 column 15)
End
```

**"End" prints → the program did not crash** 🎉

---

## Step 5 – Line by line

```js
try {
  const obj = JSON.parse(badText);   // ① try this → 💥 error!
  console.log(obj.name);             // ② skipped (the error already happened)
} catch (err) {                      // ③ catch the error and store it in err
  console.log('JSON thappu:', err.message);  // ④ print the message
}
console.log('End');                  // ⑤ the program continues ✅
```

| Part | Meaning | In the hotel 🏨 |
|---|---|---|
| `try { }` | "Try to run this" | The cook tries to make a dosa |
| When an error happens | The rest of `try` is **skipped**; it jumps straight to `catch` | The batter has gone bad! The cook stops |
| `catch (err)` | **Catch** the error and name it `err` | The cook takes the problem in hand |
| `err.message` | The text that explains the error | A note: "the batter went bad" |
| Code inside `catch` | The backup plan | "Sorry, no dosa today" |
| `End` | The program keeps going | The hotel stays open; next order ✅ |

---

## Step 6 – What if the text is correct?

```js
const badText = '{"name":"prem"}';   // we added the }
```

**Output:**
```
Start
prem
End
```

- `catch` **did not run** — there was no error, so it was skipped
- Only `prem` printed — the code logs `obj.name`, not `obj`

| Code | What it prints |
|---|---|
| `console.log(obj)` | `{ name: 'prem' }` — the whole object 📦 |
| `console.log(obj.name)` | `prem` — just the value inside 🎁 |

---

## 📊 Summary

```
try  → ✅ success  → catch is SKIPPED
try  → 💥 error    → catch RUNS
```

| `badText` | `try` | `catch` | Output |
|---|---|---|---|
| `'{"name":"prem"'` (missing `}`) | 💥 | ✅ runs | Start / JSON thappu: … / End |
| `'{"name":"prem"}'` (correct) | ✅ | ❌ skipped | Start / prem / End |
| **No** try/catch + bad text | 💥 | — | Start / red error (no End) |

**"End" prints in both cases → that is the power of try / catch** 🛡️

---

## 🏨 Where is this used in the real app?

`entry_api/index.js` → `getBody`:

```js
try { resolve(data ? JSON.parse(data) : {}); }
catch { resolve({}); }
```

If a bad body arrives, it does not crash — it returns `{}` (an empty object) → the hotel stays open ✅

💡 Here `catch` has no `(err)` — if you don't need the error message, you can just write `catch { }`.

---

## 🗣️ Spoken English practice

Try saying these out loud:

- "If `JSON.parse` gets invalid text, it throws an error and the program crashes."
- "We wrap risky code in a `try` block."
- "If an error happens, the rest of the `try` block is skipped and the `catch` block runs."
- "If there is no error, the `catch` block is skipped."
- "`err.message` tells us what went wrong."
- "With `try / catch`, the program keeps running even when something fails."
- "When I read an error, I first look for my file name and the line number."
