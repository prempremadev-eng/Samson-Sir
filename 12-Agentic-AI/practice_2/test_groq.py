from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client=Groq() 
messages=[]
def ask(question):
    messages[{"role":"user", "content":question}]
response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=messages
)

answer=response.choices[0].message.content
print("AI :",from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client=Groq()
    messages=[]
def ask(question):
    messages[{"role":"user", "content":question}]
response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=messages
)

    answer=response.choices[0].message.content
    print("AI: : answer)
ask("i am prem")


 answer)
ask("i am prem")
