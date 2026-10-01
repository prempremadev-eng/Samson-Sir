# Agentic AI — Assignment A1
## Multi-Turn Customer Support Bot

**Date started:** 01 October 2026  
**Status:** Learning in Progress  
**Purpose:** One file for assignment requirements, learning notes, practice, plan, and daily progress.

---

## 1. Today's Goal

Start preparing for Agentic AI Assignment A1: build a customer support chatbot that can hold a multi-turn conversation, ask questions to understand a customer's problem, collect customer and order details, and extract the information into a structured support ticket.

## 2. Assignment Overview

The bot should:
- Have a natural multi-turn conversation with a customer.
- Ask clarifying questions one at a time.
- Collect order/account details, the issue, and urgency.
- Keep the conversation history in a growing `messages[]` list and resend the full history each turn.
- Keep the chat phase separate from the structured extraction phase.
- Use the plain-text control signal `READY_TO_CLOSE` when enough information has been collected.
- Extract a structured ticket using Pydantic and Instructor.
- Run three distinct scenarios: shipping, billing, and defect.
- Save each extracted ticket as JSON and capture terminal transcripts/screenshots.
- Include setup instructions and prompting choices in this README.

### Required ticket schema

Create a Pydantic `SupportTicket` model with at least five fields:
- Use `Literal[...]` for categorical fields.
- Use `Optional` only for fields that are genuinely absent.
- Include a required summary.

Extraction requirements:
- Use Instructor with `response_model`.
- Set `max_retries=2` (or no more than 3).
- The extraction system prompt should combine few-shot examples and a chain-of-thought instruction.

## 3. What I Learned — Day 1 (01 October 2026)

### A. Python Lists

A list stores multiple values in one variable.

```python
messages = []

messages.append("Hello")
messages.append("My order is delayed")

print(messages)
print(messages[0])  # Access the first item
```

Key points:
- `[]` creates an empty list.
- `.append()` adds an item to the end.
- Indexing starts at `0`; `messages[0]` is the first item.
- `len(messages)` gives the number of items.

### B. Python Dictionaries

A dictionary stores information as `key: value` pairs.

```python
customer = {
    "name": "Prem",
    "order_id": "ORD123"
}

print(customer["name"])

customer["issue"] = "Order delayed"  # Add a new key/value
customer["name"] = "Prem K"          # Update an existing value
```

Key points:
- Use a key to access its value.
- Assignment adds a new key or updates an existing key.

### C. List of Dictionaries

A list can contain dictionaries. This structure is useful for chatbot conversation history.

```python
messages = [
    {"role": "user", "content": "My order is delayed"},
    {"role": "assistant", "content": "Can you provide your order ID?"}
]
```

### D. For Loop

A `for` loop processes items one by one.

```python
for message in messages:
    print(message)
```

### E. While Loop and Break

A `while` loop repeats while its condition is true. `break` stops the loop.

```python
while True:
    user_input = input("You: ")

    if user_input == "exit":
        break
```

### F. Practice completed

```python
messages = []

messages.append("Hello")
messages.append("My order is delayed ")

for mes in messages:
    print(mes)
```

Expected output:

```text
Hello
My order is delayed
```

Python comments use `#`, not `//`.

## 4. Learning Plan

| Day | Topic | Status |
|---|---|---|
| Day 1 | Python lists, dictionaries, loops, `append()`, indexing, `break` | [x] Practiced |
| Day 2 | LLM API call with Groq | [ ] Pending |
| Day 3 | System prompts and few-shot prompting | [ ] Pending |
| Day 4 | Pydantic: `BaseModel`, `Literal`, `Optional` | [ ] Pending |
| Day 5 | Instructor and `response_model` | [ ] Pending |
| Day 6 | Multi-turn chat loop and full message history | [ ] Pending |
| Day 7 | Shipping, billing, defect scenarios and JSON tickets | [ ] Pending |
| Day 8 | Testing, terminal transcripts/screenshots, final README review | [ ] Pending |

## 5. Assignment Completion Checklist

- [ ] Create the chat loop.
- [ ] Keep and resend the full `messages[]` history every turn.
- [ ] Ask one clarification question at a time.
- [ ] Collect order/account, issue, and urgency.
- [ ] Use `READY_TO_CLOSE` when enough information is available.
- [ ] Define `SupportTicket` with at least five fields.
- [ ] Use `Literal` for categorical fields and appropriate `Optional` fields.
- [ ] Make the summary required.
- [ ] Implement extraction using Instructor `response_model`.
- [ ] Configure `max_retries` to 2 (or at most 3).
- [ ] Include few-shot examples and chain-of-thought instruction in the extraction system prompt.
- [ ] Run the shipping scenario and save its JSON ticket.
- [ ] Run the billing scenario and save its JSON ticket.
- [ ] Run the defect scenario and save its JSON ticket.
- [ ] Capture terminal transcript/screenshots for all three scenarios.
- [ ] Document setup steps and prompting choices.
- [ ] If attempted, document the standard-vs-reasoning model comparison.
- [ ] If attempted, include the `transferred_to_human` boolean stretch goal.

## 6. Project Setup Notes

Project folder:

```text
assignment-a1-support-bot/
└── README.md
```

The README is the single learning journal and project overview. As the project grows, code and required JSON/transcript deliverables can be added as separate project files; learning notes and the plan stay in this README.

Useful setup commands:

```bash
cd ~/Documents/Samson-Sir/12-Agentic-AI/assignment-a1-support-bot
code README.md
```

Save changes in VS Code with **Ctrl + S**.

## 7. Daily Progress Log

### 01 October 2026 — Day 1

**Learned**
- Python lists and `append()`
- List indexing and `len()`
- Dictionaries and key/value pairs
- Adding and updating dictionary values
- Lists containing dictionaries
- `for` loop
- `while` loop
- `break`

**Practiced**
- Created a `messages` list.
- Added messages using `.append()`.
- Printed the messages using a `for` loop.

**Project work**
- Created the `assignment-a1-support-bot` project folder.
- Started this single README learning journal.

**Next session**
- Practice the Python structures in the project.
- Begin learning how to call an LLM API with Groq.

---

## 8. Notes for Future Updates

At the end of each study session:
1. Add a new dated subsection under **Daily Progress Log**.
2. Write what was learned in simple words.
3. Add the code example or practice completed.
4. Update the **Learning Plan** and **Assignment Completion Checklist**.
5. Keep this as the one central notes file.
