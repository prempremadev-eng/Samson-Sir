# Exercise 1 – JSON.parse & JSON.stringify (Notes)

Date: 2026-10-06
File: `1-json.js`

---

## Step 1 – Oru text kuduthom

```js
const text = '{"vehicleNumber" : "TN09ABI234","name": "prem"}';
```

Paakka object maadhiri theriyudhu. Aana outer `' '` (single quotes) irukku.
JavaScript la `' '` kulla edhu irundhaalum adhu **text (string)** dhaan.

> 📷🥞 Dosai photo maadhiri — dosai maadhiri theriyum, aana saappida mudiyaadhu.

---

## Step 2 – Rendu questions

```js
console.log(typeof text)   // → string
console.log(text.name)     // → undefined
```

| Question | Output | Yen |
|---|---|---|
| `typeof text` | `string` | Outer `' '` quote irukku, so idhu text |
| `text.name` | `undefined` | String kitta `name` nu property illa |

---

## Step 3 – `text.name` yen `undefined`?

String na **letters oda varisai** mattum dhaan:

```
index:  0   1   2   3   4   5 ...
letter: {   "   v   e   h   i ...
```

- String kitta irukkuradhu: `text.length` (evlo letters), `text[0]` (mudhal letter `{`)
- Ulla "name" nu **letters** irundhaalum, JavaScript adha padichu purinjikkaadhu
- Illaadha property kettaa JavaScript badhil = **`undefined`** ("andha per la onnum illa")

---

## Step 4 – `JSON.parse()` : text ➜ object

```js
const obj = JSON.parse(text)
console.log(typeof obj)   // → object
console.log(obj)          // → { vehicleNumber: 'TN09ABI234', name: 'prem' }
console.log(obj.name)     // → prem
```

**Behind la:** parse text-a letter letter aa padichu, object build pannum.

| Padikkura letter | Parse ninaikkuradhu |
|---|---|
| `{` | Pudhu object start |
| `"vehicleNumber"` | Idhu oru key |
| `:` | Ini value varum |
| `"TN09ABI234"` | Value (string) |
| `,` | Adutha key varum |
| `"name"` `:` `"prem"` | Innoru key + value |
| `}` | Object mudinjidichu → return |

💡 Print pannum bodhu object la keys ku **quotes illa** (`vehicleNumber:`). Text la quotes irukkum (`"vehicleNumber"`). Idhu vechu rendaiyum vithyasam kandupudikkalaam.

⚠️ Text rules thappaa irundhaa (eg. `"` missing) parse **error** throw pannum → Exercise 2 (`try / catch`).

---

## Step 5 – `JSON.stringify()` : object ➜ text

```js
const back = JSON.stringify(obj)
console.log(back)          // → {"vehicleNumber":"TN09ABI234","name":"prem"}
console.log(typeof back)   // → string
console.log(back.name)     // → undefined
```

**Behind la:** object la irukka **ellaa keys-aiyum** sutthi paathu text aa ezhudhum.

| Step | Text build aagudhu |
|---|---|
| Start | `{` |
| key `vehicleNumber` | `{"vehicleNumber":"TN09ABI234"` |
| key `name` | `{"vehicleNumber":"TN09ABI234","name":"prem"` |
| End | `{"vehicleNumber":"TN09ABI234","name":"prem"}` |

- Ellaa keys-um varum, edhuvum vidaadhu
- Spaces podaadhu (`" : "` → `":"`)

---

## Step 6 – `JSON` enna? `parse` enna?

| | Enna |
|---|---|
| `JSON` | Built-in **object** (class illa). JavaScript engine kulla-ye irukku, `require` vendaam |
| `parse` / `stringify` | `JSON` object kulla irukka **methods** (object kulla irukka function = method) |
| `.` (dot) | "Box kulla irukka" — `JSON.parse` = JSON box kulla irukka parse |

Same pattern: `console.log`, `Math.round`, `JSON.parse`

JSON innoru artham: **JavaScript Object Notation** — data-va text aa ezhudhura format.

---

## Step 7 – `typeof` words (fixed list)

| `typeof` result | Example |
|---|---|
| `string` | `'hello'`, `'{...}'` — text ellam idhu ("text" nu type illa!) |
| `number` | `42` |
| `boolean` | `true` / `false` |
| `object` | `{ name: 'prem' }` |
| `undefined` | Illaadha value |
| `function` | `JSON.parse` |

⚠️ `typeof` — ellam small letters. `typeOf` error.

---

## 🔄 Summary

```
          JSON.parse(text)
  text  ─────────────────▶  object
(letters)                  (.name work aagum)
        ◀─────────────────
         JSON.stringify(obj)
```

| | Type | `.name` |
|---|---|---|
| `text` | string | ❌ undefined |
| `JSON.parse(text)` | object | ✅ prem |
| `JSON.stringify(obj)` | string | ❌ undefined |

---

## 🏨 Real app la enga use aagum?

```
React form (object) ──stringify──▶ "text" ──network──▶ "text" ──parse──▶ index.js (object)
```

- **React** (`VehicleEntry.jsx`): data anuppum munnadi `JSON.stringify`
- **Backend** (`entry_api/index.js` → `getBody`): vaangina apram `JSON.parse`

Network la data eppavume **text** aa dhaan pogum. Adhanaala rendum venum.
