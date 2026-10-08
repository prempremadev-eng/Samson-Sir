# 🚫 CORS Error (Notes)

Date: 2026-10-08
Where: 5.5 — React VehicleEntry form → `fetch` POST → `entry_api`

---

## 📸 En screenshot

![CORS error in Firefox Network tab](images/cors_error.png)

Kadaisi 2 rows paaru:

| Row | Method | Domain | Transferred | Artham |
|---|---|---|---|---|
| ① | 🚫 **OPTIONS** (red) | localhost:3000 | **CORS Missing Allow …** | Browser mudhalla "permission kidaikkumaa?" nu kettadhu → **block** |
| ② | **POST** | localhost:3000 | 0 B | Permission kidaikkaadhaala **real POST poagave illa** ❌ |

Matha rows ellam `localhost:5174` — React page oda files (js, css). Avanga problem illa.

---

## ❓ CORS na enna?

**CORS = Cross-Origin Resource Sharing.** Browser-oda **security rule**:

> Oru page **vera address-ku** data anuppa, andha address **"aamaa, unakku permission irukku"** nu sollanum.

| | Address (origin) |
|---|---|
| 🏠 En React page | `http://localhost:5174` |
| 👨‍🍳 En kitchen (`catalyst serve`) | `http://localhost:3000` |
| Same ah? | ❌ **Port vera → vera origin** |

**Origin = protocol + host + port.** Moonula onnu vera aanaalum vera origin.

---

## 💂 Hotel story

Kitchen kadhavu la oru **security guard** (browser) 💂:
"Endha dining hall la irundhu varra? Andha hall-ku kitchen **permission letter** kuduthirukkaa?"
Letter illana **order-a ulla vidamaattaar**.

```
🏠 React (5174)                      💂 Browser            👨‍🍳 Kitchen (3000)
   │ "POST pannanum"                     │
   ├────── ① OPTIONS: "permission?" ────▶│──────────────────▶ 200 rows… (letter illa ❌)
   │                                     │ 🚫 BLOCK
   ✗ ② POST anuppave illa
```

---

## 🔍 OPTIONS request la enna kettadhu (Request Headers)

```
Origin: http://localhost:5174                      ← "naan 5174 la irundhu varen"
Access-Control-Request-Method: POST                ← "POST panna permission kidaikkumaa?"
Access-Control-Request-Headers: content-type       ← "JSON label oda?"
```

**Response Headers** la `Access-Control-Allow-Origin` **illa** → kitchen "sari" nu sollala → 🚫

Idhu per: **preflight** (munnaadi oru check). `Content-Type: application/json` oda POST panna, browser **thaana** mudhalla OPTIONS anuppum.

---

## ❓ Yen indha rule?

Illana, yaaro oru **kettavan website** un browser la irundhu un bank-ku / un app-ku **un login-oda** request anuppalaam 😱 Browser adha thadukkudhu.

## ❓ curl la yen varala?

CORS **browser** mattum dhaan check pannum. curl browser illa — guard illa 😄

| Tool | CORS check? |
|---|---|
| Browser (`fetch`) | ✅ Aamaa — guard 💂 |
| curl | ❌ Illa |

---

## 🛠️ Fix (kitchen permission letter kudukkanum)

| # | Enna | Hotel la |
|---|---|---|
| 1 | Response la `Access-Control-Allow-…` **headers** | Permission letter ✉️ |
| 2 | **OPTIONS** vandhaa udane **204** (OK, body illa) | Guard kelvi-ku "sari, vaa" nu mattum sollu |
| 3 | **localhost** mattum allow (local dev) | Namma dining hall-ku mattum letter |

💡 Reference app la idhu `setLocalDevCors` (`vendor_entries/index.js`).

💡 React **5174** la odudhu (5173 vera yaaro use pannuraanga) — so fix **endha localhost port aanaalum** allow pannanum.

➡️ Fix code: (inga add pannuvom, fix mudinjadhum)

---

## 🧩 Inniku 5.5 la kathukitta related bugs

| Bug | Kaaranam | Clue |
|---|---|---|
| "added" vandhuchu, row illa, 200 | `import.meta.VITE_API_BASE` (`.env` missing) → `fetch(undefined)` → `5174/undefined` → Vite 200 | Network la **Request URL** paaru |
| Error vandhaalum "added" | `return` / ok check order thappu | ESLint `Unreachable code` |
| `catalyst serve` 3001 / 3002 | Port 3000 la vera project serve (Daily-Learning-Tracker) | `ss -ltnp \| grep 3000` |
