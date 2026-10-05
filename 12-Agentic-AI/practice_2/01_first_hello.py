from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client = Groq()

response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[
        {"role": "user", "content": "Say hello to Prem in one line"}
    ],
)

print("AI:", response.choices[0].message.content)
