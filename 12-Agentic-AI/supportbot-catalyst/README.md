# SupportBot – A1 support bot as a full-stack web app on Zoho Catalyst

**Name:** Premkumar R
**Course:** Certificate in Agentic AI for Engineers (Artiq Insights)
**Based on:** [A1 – Multi-turn support bot](../A1_support_bot/) (graded, not changed)

My A1 bot ran in the terminal. This project puts the **same prompts and the same ticket schema** behind a web page:

- a **chat page** where a customer talks to the support agent, and gets a ticket at the end
- a **dashboard** that lists all tickets, most urgent first

Model: `openai/gpt-oss-120b` on Groq. Libraries: `groq`, `instructor`, `pydantic` – the **same versions** as A1.

---

## How it works

```
Browser (Next.js on Catalyst Slate)
   │  POST /chat   { messages: [...] }        ← full conversation every time
   │  GET  /tickets
   ▼
Catalyst function support_api (Python 3.10, Advanced I/O)
   │  1. adds A1's support prompt (system) on the server
   │  2. calls Groq → reply
   │  3. if reply has READY_TO_CLOSE:
   │       build transcript → instructor + SupportTicket (max_retries=2) → ticket
   │       save ticket to Data Store
   ▼
Catalyst Data Store: table SupportTickets
```

- **The function has no memory.** Like in A1, the `messages` list *is* the memory. The browser keeps it in a zustand store and sends the **whole list** on every request.
- **The browser can never send a `system` message.** The server rejects it (400) and adds A1's system prompt itself.
- `READY_TO_CLOSE` is removed from the reply before the customer sees it.
- The transcript for extraction is built exactly like A1's `extract.py` (skip system, one `role: content` line each), including the bot's last answer with `READY_TO_CLOSE` – because A1's saved transcripts had it too.

---

## Project structure

```
supportbot-catalyst/
├── .gitignore
├── catalyst.json                 # Catalyst project: one function + one Slate app
├── check_same.py                 # proves prompts + schema are identical to A1
├── functions/support_api/        # the backend (one function, two routes)
│   ├── main.py                   # POST /chat, GET /tickets
│   ├── prompts.py                # SUPPORT_PROMPT + EXTRACT_PROMPT, copied from A1
│   ├── ticket_schema.py          # copied byte for byte from A1
│   ├── requirements.txt          # groq, instructor, pydantic (A1 versions)
│   └── catalyst-config.json      # NO env_variables here (see "Rules")
└── web/                          # the frontend (Next.js + shadcn/ui + zustand)
    ├── app/page.tsx              # chat page
    ├── app/dashboard/page.tsx    # tickets table
    ├── store/chat.ts             # zustand: messages[], send(), reset()
    ├── lib/api.ts                # sendChat(), getTickets(), types
    ├── lib/labels.ts             # badge colours, IST date format
    ├── components/               # ticket card, nav, shadcn/ui parts
    ├── public/.catalyst/slate-config.toml
    └── .env.example              # copy to .env.local
```

## Catalyst resources

| Resource | Name | Notes |
|---|---|---|
| Function | `support_api` | Advanced I/O, `python_3_10` |
| Data Store table | `SupportTickets` | `order_id`, `customer_name`, `issue_category`, `urgency`, `sentiment` (varchar), `summary`, `transcript` (text). `CREATEDTIME` is added by Catalyst. |
| Environment variable | `GROQ_API_KEY` | set **only in the console** on the function |
| Slate app | `supportbot-web` | static Next.js build from `web/out` |
| CORS domains | `localhost:3000` and the Slate domain | so the browser may call the function |

---

## Rules I follow (and why)

1. **`GROQ_API_KEY` lives only in the Catalyst console.** It is never in a file in this folder, so it can never be pushed to GitHub.
2. **Never add `env_variables` back into `catalyst-config.json`.** I tested this: with `"env_variables": {}` in the file, every `catalyst deploy` **wiped** the key I set in the console. After removing the line, the key survived redeploys.
3. **Never edit `prompts.py` or `ticket_schema.py` by hand.** They must stay identical to A1. Run `python3 check_same.py` – it prints `OK` three times or fails.
4. **The function URL and the Slate URL are public.** Anyone with them can chat (using my Groq credits) or read tickets. I blur them in screen recordings and keep them out of this README.

---

## Setup (fresh clone)

Tested on Ubuntu, Python 3.10, Node 22, Catalyst CLI 1.27.

```bash
cd supportbot-catalyst

# 1. Link this folder to the SupportBot project (log in with the right account first)
catalyst login
catalyst init --org <org-id> -p <project-id> -ni

# 2. Install the Catalyst Python SDK into the function folder, WITHOUT its dependencies
python3 -m pip install --no-deps -t functions/support_api zcatalyst-sdk==1.4.0

# 3. Frontend packages and the function URL
cd web
npm install
cp .env.example .env.local      # put the real function URL in it
```

**Why `--no-deps`?** The Catalyst SDK (`zcatalyst-sdk` 1.4.0, the latest) pins `typing-extensions` to `4.12.x`, but A1's `pydantic` 2.13.5 and `groq` 1.7.0 need `>= 4.14`. pip refuses to install them together. I tested that the SDK works fine with 4.16 (locally and on Catalyst), so I install it separately and keep A1's exact versions for the AI libraries. The SDK folder is in `.gitignore`.

Then set `GROQ_API_KEY` in the console: **SupportBot → Development → Serverless → Functions → support_api → Environment Variables**.

## Run and deploy

```bash
# Backend: deploy the function
catalyst deploy --only functions:support_api

# Frontend locally (must be port 3000, because CORS allows localhost:3000)
cd web && npm run dev

# Frontend to Slate: build first (the function URL is baked in at build time), then deploy
cd web && npm run build && cd .. && catalyst deploy slate supportbot-web -m "what changed"
```

---

## How I tested

**Backend with curl** (M2–M4):

| Test | Result |
|---|---|
| 4-turn chat | bot asks one question at a time; last turn `ready: true`, `READY_TO_CLOSE` not visible |
| browser sends a `system` message | 400 |
| wrong method / wrong body | 405 / 400 |
| finished chat | ticket extracted and saved in ~8 s (limit is 30 s) |
| `GET /tickets` sorting | checked with 8 fake tickets locally (no fake rows in the table) |
| CORS | allowed only for localhost:3000 and the Slate domain; exactly one `Allow-Origin` header |

**End-to-end on the live Slate site** (M7), replaying my A1 conversations:

| | A1 ticket | Web app ticket |
|---|---|---|
| Shipping (my own wording) | – | shipping · high · frustrated |
| Billing | billing · high · frustrated · ORD-455 | billing · high · frustrated · ORD-455 ✅ |
| Defect | defect · low · neutral · ORD-30988 · Kavitha | defect · low · neutral · ORD-30988 · — ✅ |

In the defect run I did **not** type my name, and `customer_name` stayed empty. That is correct: A1's prompt says to fill it **only if the customer said it**.

The dashboard put the **newest** ticket (low) at the **bottom**, under three high tickets – so it sorts by urgency first, and uses time only as a tie-breaker.

---

## Things I learned

- **Test, don't guess.** The docs did not say whether a deploy keeps console env variables. A tiny `groq_key_set: true/false` check (never the value) showed it did **not** – before any real code depended on it.
- **Dependency conflicts can be fake.** pip refused `zcatalyst-sdk` + `pydantic`, but the conflict was only a too-strict version pin. An import test proved it works.
- **Catalyst's date has no timezone.** `CREATEDTIME` is India time with no marker. `new Date()` would read it as UTC and be 5½ hours off, so I only reformat the text.
- **Read the generated code.** `shadcn init` wrote `--font-sans: var(--font-sans)` (points to itself), so the page fell back to a serif font. I only noticed it in a screenshot.
- **Linters teach React.** `react-hooks/set-state-in-effect` flagged `setLoading(true)` inside `useEffect`. I fixed the cause instead of disabling the rule.

## Limits

- The function is public (no login). Fine for a demo, not for real customer data.
- Data Store `text` columns hold 10,000 characters; longer transcripts are cut with `[truncated]`.
- Data Store cannot store emoji – they are saved as `?` (extraction still sees them).
- Requests are limited to 40 messages of 2,000 characters.

## Next (M8)

- `transferred_to_human: bool` – mark tickets that need a human agent.
