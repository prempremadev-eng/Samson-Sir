# Daily Activity – 08-10-2026

## Topic: Car Parking app – Phase 5 complete (React form → Catalyst function → Data Store), CORS

Learning time: **~6 h 19 min**

### 1. What I did

| # | Work | Result |
|---|---|---|
| 1 | Pushed the reference app `vehicle-entry-lancorVendorEntrance` to GitHub | API keys checked — not in the commit ✅ |
| 2 | Recall quiz (Part 3 + Part 4) | 5½ / 8 |
| 3 | 5.5: React `VehicleEntry` form → `fetch` POST → `entry_api` → `ParkingEntries` | First full row saved from the form 🎉 |
| 4 | Fixed a CORS error (`allowLocalhost` + OPTIONS 204) | ✅ |

### 2. Main errors I fixed

- `git push` → `src refspec main does not match any` (no commit yet)
- `fetch` went to `localhost:5174/undefined` and returned 200 (missing `.env` in `import.meta.env`)
- Port 3000 already used by another project's `catalyst serve`
- 🚫 CORS preflight blocked the POST
- `TypeError`s from typos (`req.header`, `startWith`)
- `EntryType` / `InTime` empty (wrong column names, variable not in the backend)

### 3. Rating

| Concept | Debugging | Recall | Typing | Effort | Overall |
|---|---|---|---|---|---|
| Good | Very Good | Good | Average | Excellent | **4 / 5** |

### 4. Full notes

Folder: `Sounthararaman-Sir/Car_Parking/`

- Day summary: `daily-summary/2026-10-08.md`
- 5.5 notes: `revision/R5-5.5-react-fetch.md`
- CORS: `playground/7-cors-notes.md` (+ English)
- Spoken English: `spoken-english/2026-10-08.md`

### 5. Next

Phase 6 – Dashboard list (React GET) + time formatting (`utils.js`)
