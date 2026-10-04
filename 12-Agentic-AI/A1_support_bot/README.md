# A1 – Customer Support Bot

**Name:** Premkumar R
**Course:** Certificate in Agentic AI for Engineers (Artiq Insights)
**Assignment:** A1 – Multi-turn support bot with structured ticket extraction

This project has two parts:

1. **`chat_loop.py`** – a support bot that talks with a customer, one question at a time, until it has the order number, the issue, and the urgency. Then it says `READY_TO_CLOSE` and saves the conversation.
2. **`extract.py`** – reads a saved conversation and turns it into a clean `SupportTicket` (Pydantic model) using `instructor`, with few-shot and chain-of-thought prompting.

Model used: `openai/gpt-oss-120b` on Groq.

---

## Project structure

```
A1_support_bot/
├── chat_loop.py        # multi-turn chat bot, saves transcript
├── ticket_schema.py    # SupportTicket Pydantic model
├── extract.py          # transcript -> SupportTicket (instructor)
├── requirements.txt
├── .env.example        # copy to .env and add your key
├── transcripts/        # saved conversations (shipping, billing, defect)
├── tickets/            # extracted tickets as JSON
└── screenshots/        # terminal screenshots of each run
```

---

## Setup

Tested on Ubuntu with Python 3.10.

```bash
# 1. Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate

# 2. Install the packages
pip install -r requirements.txt

# 3. Add your Groq API key
cp .env.example .env
nano .env          # replace your_groq_api_key_here with your real key
```

`.env` is in `.gitignore`, so the real key is never pushed to GitHub.

## How to run

**Step 1 – Have a conversation**

```bash
python3 chat_loop.py
```

Chat with the bot. When it has everything, it writes `READY_TO_CLOSE` and stops. Type `bye` to quit early. At the end, type the name to save as (`shipping`, `billing`, or `defect`). The file goes to `transcripts/`.

**Step 2 – Extract the ticket**

```bash
python3 extract.py
```

Type the same name. The ticket is printed and saved to `tickets/`.

---

## How the chat loop works

- All messages are kept in one list called `messages`. Every new user message and every bot answer is added to it, so the model sees the whole conversation each time. (The model has no memory by itself. The list *is* its memory.)
- The system prompt tells the bot to ask **one question at a time** and to collect three things: order/account number, the issue, and the urgency.
- When it has all three, it thanks the customer and writes `READY_TO_CLOSE` on a new line. My code checks for that word and ends the loop.

## The ticket schema

```python
class SupportTicket(BaseModel):
    order_id: Optional[str] = None
    customer_name: Optional[str] = None
    issue_category: Literal["shipping", "billing", "defect", "other"]
    urgency: Literal["low", "medium", "high", "critical"]
    sentiment: Literal["positive", "neutral", "frustrated", "angry"]
    summary: str
```

- **`Literal`** – the model can only pick from a fixed list. If it writes something else (for example `"emergency"` instead of `"critical"`), Pydantic raises a `ValidationError`, and `instructor` sends the error back to the model and asks again (`max_retries=2`). I tested this by hand with `urgency="emergency"` and got the error.
- **`Optional`** – `order_id` and `customer_name` can be empty. The customer does not always give their name, and I don't want the model to make one up.
- **`summary`** – required, one sentence.

### Extra field: `sentiment`

I added `sentiment` because a support team should handle angry customers first. Urgency and sentiment are **two different things**:

- In my shipping test, the customer was **calm** but the issue was **critical**.
- In my billing test, the customer was **annoyed** but the issue was only **high**.

If I only had urgency, the team would not know who is upset. With both fields, they can sort tickets properly.

---

## Prompting choices (in `extract.py`)

### Why a few-shot example

I give the model one full example: a conversation, the thinking, and the finished ticket. This shows the exact format and the level of detail I want.

**I chose a billing example on purpose, not shipping.** My test conversations include shipping. If the example was also shipping, the model might just copy it. Using a different category forces it to learn the *pattern*, not the answer.

The example also teaches the hardest boundary: the customer needs money back **"before Friday"**, which is **high, not critical**. Because of this, in my billing test the model correctly marked **"by tomorrow"** as `high`.

### Why chain-of-thought

The prompt says **"Think step by step"** and gives five steps: category → urgency → sentiment → order id and name → summary. Each choice has a short meaning, for example:

- `frustrated` = annoyed but polite
- `angry` = rude, shouting, threatening

Without this, the model jumps to an answer from one keyword (for example "my order didn't come" → frustrated). With the steps, it checks each field on its own. The example also has a **"Thinking:"** line, so the model sees *how* to reason, not only what to answer.

---

## Results

| Field | shipping | billing | defect |
|---|---|---|---|
| order_id | ORD-45821 | ORD-455 | ORD-30988 |
| customer_name | null | null | Kavitha |
| issue_category | shipping | billing | defect |
| urgency | critical | high | low |
| sentiment | neutral | frustrated | neutral |

What this shows:

- **Urgency follows the customer's words:** "emergency" → `critical`, "by tomorrow" → `high`, "sometime this month" → `low`.
- **No made-up names:** `customer_name` is filled only in the defect ticket, where Kavitha actually said her name.
- **Sentiment improved with the prompt:** before adding chain-of-thought, the calm shipping customer was marked `frustrated`. After, it was correctly `neutral`. The billing customer went from `angry` to `frustrated`, which matches their milder words.

---

## What I learned / how the prompts changed

**Chat prompt (v1 → v2).** My first transcript is saved as `transcripts/shipping_v1_before_prompt_fix.json`. It had three problems:

1. The bot kept asking for urgency on a 1–5 scale even after I said "emergency".
2. It ended with only `READY_TO_CLOSE`, no thank you.
3. My prompt lines were joined without spaces (`agentAsk`, `timeCollect`) because I forgot `. ` at the end of each string.

So I added: *"friendly"*, *"Accept the urgency in the customer's own words…"*, and *"thank the customer briefly, then write READY_TO_CLOSE on a new line."* Then I redid all three conversations.

**Code runs ≠ code correct.** My first three tickets were created while the extraction prompt was still a placeholder. The code ran with no error, so I didn't notice. I found it because `extract.py` was only 954 bytes, which was too small. I checked with `grep -n "Think step by step" extract.py` and got nothing. After adding the real prompt (2340 bytes), I extracted all the tickets again. Lesson: check the output, not just "no error".

---

## Requirements met

- [x] Multi-turn loop with growing `messages[]` and `READY_TO_CLOSE`
- [x] Pydantic `SupportTicket` with 6 fields, `Literal` and `Optional`, required `summary`
- [x] `instructor` with `response_model=SupportTicket` and `max_retries=2`
- [x] Few-shot **and** chain-of-thought in the extraction prompt
- [x] Three conversations (shipping, billing, defect) saved as JSON, with tickets and screenshots
- [x] This README
