from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client = Groq()

messages = []

print("Chat ready. Type bye to stop.\n")

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
    print("AI:", answer)

print("\nChat closed. Total entries:", len(messages))
