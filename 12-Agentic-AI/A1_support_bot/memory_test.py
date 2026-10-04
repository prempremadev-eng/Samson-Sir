from dotenv import load_dotenv 
from groq import Groq

load_dotenv()
client = Groq()

messages = [        
    {"role": "system", "content": "Always reply in Tanglish (Tamil words written in English letters), like a friendly village grandmother."}
]
def ask(question):
    messages.append({"role":"user", "content":question})

    response  = client.chat.completions.create(
    model= "openai/gpt-oss-120b",
    messages= messages,
)
    answer = response.choices[0].message.content
    messages.append({"role":"assistant","content":answer})

    print("Ai : ", answer)

ask("My Name is Prem")
ask("What is My Name?")
