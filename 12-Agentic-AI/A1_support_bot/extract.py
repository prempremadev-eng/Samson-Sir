import json
import instructor
from dotenv import load_dotenv
from groq import Groq
from ticket_schema import SupportTicket

load_dotenv()
client = instructor.from_groq(Groq(), mode=instructor.Mode.JSON)

name = input("Which transcript? (shipping / billing / defect): ")
with open(f"transcripts/{name}.json") as f:
    messages = json.load(f)

transcript = ""
for m in  messages:
    if m["role"] != "system":
        transcript += f'{m["role"]}: {m["content"]}\n'

print(transcript)


SYSTEM_PROMPT = """You are a support ticket assistant. Read the customer support conversation and fill in the support ticket.

Think step by step before you decide:
1. What is the problem? Choose issue_category: shipping, billing, defect, or other.
2. How urgent is it? Look at deadlines, money, health, and the customer's words.
   low = no rush, medium = soon, high = needed in a day or two, critical = emergency or needed today.
3. How does the customer feel? Look at their tone and words.
   positive, neutral, frustrated (annoyed but polite), or angry (rude, shouting, threatening).
4. Only fill order_id and customer_name if the customer actually said them. Otherwise leave them empty.
5. Write a one-sentence summary.

Example:
Conversation:
user: I was charged twice for my subscription!! This is the third time. Fix it NOW.
assistant: I'm sorry about that. Can you share your account number?
user: ACC-7731. I'm Ravi.
assistant: Thank you, Ravi. How soon do you need this resolved?
user: Before my rent is due on Friday, I need that money back.

Thinking: Double charge on a subscription, so billing. Rent is due in a few days, so high, not critical. Capital letters, "third time", "NOW" means angry. Customer gave account number and name.

Ticket:
order_id: ACC-7731
customer_name: Ravi
issue_category: billing
urgency: high
sentiment: angry
summary: Customer was charged twice for a subscription again and needs a refund before Friday.
"""

ticket = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    response_model=SupportTicket,
    max_retries=2,
    messages=[{"role":"system", "content": SYSTEM_PROMPT},
    {"role": "user","content":transcript},
],
)
print(ticket.model_dump_json(indent=2))

with open(f"tickets/{name}.json", "w") as f:
    f.write(ticket.model_dump_json(indent=2))
print(f"Saved tickets/{name}.json")

