from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client = Groq()

def ask(question):
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[{"role": "user", "content": question}],
    )
    print("AI:", response.choices[0].message.content)

ask("I am Prem")
ask("What is my name?")
