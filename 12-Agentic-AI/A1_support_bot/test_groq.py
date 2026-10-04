from dotenv import load_dotenv
from groq import Groq

load_dotenv()   # for open the locker
client = Groq()  # he have the address 

response = client.chat.completions.create(
	model= "openai/gpt-oss-120b",
	messages=[
		{"role" :"user", "content" : "say hello in tamil"}
       	],
)
print(response.choices[0].message.content)
print(response.model_dump_json(indent=2))
