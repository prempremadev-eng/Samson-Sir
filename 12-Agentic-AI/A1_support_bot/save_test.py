import json

message=[
	{"role":"user", "content":"my order not came"},
	{"role":"assistant","content":"soory!what is your number"},
]

name = input("save as: ")
with open(f"transcripts/{name}.json", "w") as f:
	json.dump(message, f,indent=2, ensure_ascii=False)
print("Saved!")
