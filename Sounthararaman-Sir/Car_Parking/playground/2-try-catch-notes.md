# Exercise 2 – try / catch (Notes)

Date: 2026-10-06
File: `2-try.catch.js`

---

## Step 1 – Yen venum?

Exercise 1 la `JSON.parse` ku **sariyaana** text kuduthom.
Aana network la **thappaana** text vandhaa? → Program **crash** aagidum, keezha irukka code edhuvum odaadhu.

Backend (`index.js`) crash aanaa → hotel-e moodidum 😱
Adhai thadukka dhaan `try / catch` 🛡️

---

## Step 2 – Part A: Crash-a kannala paarthom 💥

```js
const badText = '{"name":"prem"';   // kadaisi la } illa

console.log('Start');

const obj = JSON.parse(badText);
console.log(obj.name);

console.log('End');
```

**Guess:** Start print aagum, apram crash, End varaadhu ✅ (correct guess!)

**Output:**
```
Start
SyntaxError: Expected ',' or '}' after property value in JSON at position 14 (line 1 column 15)
    at JSON.parse (<anonymous>)
    at Object.<anonymous> (.../playground/2-try.catch.js:4:18)
    ...
```

| Line | Print aachaa? |
|---|---|
| `Start` | ✅ |
| `obj.name` | ❌ crash |
| `End` | ❌ |

---

## Step 3 – Error message padikkuradhu

| Part | Artham |
|---|---|
| `SyntaxError` | Error type: "JSON rules thappu" |
| `Expected ',' or '}'` | `"prem"` ku apram `,` illa `}` edhirpaarthen, varala |
| `position 14` | Text la 14-vadhu idathula problem |
| `at JSON.parse` | Endha function la crash aachu |
| **`2-try.catch.js:4:18`** | **Un file, line 4, column 18** ⭐ |

💡 Error vandhaa mudhalla **un file per + line number** irukka line-a thedu.
`node:internal/...` lines Node oda internal files — ippo kandukka vendaam.

---

## Step 4 – Part B: `try / catch` vechu thaduthom 🛡️

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

**`End` print aagudhu → crash aagala** 🎉

---

## Step 5 – Line by line

```js
try {
  const obj = JSON.parse(badText);   // ① try pannu → 💥 error!
  console.log(obj.name);             // ② skip (error vandhaachu)
} catch (err) {                      // ③ error-a pidichu err la vei
  console.log('JSON thappu:', err.message);  // ④ message print
}
console.log('End');                  // ⑤ program continue ✅
```

| Part | Artham | Hotel la 🏨 |
|---|---|---|
| `try { }` | "Idha try pannu" | Cook dosai suda try panraar |
| Error vandhaa | `try` la meedhi lines **skip**, nere `catch` ku jump | Maavu kettupoyirukku! Niruthuraar |
| `catch (err)` | Error-a **pidichu** `err` nu per vechu | Problem-a kai la edukkuraar |
| `err.message` | Error explanation text | "Maavu kettupoyiduchu" nu note |
| `catch` kulla code | Backup plan | "Sorry, dosai illa" nu solraar |
| `End` | Program continue | Hotel moodala, adutha order ✅ |

---

## Step 6 – Sariyaana text kuduthaa?

```js
const badText = '{"name":"prem"}';   // } add pannom
```

**Output:**
```
Start
prem
End
```

- `catch` **run aagala** — error illa, so skip
- `prem` mattum print aachu — code la `obj.name` irukku, `obj` illa

| Code | Print aagradhu |
|---|---|
| `console.log(obj)` | `{ name: 'prem' }` — full object 📦 |
| `console.log(obj.name)` | `prem` — ulla irukka value mattum 🎁 |

---

## 📊 Summary

```
try  → ✅ success  → catch SKIP
try  → 💥 error    → catch RUN
```

| `badText` | `try` | `catch` | Output |
|---|---|---|---|
| `'{"name":"prem"'` (`}` illa) | 💥 | ✅ run | Start / JSON thappu: … / End |
| `'{"name":"prem"}'` (sari) | ✅ | ❌ skip | Start / prem / End |
| try/catch **illama** + thappu text | 💥 | — | Start / red error (End illa) |

**Rendu case-lum `End` print aagudhu → adhu dhaan try / catch oda power** 🛡️

---

## 🏨 Real app la enga?

`entry_api/index.js` → `getBody`:

```js
try { resolve(data ? JSON.parse(data) : {}); }
catch { resolve({}); }
```

Thappaana body vandhaa crash aagaama `{}` (empty object) kudukkum → hotel moodaadhu ✅

💡 Inga `catch` ku `(err)` illa — error message thevai illana, `catch { }` nu mattum ezhudhalaam.
