import os
from dotenv import load_dotenv
from groq import Groq
from index import get_collection

load_dotenv()
LLM_MODEL = "openai/gpt-oss-20b"
TOP_K = 4

def retrieve_dense(question, k=TOP_K):
    # Vector search: find the k chunks whose meaning is closest to the question.
    result = get_collection().query(query_texts=[question], n_results=k)
    return [
        {"text": text, "source": meta["source"]}
        for text, meta in zip(result["documents"][0], result["metadatas"][0])
    ]

def generate_answer(question, chunks):
    # Give the LLM ONLY the retrieved chunks, and tell it not to use anything else.
    context = "\n\n".join(f"[{c['source']}]\n{c['text']}" for c in chunks)
    prompt = (
        "Answer the question using ONLY the context below.\n"
        "If the answer is not in the context, say: I don't know based on the documents.\n"
        "Keep the answer short and mention the source file.\n\n"
        f"Context:\n{context}\n\nQuestion: {question}"
    )
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    response = client.chat.completions.create(
        model=LLM_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
        reasoning_effort="low",
    )
    return response.choices[0].message.content

def ask(question):
    chunks = retrieve_dense(question)
    answer = generate_answer(question, chunks)
    return answer, chunks

if __name__ == "__main__":
    question = input("Ask a question: ")
    answer, chunks = ask(question)
    print("\nAnswer:", answer)
    print("\nSources used:")
    for c in chunks:
        print(" -", c["source"])
