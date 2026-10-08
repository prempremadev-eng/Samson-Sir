# 🚫 CORS Error (Notes – English)

Date: 2026-10-08
Where: 5.5 — React VehicleEntry form → `fetch` POST → `entry_api`

---

## 📸 My screenshot

![CORS error in Firefox Network tab](images/cors_error.png)

Look at the last 2 rows:

| Row | Method | Domain | Transferred | Meaning |
|---|---|---|---|---|
| ① | 🚫 **OPTIONS** (red) | localhost:3000 | **CORS Missing Allow …** | The browser first asked "am I allowed?" → **blocked** |
| ② | **POST** | localhost:3000 | 0 B | No permission, so **the real POST was never sent** ❌ |

---

## ❓ What is CORS?

**CORS = Cross-Origin Resource Sharing.** It is a **browser security rule**:

> When a page sends data to **a different address**, that address must say **"yes, you are allowed"**.

| | Address (origin) |
|---|---|
| 🏠 My React page | `http://localhost:5174` |
| 👨‍🍳 My kitchen (`catalyst serve`) | `http://localhost:3000` |
| Same? | ❌ **Different port → different origin** |

**Origin = protocol + host + port.** If any one of them is different, it is a different origin.

---

## 💂 Hotel story

At the kitchen door there is a **security guard** (the browser) 💂:
"Which dining hall are you from? Has the kitchen given that hall a **permission letter**?"
No letter → **the order is not allowed in**.

```
🏠 React (5174)                      💂 Browser            👨‍🍳 Kitchen (3000)
   │ "I need to POST"                    │
   ├────── ① OPTIONS: "permission?" ────▶│──────────────────▶ 200 rows… (no letter ❌)
   │                                     │ 🚫 BLOCK
   ✗ ② POST is never sent
```

The first check is called a **preflight**. When you POST with `Content-Type: application/json`, the browser sends an OPTIONS request **automatically** first.

---

## ❓ Why does this rule exist?

Without it, a **malicious website** could send requests to your bank or your app from your browser, **using your login** 😱 The browser stops that.

## ❓ Why didn't curl get this error?

Only **browsers** check CORS. curl is not a browser — there is no guard 😄

---

## 🛠️ The fix

### Part A — a helper function (like `getBody`)

```js
function allowLocalhost(req, res) {
	const origin = req.headers.origin || '';
	if (origin.startsWith('http://localhost:')) {
		res.setHeader('Access-Control-Allow-Origin', origin);
		res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	}
}
```

| Line | Meaning |
|---|---|
| `req.headers.origin` | The `Origin` header the browser adds by itself |
| `\|\| ''` | If there is no origin (curl), use an empty string so it doesn't crash |
| `startsWith('http://localhost:')` | Allow localhost on any port |
| 3 × `setHeader` | The permission letter ✉️ |

**What OPTIONS asked ↔ what we answer:**

| OPTIONS request | Our response |
|---|---|
| `Origin: http://localhost:5174` | `Access-Control-Allow-Origin: http://localhost:5174` |
| `Access-Control-Request-Method: POST` | `Access-Control-Allow-Methods: GET,POST,OPTIONS` |
| `Access-Control-Request-Headers: content-type` | `Access-Control-Allow-Headers: Content-Type` |

### Part B — the first lines of the handler

```js
module.exports = async (req, res) => {
	allowLocalhost(req, res);          // ✉️ add the letter to every response

	if (req.method === 'OPTIONS') {    // 💂 the guard's question
		res.writeHead(204);             // "OK, come in" — no body
		res.end();
		return;                         // 🛑 don't run the table code
	}
	...
```

### 🧪 Test result

```
HTTP/1.1 204 No Content
access-control-allow-origin: http://localhost:5174
access-control-allow-methods: GET,POST,OPTIONS
access-control-allow-headers: Content-Type
```

Before: OPTIONS → 200 + rows, no letter 🚫 → Now: **204 + letter** ✅ → POST goes through → row saved 🎉

---

## ❓ My questions (Q & A)

**Q: What does `|| ''` do?**
`||` means OR — if the left side is falsy (`undefined`), use the right side (`''`). It is a short form of
`req.headers.origin ? req.headers.origin : ''`.
Without it, curl would crash with `undefined.startsWith` → TypeError.

**Q: If there is no Origin, we don't know where the request came from — what then?**
A browser **always** sends `Origin` when it calls a different address. No Origin → not a browser (curl / a server) → no guard → no letter needed, just process it normally.
⚠️ **CORS is not security for your server!** Anyone can still send requests with curl. Real protection = **login / authentication** 🔐 (Phase 8).

**Q: How does `allowLocalhost` get `req` and `res`? Do they come from the form?**
The handler calls `allowLocalhost(req, res)` with **the same** `req` and `res` that `catalyst serve` gave it.

```
📝 req
├── 🏷️ HEADERS — Origin (added by the browser), Content-Type (from my fetch)   ← allowLocalhost reads this
└── 📦 BODY    — {"vehicleNumber":…} (my form, JSON.stringify)                   ← getBody reads this
```

---

## 🐛 CORS bugs I fixed

| Bug | Error | Fix |
|---|---|---|
| `req.header.origin` | `TypeError: Cannot read properties of undefined` | `req.headers` (plural) |
| `origin.startWith(…)` | `TypeError: startWith is not a function` | `startsWith` |
| `Allow-methods`, `Allow-headers` | (works — header names are case-insensitive) | `Methods`, `Headers` (style) |

---

## 🗣️ Spoken English practice

- "I got a CORS error because my React app and my function run on different ports."
- "An origin is the protocol, the host, and the port together."
- "Before the POST, the browser sends a preflight OPTIONS request."
- "The server must answer with the Access-Control-Allow-Origin header."
- "I added a helper that allows any localhost origin during development."
- "For an OPTIONS request, the function returns 204 and stops."
- "curl doesn't check CORS, because only browsers enforce it."
- "CORS protects users in the browser; it doesn't replace authentication."
