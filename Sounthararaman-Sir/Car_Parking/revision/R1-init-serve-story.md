# 🏨 Revision 1 – `catalyst init` → `catalyst serve` (Hotel Story)

Date: 2026-10-07

---

## 🗺️ Full diagram

```
═══════════════════ PART 1: catalyst init (hotel katturadhu) ═══════════════════

  📍 my-vehicle-app/  ← correct street (home ~ illa!)
        │
        │  $ catalyst init
        ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ Q: Project?   → [create a new project] → my-vehicle-app-2   │
  │ Q: Features?  → Functions  (Space ✔ → Enter)                │
  │ Q: Type?      → AdvancedIO                                  │
  │ Q: Stack?     → Node 20                                     │
  │ Q: Name?      → entry_api                                   │
  │ Q: Install?   → Y  → zcatalyst-sdk-node download            │
  └─────────────────────────────────────────────────────────────┘
        │
        ▼
  my-vehicle-app/
  ├── 🪧 .catalystrc .............. Name board  "my-vehicle-app-2"
  ├── 📒 catalyst.json ............ Register    "cook: entry_api"
  └── functions/
      └── 👨‍🍳 entry_api/ .......... Cook
          ├── 🪪 catalyst-config.json  ID card   (node20, advancedio, index.js)
          ├── 📖 index.js ............ Recipe    ("Hello" dosai)
          ├── 🛒 package.json ........ Shopping list (zcatalyst-sdk-node)
          └── 🗄️ node_modules/ ....... Tool rack  🔑 saavi inga

  Hotel ready ✅ … aana kadhavu 🚪🔒 moodi irukku


═══════════════════ PART 2: catalyst serve (hotel open) ════════════════════════

  🧾 Counter (Terminal)
        │  $ catalyst serve
        ▼
  🧑‍💼 Manager / Waiter duty ku varraar
        │
        ├─① 📒 catalyst.json ........ "Yaar yaar cook?"      → entry_api
        ├─② 🪧 .catalystrc .......... "Endha hotel?"         → my-vehicle-app-2
        ├─③ 🪪 catalyst-config.json . "Cook ID card"         → node20, index.js
        ├─④ 📖 index.js ............. "Recipe ready ah?"     ✅
        ├─⑤ 🗄️ node_modules ......... "Tools ready ah?"      ✅
        └─⑥ 🚪 Port 3000 OPEN ....... Waiter counter la wait 🧍
                 │
                 │  http://localhost:3000/server/entry_api/


═══════════════════ PART 3: Mudhal customer (order) ════════════════════════════

  🙋 Customer (Nee)
        │ 🍽️ Plate (Browser) la address type
        ▼
  ┌──────────────────────────────────┐  📝 order slip (req)
  │ localhost:3000/server/entry_api/ │ ─────────────────▶ 🧑‍💼 Waiter
  └──────────────────────────────────┘                        │
                                                               ▼
                                                     👨‍🍳 Cook entry_api
                                                     📖 index.js open:
                                                       module.exports = (req, res) => {
                                                         res.write('Hello…')  🥞
                                                         res.end()  → plate kudu
                                                       }
                                                               │
  🍽️ Browser: "Hello from index.js" 😋  ◀───────────────────────┘
  🧾 Counter: GET /server/entry_api/ 200  (order note)


═══════════════════ PART 4: Hotel close ═════════════════════════════════════════

  Ctrl + C → 🧑‍💼 Waiter veetuku → 🚪 close → Browser: "can't be reached" ❌
  Ctrl + Z → 😴 Waiter corner la thoongaraar (Stopped) → `fg` → Ctrl + C
```

---

## 📖 Story (short)

**1. Hotel katturadhu (`init`).**
Prem correct street-ku (`my-vehicle-app/`) ponaan. `catalyst init` pottaan. Pudhu hotel **my-vehicle-app-2** create aachu, **name board** (`.catalystrc`) maattinaan. **Register** (`catalyst.json`) la cook per ezhudhinaan: **entry_api**. Cook vandhaar, kaila **ID card** (`catalyst-config.json` — Node 20, AdvancedIO), **recipe book** (`index.js` — "Hello" dosai), **shopping list** (`package.json`). Market la **saavi** (`zcatalyst-sdk-node`) vaangi **tool rack** (`node_modules`) la vechaan. Hotel ready, aana kadhavu moodi.

**2. Hotel open (`serve`).**
Counter-la (terminal) `catalyst serve` sonnaan. **Manager / waiter** duty ku vandhaar: register paarthaar → name board → cook ID card → recipe → tools. Ellam ok. **Kadhavu 3000** thirandhaar, counter la wait.

**3. Mudhal customer.**
Prem **plate** la (browser) address pottaan: `localhost:3000/server/entry_api/`. Order slip (`req`) waiter kitta. Waiter cook kitta. Cook recipe padi **"Hello" dosai** sudu, **plate** (`res`) la vechu kuduthaar. Browser la "Hello from index.js" 😋. Counter la `200` note.

**4. Close.**
**Ctrl + C**: waiter veetuku, kadhavu moodiduchu.

---

## 🏨 Hotel mapping

| Hotel | Un app |
|---|---|
| 🙋 Customer | Nee |
| 🍽️ Plate | Browser |
| 🧾 Counter | Terminal |
| 🧑‍💼 Waiter / Manager | `catalyst serve` |
| 🚪 Kadhavu | Port 3000 |
| 🪧 Name board | `.catalystrc` |
| 📒 Register | `catalyst.json` |
| 👨‍🍳 Cook | `entry_api` (function) |
| 🪪 Cook ID card | `catalyst-config.json` |
| 📖 Recipe | `index.js` |
| 🛒 Shopping list | `package.json` |
| 🗄️ Tool rack | `node_modules/` |
| 🔑 Saavi | `zcatalyst-sdk-node` |
| 📝 Order slip | `req` |
| 🍽️ Plate (kudukkuradhu) | `res` |
| 🥞 Dosai | `"Hello from index.js"` |
| 🧊 Store room | Data Store (`ParkingEntries`) |
| 🏨 Hotel | `my-vehicle-app-2` |

---

## 📝 En recall result (2026-10-07)

### Part 1 – `catalyst init` (6 / 8)

| # | Question | En answer | Correct | |
|---|---|---|---|---|
| 1 | Endha folder la run? | Project folder; home la pannina files home la poidum | `my-vehicle-app` | ✅ |
| 2 | Project name | my-vehicle-app-2 | `my-vehicle-app-2` | ✅ |
| 3 | Features | Functions | Functions | ✅ |
| 4 | Function type | Advanced IO | AdvancedIO | ✅ |
| 5 | Stack | Node 20 | Node 20 (reference kooda match) | ✅ |
| 6 | Function name | entry_api | `entry_api` | ✅ |
| 7 | Install Y → enna, enga? | theriyala | `zcatalyst-sdk-node` → `functions/entry_api/node_modules/` | 📖 |
| 8 | Create aana files | `index.js` mattum | `.catalystrc`, `catalyst.json`, `functions/entry_api/` (index.js, catalyst-config.json, package.json, node_modules) | 📖 |

### Part 2 – `catalyst serve` (6½ / 8)

| # | Question | En answer | Correct | |
|---|---|---|---|---|
| 1 | `catalyst serve` = ? | waiter | Waiter | ✅ |
| 2 | Terminal = ? | counter | Counter | ✅ |
| 3 | Browser = ? | plate | Plate | ✅ |
| 4 | Port 3000 = ? | kadhavu | Kadhavu | ✅ |
| 5 | Padikkura varisai | entry_api / sdk | catalyst.json → .catalystrc → catalyst-config.json → index.js → node_modules → port 3000 | 🟡 |
| 6 | Test URL | http localhost 3000 | `http://localhost:3000/server/entry_api/` | 🟡 |
| 7 | Browser la enna? | Hello from index.js | ✅ | ✅ |
| 8 | Stop key | Ctrl + C (Ctrl + Z = push nu ninaichen) | Ctrl + C = stop; **Ctrl + Z = pause** | 🟡 |

**⭐ Gavanikka vendiyadhu:** Q7, Q8 (Part 1), padikkura varisai, full URL, Ctrl + Z.

---

## 🧠 Marakkaama irukka 3 tricks

| # | Trick | Eppadi |
|---|---|---|
| 1 | **Un words la sollu** (most powerful) | Notes paakkaama story-a neeye ezhudhu / sollu. Theriyaadha idam = gap → adha mattum padi |
| 2 | **Gap vittu thirumba paaru** | Inniku → 1 naal → 3 naal → 1 vaaram. Ovvoru dhadavaiyum 10 nimisham quiz |
| 3 | **Kai la seiyu** | Type panni run pannina nalla nikkum |

---

## ✅ Recall test result (diagram paakkaama) – 5 / 5 💯

| # | Question | En answer | |
|---|---|---|---|
| 1 | Name board | `.catalystrc` | ✅ |
| 2 | Register | `catalyst.json` | ✅ |
| 3 | Waiter mudhalla padikkura file | `catalyst.json` | ✅ |
| 4 | Cook ID card la 3 vishayam | node20, advancedio, index.js (per, enna samaippaar, enna style) | ✅ |
| 5 | Saavi enga | `node_modules` | ✅ |

---

## 👀 Naane `node_modules` ulla poi paarthen

### 🔑 Saavi oda label – `zcatalyst-sdk-node/package.json`

```json
"name": "zcatalyst-sdk-node",
"version": "3.4.0",
"description": "Node.js SDK for Zoho Catalyst",
"main": "lib/index.js",
```

⭐ `main` = `require('zcatalyst-sdk-node')` pannum bodhu load aagura file (`lib/index.js`). `catalyst-config.json` la `"main": "index.js"` maadhiri dhaan.

### 🗝️ Saavi kulla pala saavi – `lib/` folders

| Folder | Catalyst service | Hotel la |
|---|---|---|
| **`datastore`** | Data Store (tables) | 🧊 Store room saavi — Part 3 la idhu |
| **`zcql`** | SQL maadhiri query | Store room la thedura saavi |
| `stratus` | File / photo storage | Photo almari |
| `cron` | Timer jobs | Alarm |
| `email` | Mail | Post box |
| `zia` | AI (OCR…) | |
| `user-management` | Login users | Staff attendance |

`zcatalyst-sdk-node` = **master key bunch** 🔑🔑🔑

### ⚠️ `.build` vs original

| Folder | Enna |
|---|---|
| `functions/entry_api/` | ⭐ **Original** — edit pannuradhu idhu dhaan |
| `.build/functions/entry_api/` | `catalyst serve` create panra **copy** — edit pannaadha, git ignore |

### 📦 Rendu `node_modules`

| `node_modules` | Yaarodadhu |
|---|---|
| `my-vehicle-app/node_modules/` | 🏠 Dining hall (React, Vite — `@babel/...`) |
| `functions/entry_api/node_modules/` | 👨‍🍳 Cook (Catalyst SDK) |

---

## 🧠 Next recall test (diagram paakkaama)

1. Name board = endha file?
2. Register = endha file?
3. Waiter mudhalla endha file padikkum?
4. Cook-oda ID card la enna 3 vishayam irukku?
5. Saavi (`zcatalyst-sdk-node`) enga vechirukku?
6. Ctrl + Z pannitta enna pannanum?
