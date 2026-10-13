# Example Run

Three real exchanges with `python rag.py` (hybrid retrieval + `openai/gpt-oss-20b` on Groq), recorded on 13 Oct 2026.

## 1. Exact model ID inside a table (the case hybrid retrieval was added for)

```
$ python rag.py
Ask a question: What is the requests-per-minute limit for openai/gpt-oss-safeguard-20b on Groq?

Answer: The requests‑per‑minute limit for **openai/gpt‑oss‑safeguard‑20b** is **3** requests per minute【docs/groq_rate_limits.pdf】.

Sources used:
 - docs/groq_rate_limits.pdf
 - docs/groq_rate_limits.pdf
 - docs/groq_rate_limits.pdf
 - docs/groq_rate_limits.pdf
```

Correct (the table row is `openai/gpt-oss-safeguard-20b 3 1K 2K 200K`). With dense-only retrieval the same question returns *"I don't know based on the documents."* because the table chunk is not in the top 4 (see `results/answers_dense.json`, question 9).

## 2. A how-to question answered from the ChromaDB guide

```
$ python rag.py
Ask a question: How do I add documents to a Chroma collection?

Answer: Add documents by calling the collection's `add` (or `upsert`) method with IDs and the text.
Example from the docs:

    collection = chroma_client.create_collection(name="my_collection")
    collection.add(
        ids=["id1", "id2"],
        documents=[
            "This is a document about pineapple",
            "This is a document about oranges"
        ]
    )

Source: *docs/chromadb_getting_started.pdf*

Sources used:
 - docs/chromadb_getting_started.pdf
 - docs/chromadb_getting_started.pdf
 - docs/chromadb_getting_started.pdf
 - docs/chromadb_getting_started.pdf
```

## 3. A question the documents cannot answer

```
$ python rag.py
Ask a question: Who is the prime minister of India?

Answer: I don't know based on the documents.

Sources used:
 - docs/groq_rate_limits.pdf
 - docs/catalyst_data_store.pdf
 - docs/chromadb_getting_started.pdf
 - docs/groq_rate_limits.pdf
```

The model has the general knowledge to answer, but the prompt restricts it to the retrieved context, so it refuses instead of answering from memory. The retrieved chunks come from all three files, a sign that nothing matched well.
