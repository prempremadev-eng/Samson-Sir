from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client = Groq()

messages = []

def ask(question):
    messages.append({"role": "user", "content": question})
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=messages,
    )
    answer = response.choices[0].message.content
    messages.append({"role": "assistant", "content": answer})
    print("AI:", answer)

user_text = input("You: ")
ask(user_text)

user_text = input("You: ")
ask(user_text)
