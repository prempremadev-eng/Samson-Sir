# 🧹 CleanCity — Tamil Notes (12-10-2026)

> Inniku: 3:20 PM → 8:14 PM · Catalyst project **CleanCity** · Development → **Production live** 🚀

---

## 🧠 Revision Quiz (notes padikkaradhukku munnaadi try pannunga!)

| # | Kelvi |
|---|---|
| 1 | CLI login-um MCP login-um ore key-aa? Yen? |
| 2 | Vehicle table-la location **name** store pannama **ROWID** yen store pannom? |
| 3 | Waste Generation-ah table-la yen store pannala? |
| 4 | Browser neraa Data Store-ku yen poga koodaadhu? |
| 5 | `await` use pannumbodhu `res.end()` enga irukkanum? |
| 6 | `has_dry_plant`-ah `=== 'true'` nu check pannadhu yen bug aachu? |
| 7 | Page-la "inniku mattum entry" block pottom. Function-layum yen check pannom? |
| 8 | 3 lock enna enna? |
| 9 | `redirect_uri_mismatch` error vandhaa enna pannanum? |
| 10 | Development data Production-ku automatic-ah pogumaa? |

(Answers keezha "🔑 Answers" section-la)

---

## 🏨 Hotel story — mottham app

| Hotel | CleanCity |
|---|---|
| Customer | Supervisor / Admin |
| Plate | Browser page (`client/index.html`) |
| Waiter | Function (`functions/cleancity/index.js`) |
| Store room | Data Store (5 tables) |
| Guest list 📋 | `AppUser` table |
| Gate ID card 🪪 | Google login |
| Practice kitchen | Development |
| Real hotel | Production |

---

## 1️⃣ Connect (CLI + MCP)

| Edhu | Enna | Why |
|---|---|---|
| `catalyst init` | Folder-ah CleanCity project-oda link (`.catalystrc`) | Deploy pannumbodhu "endha project?" nu CLI-ku theriyanum |
| MCP `cleancity` (`-s local`) | Claude store room-ku poga key | CLI key vera, MCP key vera. **Rendum ore account (90801) ah irukkanum** |

**Mistake:** Pazhaya MCP vera account-la (premprema.dev) irundhuchu → CleanCity theriyala.
**Lesson:** URL endha account-la create pannomo, adhu dhaan account.

---

## 2️⃣ Tables (5)

| Table | Columns | Why |
|---|---|---|
| Location | name, incharge, has_wet_plant, has_dry_plant | 4 location, rare-ah maarum |
| Vehicle | vehicle_no, **location_id (FK)**, households | 50 vandi, households fixed |
| Collection | date, **vehicle_id (FK)**, wet_collection_kg, dry_collection_kg, entered_by | Daily entry, 1 vandi = 1 naal = 1 row |
| AppUser | email, name, role, location_id, last_login | Guest list 📋 |
| AccessRequest | email, name, last_try, tries | Permission illaama try pannavanga |

**ROWID link (FK) — real proof:** "Location 1" → "Gandhi Nagar" rename pannom. **4 row** mattum maathinom, 50 vandi-um automatic-ah follow pannudhu ✅

**Calculate, store pannala:**
```
Waste Gen = Households × 4 kg
Wet Gen   = Waste Gen × 50%
Dry Gen   = Waste Gen × 50%
```
Function top-la `KG_PER_HOUSEHOLD = 4`, `WET_SHARE = 0.5` → maathanum-na **1 line**.

---

## 3️⃣ Function (waiter)

| Route | Method | Velai |
|---|---|---|
| `/me` | GET | Naan yaaru + last login update |
| `/locations`, `/vehicles` | GET | List |
| `/vehicles` | POST | Vandi add / edit (admin) |
| `/collection?date=` | GET | Andha naal table |
| `/collection` | POST | Save (insert / update) — **inniku mattum** |
| `/users` | GET / POST / DELETE | Users (admin) |
| `/requests` | GET / DELETE | Access request (admin) |
| `/report?period=week\|month` | GET | Week / Month total |

**`res.end()` kadaisi-la:** `await` mudinja apram dhaan inga varum. Munnaadi vechaa data illaama response pogum.

**`rows.map(row => row.Vehicle)`:** ZCQL `{Vehicle: {...}}` nu cover potu tharum → pirichu edukkurom 📦

---

## 4️⃣ Roles

| Velai | 👑 Owner | 🛠️ Admin | 📝 Supervisor |
|---|---|---|---|
| Daily entry | Ellaa location | Ellaa location | Thannoda location mattum |
| Vandi add / edit | ✅ | ✅ | ❌ |
| Supervisor add / remove | ✅ | ✅ | ❌ |
| Admin add / remove | ✅ | ❌ | ❌ |

---

## 5️⃣ Security — 3 lock 🔐

| Lock | Enna | Hotel |
|---|---|---|
| 1 | Catalyst login (Google) | Gate-la ID card 🪪 |
| 2 | `AppUser` list-la email irukkaa? Illa-na 403 | Reception-la guest list 📋 |
| 3 | Table permission: App User = onnum illa. Function `scope: 'admin'` mattum | Store room poottu 🔒 |

- Google login-ku **public signup ON** venum → yaar venaalum account create pannalaam → aana Lock 2 + 3 thadukkum ✅
- **Test pannom:** premprema.dev → "Permission illa" ✅ + AccessRequest-la record ✅

---

## 6️⃣ Google login steps

1. Catalyst → Authentication → Social Logins → Google (ZAID + redirect URL edukka)
2. Google Cloud → **90801 account-la** pudhu project `CleanCity`
3. Consent screen (Branding) → home page + **privacy policy** link (`privacy.html` create pannom)
4. Clients → Web application → origin + redirect URI
5. Client ID + Secret → Catalyst-la paste (🔒 chat-la illa)
6. Audience → **Publish app**

**Rule:**
| Field | Path irukkaa? | Example |
|---|---|---|
| JavaScript origin | ❌ Illa | `https://cleancity-60078558337.catalystserverless.in` |
| Redirect URI | ✅ Full path | `.../accounts/pfs/50046818044/clientidpcallback` |

---

## 7️⃣ Production

| | Development | Production |
|---|---|---|
| Link | `...development.catalystserverless.in` | `cleancity-60078558337.catalystserverless.in` |
| ZAID | 50046808644 | **50046818044** |
| Data | Test | **Kaali-ah start** — automatic-ah copy aagaadhu |

Production apram: Location 4 (naan), owner row (neenga console-la), Google URL (neenga), vandi = admin podanum.

---

## 🐛 Errors & Fixes

| Error | Kaaranam | Fix |
|---|---|---|
| MCP-la CleanCity theriyala | MCP vera account | 90801 MCP URL add |
| Function not found risk | Folder `cleanCity`, config `cleancity` | `mv` → small letters |
| `Node v24 not present` | Computer-la Node 22 | `nvm install 24` + `catalyst config:set node24.bin=...` |
| Location 1 reject aachu | ZCQL boolean `true`, naan `=== 'true'` | `String(x) === 'true'` |
| 502 test-la | Server reload aagitu irundhuchu | Wait panni retry |
| "Login check..." nikkudhu | Web SDK script podala | `catalystWebSDK.js` first, apram `init.js` |
| `redirect_uri_mismatch` | Google-la URL illa / thappu idam | Error details padichu exact URL add |
| "Uh, oh!" callback | Pazhaya cookie / secret | Fresh incognito, secret re-paste |
| Publish button grey | Branding incomplete | Home page + privacy link |
| Origin redirect-la | Copy-paste thappu idam | Origin = path illa, redirect = full path |

---

## 🔑 Answers

1. Illa. CLI = neenga kitchen-ku pogura key. MCP = Claude-oda key. Rendum thani.
2. Rename pannina 1 idathula maathina podhum. Typo varaadhu.
3. Households maarina generation thaane maarum. Store pannina 2 idathula maathanum.
4. Security: delete pannalaam, thappu data podalaam, table ID theriyum.
5. Kadaisi-la (await mudinja apram).
6. ZCQL real boolean `true` tharum, insert string `"true"` tharum. `true === 'true'` → false.
7. Smart aal browser-la date maathi anuppalaam. Waiter check dhaan real lock.
8. Google login · AppUser guest list · Table permission.
9. "error details"-la exact redirect_uri paarthu, Google client-la copy-paste.
10. Illa. Table structure mattum pogum, data illa.
