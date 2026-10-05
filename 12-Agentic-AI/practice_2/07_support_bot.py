import json
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client = Groq()

messages = [
    {"role": "system", "content":
        "You are a friendly customer support agent. "
        "Ask only one question at a time. "
        "Collect the order or account number, the issue, and the urgency. "
        "Accept the urgency in the customer's own words, such as low, medium, high, or emergency. "
        "When you have all three, thank the customer briefly, then write READY_TO_CLOSE on a new line."
    }
]

print("Support bot ready. Type your message.\n")

while True:
    user_text = input("You: ")
    if user_text.lower() == "bye":
        break
    messages.append({"role": "user", "content": user_text})
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=messages,
    )
    answer = response.choices[0].message.content
    messages.append({"role": "assistant", "content": answer})
    print("Bot:", answer)
    if "READY_TO_CLOSE" in answer:
        break

print("\nConversation closed. Total entries:", len(messages))

name = input("Save as (shipping / billing / defect): ").strip()
with open(f"transcripts/{name}.json", "w") as f:
    json.dump(messages, f, indent=2, ensure_ascii=False)
print("Saved!")
