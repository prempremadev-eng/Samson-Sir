# Exercise 3 – `? :` Ternary & truthy / falsy (Notes)

Date: 2026-10-06
File: `3-ternary.js`

---

## Step 1 – Ternary na enna?

**if / else-a oru line la** ezhudhura short way.

```js
// if / else
let result;
if (data) {
  result = 'data irukku';
} else {
  result = 'data illa';
}

// ternary – adhe velai, oru line
const result = data ? 'data irukku' : 'data illa';
```

| Part | Artham |
|---|---|
| `data` | **Question** — data irukka? |
| `?` | "Aamaa na…" |
| `'data irukku'` | Aamaa (true) na idhu |
| `:` | "Illana…" |
| `'data illa'` | Illa (false) na idhu |

🏨 Hotel la: **"Maavu irukka ? dosai : idli"** 😄

---

## Step 2 – Part A: rendu data

```js
const data1 = '{"name":"prem"}';
const data2 = '';

const r1 = data1 ? 'data irukku' : 'data illa';
const r2 = data2 ? 'data irukku' : 'data illa';
```

| | Value | Guess | Output |
|---|---|---|---|
| `r1` | `'{"name":"prem"}'` | data irukku | ✅ data irukku |
| `r2` | `''` (empty) | data illa | ✅ data illa |

**Yen `''` "illa"?** `?` ku munnadi irukka value-a JavaScript true-aa false-aa nu decide pannum:

| Value | JavaScript ninaikkuradhu | Per |
|---|---|---|
| Letters irukka text | ✅ true | **truthy** |
| `''` empty string | ❌ false | **falsy** |

🏨 Maavu dabba la maavu irundhaa → dosai. **Kaali dabba** → idli.

---

## Step 3 – Part B: 8 values guess (5 / 8 correct 👏)

| # | Value | En guess | Correct | |
|---|---|---|---|---|
| 1 | `0` | falsy | falsy | ✅ |
| 2 | `5` | truthy | truthy | ✅ |
| 3 | `''` | falsy | falsy | ✅ |
| 4 | `' '` (space) | falsy | **truthy** | 🪤 trap |
| 5 | `null` | falsy | falsy | ✅ |
| 6 | `undefined` | falsy | falsy | ✅ |
| 7 | `'false'` | falsy | **truthy** | 🪤 trap |
| 8 | `{}` | falsy | **truthy** | 🪤 trap |

---

## Step 4 – Traps explain 🪤

| Value | Yen truthy | Hotel / example |
|---|---|---|
| `' '` (space) | Kannukku kaali, aana ulla **oru letter (space)** irukku. Length = 1 | Dabba la oru thuli maavu irundhaalum kaali dabba illa |
| `'false'` | Quotes kulla → **text** (5 letters). Boolean `false` illa | 📷 "Dosai photo" maadhiri — "false" nu ezhudhiyirukku, real false illa |
| `{}` | **Ellaa objects-um truthy**, kaaliyaa irundhaalum | 📦 Kaali box-um oru box dhaan |

---

## Step 5 – Easy rule: indha 8 mattum falsy

| Falsy | |
|---|---|
| `false` | boolean false |
| `0`, `-0`, `0n` | zero |
| `''` | empty string (space kooda illaadha) |
| `null` | |
| `undefined` | |
| `NaN` | "Not a Number" |

**Indha list la illaadha edhuvum → truthy** (`' '`, `'false'`, `'0'`, `{}`, `[]`, `5`…)

---

## Step 6 – `JSON.parse('')` → error

```js
try {
  JSON.parse('');
} catch (err) {
  console.log(err.message);   // → Unexpected end of JSON input
}
```

| Part | Artham |
|---|---|
| `SyntaxError` | JSON rules thappu (Exercise 2 la paartha adhe type) |
| `Unexpected end` | Padikka aarambikkum munnaadiye text mudinjidichu |
| `of JSON input` | Kudutha JSON text la |

**Yen?** `JSON.parse` mudhal letter-a paathu "object ah (`{`), string ah (`"`)…" nu decide pannum. `''` la mudhal letter-e illa.

🏨 Cook order slip open pannaaru — **kaali paper** 📄

💡 `' '` (space mattum) kuduthaalum **adhe error**. JSON space-a ignore pannum.

---

## Step 7 – Ternary vechu error-a thaduppom 🛡️

```js
const data = '';
const body = data ? JSON.parse(data) : {};
console.log(body);   // → {}
```

**Guess:** `{}` ✅

`''` falsy → `JSON.parse` **call-e aagaadhu** → nere `{}` kudukkum. Error illa!

---

## 📊 Summary

| Kathukittadhu | |
|---|---|
| `a ? b : c` | if / else oru line la |
| truthy / falsy | 8 falsy values mattum, matha ellam truthy |
| Traps | `' '`, `'false'`, `{}` → truthy |
| `JSON.parse('')` | `SyntaxError: Unexpected end of JSON input` |
| Protection | `data ? JSON.parse(data) : {}` |

---

## 🏨 Real app la enga?

`entry_api/index.js` → `getBody`:

```js
try { resolve(data ? JSON.parse(data) : {}); }
catch { resolve({}); }
```

| Body | Enna nadakkum |
|---|---|
| Body varala (`''`) | Ternary → `{}` (parse call aagaadhu) |
| Thappaana body | `try` la parse 💥 → `catch` → `{}` |
| Sariyaana body | Parse ✅ → object |

**Ternary + try / catch = rendu layer safety** 🛡️🛡️
