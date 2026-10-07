# ⏱️ Learning Time Log

How much time I spend on each concept.

> Ex 1–3 times are **approximate**, worked out from file save times, screenshot times and git push times.
> From Ex 4 onward: say **"start"** when you begin and **"done"** when you finish — Claude notes the exact time.

---

## Playground (getBody concepts)

| # | Concept | Date | Start | End | Time spent | Notes |
|---|---|---|---|---|---|---|
| 1 | JSON parse / stringify | 2026-10-05 | 18:35 | 19:25 | ~50 min | Setup, VS Code run, "string vs object" doubt |
| 1 | (continued) | 2026-10-06 | 11:45 | 12:39 | ~55 min | parse / stringify, Tamil + English notes |
| 2 | try / catch | 2026-10-06 | 12:39 | 12:59 | ~20 min | Crash demo, error message reading |
| — | Resume guide (HOW-TO-RESUME.md) | 2026-10-06 | 12:59 | 13:12 | ~13 min | |
| 3 | `? :` ternary, truthy / falsy | 2026-10-06 | 13:12 | 13:50 | ~38 min | 5/8 guesses, 3 traps |
| 🍛 | Lunch break | 2026-10-06 | 13:55 | 14:20 | 25 min | Break — not counted in learning time |
| 4 | Promise (paused) | 2026-10-06 | 14:20 | 16:54 | ~2 h 34 min | setTimeout + callback understood; Promise confusing → restarted from basics. Step 1 (function + parameter) ✅. **Paused at Step 2 (callback)** — to revisit |
| 5 | Events (`.on`) | 2026-10-06 | 16:55 | 18:22 | ~1 h 27 min | .on / emit, data + end chunks; found & fixed 2 bugs ('data'→'end', missing ") |
| 6 | getBody (all together) | 2026-10-06 | 18:28 | 18:55 | ~27 min | Part A + B ✅ (fixed req.end → req.emit). Paused before Part C (3 case test) |
| ☕ | Tea break | 2026-10-06 | 18:55 | 19:18 | 23 min | Break — not counted |
| 6 | getBody (continued) | 2026-10-06 | 19:18 | 19:33 | ~15 min | Part C 3 case test ✅; fixed getbody→getBody, req→req3, req.end→req3.emit |

## Real app (my-vehicle-app)

| Step | Task | Date | Start | End | Time spent | Notes |
|---|---|---|---|---|---|---|
| 5.4 P2 | getBody in `index.js` | 2026-10-06 | 19:43 | 20:16 | ~33 min | Copied getBody (no EventEmitter / fake tests); fixed stray `}(datra)` → `}` (ReferenceError, scope) |

## 📚 Revision

| # | Topic | Date | Start | End | Time spent | Notes |
|---|---|---|---|---|---|---|
| R1 | catalyst init + catalyst serve (hotel story) | 2026-10-07 | 11:23 | 12:57 | ~1 h 34 min | Init 6/8, serve 6½/8, recall 5/5; explored SDK in node_modules |

## Real app (continued)

| Step | Task | Date | Start | End | Time spent | Notes |
|---|---|---|---|---|---|---|
| 5.4 P3 | catalyst.initialize → table | 2026-10-07 | 12:57 | 13:27 | ~30 min | Plan + architecture doc; old Hello code commented out, new code not typed yet |
| 🍛 | Lunch break | 2026-10-07 | 13:27 | 14:18 | 0 h 51 min | Break — not counted |
| 5.4 P3 | (continued) | 2026-10-07 | 14:18 | 17:05 | ~2 h 47 min | async/req,res/module.exports explained; R2 story; console.log debug; fixed getPageedRows typo (catch caught it) + Content-Type label; {"rows":[]} ✅ |

---

## Totals

| Concept | Time |
|---|---|
| Ex 1 – JSON | ~1 h 45 min |
| Ex 2 – try / catch | ~20 min |
| Ex 3 – ternary | ~38 min |
| Ex 4 – Promise (paused) | ~2 h 34 min |
| Ex 5 – Events | ~1 h 27 min |
| Ex 6 – getBody | ~42 min |
| **Playground total so far** | **~7 h 26 min** (+ 13 min resume guide; lunch 25 min + tea 23 min not counted) |
