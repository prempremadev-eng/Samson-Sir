# 🧹 CleanCity — Waste Collection App Plan

> Date: 12-10-2026
> Catalyst account: `premprema90801@gmail.com`
> Catalyst project: **CleanCity**

---

## 1. 🗺️ Structure (Real world)

| Location | Plants | Vehicles | Incharge |
|---|---|---|---|
| Gandhi Nagar | Wet + Dry | 13 | 1 supervisor |
| Gudalur | Wet + Dry | 13 | 1 |
| Peramanur | Wet + Dry | 13 | 1 |
| Chithamanur | Wet mattum | 11 | 1 |
| **Total** | **7** | **50** | **4** |

- Ovvoru vehicle-um veedu veedaa (House No) poi waste collect pannum.
- Wet waste → Wet plant, Dry waste → Dry plant.
- Chithamanur-la Dry plant illa → Dry = 0.

---

## 2. 🏨 Why 3 tables? (Hotel story)

Hotel-la 3 book: **Cook list**, **Menu list**, **Order book**.
Order book-la cook **peyar mattum** ezhudhuvaanga. Cook phone maarina → cook list-la **oru idathula** maathina podhum.

| Oru table mattum | 3 table |
|---|---|
| "Location 1" 1000 thadava type pannanum | Oru thadava dhaan |
| Typo varum ("Locaton 1") ❌ | Typo varaadhu ✅ |
| Incharge maarina 1000 row maathanum ❌ | 1 row maathina podhum ✅ |

---

## 3. 🗄️ Tables design

### 📍 Location (4 rows — rare-ah maarum)

| Column | Example | Why |
|---|---|---|
| Location Name | Location 1 | Location-ah identify panna |
| Incharge Name | Kumar | Yaar responsible nu theriya |
| Has Wet Plant | Yes | Wet plant iruka nu |
| Has Dry Plant | Yes / No | Location 4-la No |

### 🚛 Vehicle (50 rows)

| Column | Example | Why |
|---|---|---|
| Vehicle No | TN 01 AB 1234 | Vandi identify panna |
| Location | Location 1 | Vandi endha location-ku fix |

### 📝 Collection (Daily entry — periya table)

| Column | Example | Why |
|---|---|---|
| Date | 12-10-2026 | Daily / monthly report edukka |
| Vehicle No | TN 01 AB 1234 | Endha vandi collect pannudhu |
| House No | 12 | Endha veedu-la irundhu |
| Wet (kg) | 5 | Wet plant-ku pogum |
| Dry (kg) | 3 | Dry plant-ku pogum |

### 🔗 Link

```
📝 Collection          🚛 Vehicle             📍 Location
Vehicle No ──────────► Vehicle No
                       Location ────────────► Location Name
                                              Incharge
```

---

## 4. ✅ Decisions (naane guess panni kandupidichadhu)

| Decision | Why |
|---|---|
| Collection-la **Location column venaam** | Vehicle table-la already iruku |
| **Total store venaam** | Wet + Dry calculate pannalaam — store pannina, Wet maathum bodhu Total maatha marandhaa thappu aagum |
| **S.No venaam** | Catalyst thaane `ROWID` kudukkum |
| **Date venum** | Illa-na "inniki evlo?", "indha maasam evlo?" report edukka mudiyaadhu |

---

## 5. 🔑 Setup status

| Step | Status |
|---|---|
| Catalyst CLI login (90801) | ✅ Done |
| Zoho MCP server `cleancity-mcp` create | ✅ Done |
| Catalyst By Zoho tools add | ✅ Done |
| Folder link (`catalyst init` → CleanCity) | ✅ Done |
| MCP `cleancity` → Claude (local scope, 90801 login) | ✅ Done |
| 3 tables create (Location, Vehicle, Collection) | ✅ Done (12-10-2026) |
| Sample data: 4 Location + 50 Vehicle + 10 Collection | ✅ Done (12-10-2026) |
| Function `GET /vehicles` (dropdown list) | ✅ Done, local test pass |
| Function `GET /collection?date=` (day table) + `POST /collection` (insert/update) | ✅ Done, local test pass |
| Entry table (`client/index.html`) | ✅ Done, local: http://localhost:3000/app/ |
| Deploy (Development) | ✅ Done → https://cleancity-60078558337.development.catalystserverless.in/app/index.html |
| Login: Hosted auth ON, public signup OFF, function 401 check, page login/logout | ✅ Done (deploy aachu) |
| Roles: owner / admin / supervisor (`AppUser` table 54451000000158001) | ✅ Done |
| Owner invite (premprema90801) → login test | ✅ Done (12-10-2026 5:12 PM) |
| Google login (Google Cloud project `cleancity-511412`, 90801 account, published) | ✅ Done |
| Security test: vera account (premprema.dev) → "permission illa" | ✅ Pass (12-10-2026 6:45 PM) |
| Access request (AccessRequest 54451000000155008) → Approve / Dismiss | ✅ Deploy aachu |
| Last login (AppUser.last_login) + page top-la per, role, location, email | ✅ Deploy aachu |
| Entry by (Collection.entered_by) + time | ✅ Deploy aachu |
| Report tab: Week (Mon–Sun) / Month, location total + grand total | ✅ Deploy aachu |
| Inniku mattum entry (nethu / naalai = paakka mattum, function-laiyum block) | ✅ Deploy aachu |
| 2nd admin + 4 supervisors add (app-la Users tab-la) | ⏳ Emails venum |
| **Production deploy** (12-10-2026 7:41 PM) → https://cleancity-60078558337.catalystserverless.in/app/index.html · Prod ZAID 50046818044 | ✅ Done |
| Prod data: 4 Locations | ✅ Done |
| Prod: owner AppUser row (PremPrema) | ✅ Done (Prem console-la pottaar) |
| Prod: Google client-la prod origin + redirect URI add | ✅ Done |
| Prod test: owner Google login ✅ · premprema.dev → "permission illa" + AccessRequest-la record ✅ | ✅ Pass (12-10-2026 8:14 PM) |
| Prod: vandi — sample venaam, admin real vandi-ah Vehicles tab-la add pannuvaar (Vehicle = 0 rows) | ⏳ Admin |
| Report page (total per day / location) | ⏳ Pending |

> 💡 Lesson: `catalyst login` = CLI key mattum. MCP-ku **thani URL** — URL endha account-la create pannomo, adhu dhaan account.

---

## 5b. 🆔 Catalyst Table IDs (Development)

| Table | Table ID | Columns |
|---|---|---|
| Location | 54451000000143001 | location_name (varchar, unique), incharge_name, has_wet_plant (bool), has_dry_plant (bool) |
| Vehicle | 54451000000146001 | vehicle_no (varchar, unique), location_id (FK → Location.ROWID), households (int, fixed target 500/800) |
| Collection | 54451000000148001 | collection_date (date), vehicle_id (FK → Vehicle.ROWID), wet_collection_kg (double), dry_collection_kg (double) — **1 vandi = 1 naal = 1 row** |

### 🔄 Change (12-10-2026): house-wise → vehicle-wise daily

| Column | Engirundhu | Store? |
|---|---|---|
| Households | Vehicle master (fixed, daily maaraadhu) | ✅ |
| Waste Generation | Households × 4 kg | ❌ calculate (function-la `KG_PER_HOUSEHOLD`) |
| Wet / Dry Generation | Waste Gen × 50% / 50% | ❌ calculate (`WET_SHARE`) |
| Wet / Dry Collection | Supervisor entry | ✅ |

> ✅ Cleanup done: pazhaya `dry_kg` column + house-wise sample rows delete aayiduchu (Collection = 0 rows, fresh start).

### 🔐 Roles

| Role | Yaaru | Enna panna mudiyum |
|---|---|---|
| owner | Prem | Ellaam + admin add/edit/remove |
| admin | (Prem keezh oru aal) | Supervisor add/edit, vandi add/edit, ellaa location entry |
| supervisor | Location incharge | Thannoda location entry mattum |

> 🔒 Lock 1: Catalyst login · Lock 2: AppUser table-la email irukkanum (illa-na 403) · Lock 3: 4 table-layum **App User role = no permission** (function admin scope mattum dhaan Data Store-ku pogum)
> ⚠️ Google login-ku public signup ON venum → yaar venaalum Catalyst account create pannalaam, aanaa Lock 2 + Lock 3 thadukkum.

### 👤 Incharge

| Location | Incharge |
|---|---|
| Gandhi Nagar | Sathya |
| Gudalur | Devi |
| Peramanur | Nithya |
| Chithamanur | Dhinesh |

> 💡 FK = name illa, **ROWID** store pannrom → Location rename pannalum link udaiyaadhu.
> 💡 FK = ON-DELETE-SET-NULL → vehicle delete pannalum pazhaya collection history azhiyaadhu.
> ⚠️ Boolean: insert response-la string `"true"`, ZCQL SELECT-la real `true` → `String(x) === "true"` nu check pannanum.
> 🟢 Local run: Node 24 venum → `nvm install 24` + `catalyst config:set node24.bin=...` (default Node 22 maaraadhu).

## 6. 🚀 Next steps

1. MCP URL copy panni Claude-ku kudukkanum (🔒 secret — GitHub-la poda vendaam)
2. CleanCity project-la 3 tables create
3. Location (4) + Vehicle (50) master data entry
4. Daily collection entry form
5. Report: date-wise, location-wise, vehicle-wise total
