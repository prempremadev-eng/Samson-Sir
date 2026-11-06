# 🧹 CleanCity — English Notes (12-10-2026)

> Today: 3:20 PM → 8:14 PM · Built a waste collection app on Zoho Catalyst and took it live in Production.

---

## 1. What the app does

- **50 vehicles** across **4 locations** (Gandhi Nagar, Gudalur, Peramanur, Chithamanur).
- Each vehicle has a fixed number of **households** (e.g. 500 or 800).
- **Waste generation** = households × 4 kg → 50% wet, 50% dry (calculated, never stored).
- A **supervisor** enters only the **wet collection** and **dry collection** for today.
- **Reports** show weekly (Mon–Sun) and monthly totals per vehicle and per location.

## 2. Architecture

| Part | File / Service | Role |
|---|---|---|
| Frontend | `client/index.html` | Tabs: Daily Entry, Report, Vehicles, Users |
| Backend | `functions/cleancity/index.js` (Advanced I/O, Node 24) | All checks and data access |
| Database | Catalyst Data Store (5 tables) | Location, Vehicle, Collection, AppUser, AccessRequest |
| Auth | Catalyst Hosted Login + Google | Who are you? |

## 3. Key design decisions (and why)

| Decision | Why |
|---|---|
| Store the **ROWID** (foreign key), not the name | Renaming a location changes one row, not fifty |
| Calculate generation instead of storing it | One source of truth — no stale totals |
| Validate on the **server**, not only in the page | Anyone can change what the browser sends |
| Only **today's** date can be saved | Stops back-dated or future entries |
| Use `scope: 'admin'` in the function and give App Users **no** table permission | The browser can never reach the database directly |
| Keep an **AppUser** allow-list | A Google account alone is not enough to get in |

## 4. The three locks 🔐

1. **Login** — Catalyst hosted login with Google.
2. **Allow-list** — the email must be in the `AppUser` table, or the server returns **403**.
3. **Table permissions** — App Users have no direct access to any table.

Tested: a different Google account was blocked with "permission illa", and its attempt appeared in the access-request list for the admin to approve.

## 5. Bugs I hit and what I learned

| Bug | Lesson |
|---|---|
| Function folder `cleanCity` vs config `cleancity` | Linux is case-sensitive |
| Boolean came back as `true` in one place and `"true"` in another | Print real data — don't assume its type |
| Page stuck on "Login check…" | Script **order** matters: load the SDK before `init.js` |
| `redirect_uri_mismatch` | Read the error details — Google tells you the exact URL |
| Origin pasted into the redirect list | Origin = domain only; redirect = full path |
| Production database was empty | Migration copies structure, **not** data |

---

## 🗣️ Spoken English practice

Say each line out loud three times.

**Explaining the project**
- "I built a waste collection app for four locations and fifty vehicles."
- "Supervisors enter today's wet and dry collection, and the app calculates the rest."
- "The report shows weekly and monthly totals for each location."

**Explaining a decision**
- "I stored the ID instead of the name, so renaming a location only changes one row."
- "I don't store the total, because it can be calculated from the households."
- "I check the date on the server, because the browser can't be trusted."

**Explaining security**
- "Logging in with Google isn't enough — your email has to be on our list."
- "If someone forwards the link, they still can't see any data."
- "The admin can approve new people with one click."

**Talking about a bug**
- "At first the page was stuck, because I loaded the scripts in the wrong order."
- "Google said the redirect URI didn't match, so I copied the exact URL from the error."
- "I learned to read the error message carefully instead of guessing."

**Useful phrases**
| Phrase | When to use it |
|---|---|
| "Let me check that first." | Before answering something you're not sure about |
| "It works on Development; now I'm moving it to Production." | Status update |
| "Could you send me a screenshot?" | Asking for help |
| "That's expected." | When a result is correct even if it looks empty |
