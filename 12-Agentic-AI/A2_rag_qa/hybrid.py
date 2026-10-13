import re
from rank_bm25 import BM25Okapi
from index import get_collection

CANDIDATES = 10
RRF_K = 60

def tokenize(text):
    # Lower-case words and numbers: "openai/gpt-oss-20b" -> ["openai", "gpt", "oss", "20b"]
    return re.findall(r"\w+", text.lower())

def load_all_chunks():
    # Read every chunk back from ChromaDB, so BM25 searches the exact same chunks.
    data = get_collection().get()
    return [
        {"id": chunk_id, "text": text, "source": meta["source"]}
        for chunk_id, text, meta in zip(data["ids"], data["documents"], data["metadatas"])
    ]

def keyword_ranking(question, chunks):
    # BM25: rank chunks by how many of the question's exact words they contain.
    bm25 = BM25Okapi([tokenize(c["text"]) for c in chunks])
    scores = bm25.get_scores(tokenize(question))
    order = sorted(range(len(chunks)), key=lambda i: scores[i], reverse=True)
    return [chunks[i]["id"] for i in order[:CANDIDATES]]

def vector_ranking(question):
    # Dense search: rank chunks by meaning (same as rag.py).
    result = get_collection().query(query_texts=[question], n_results=CANDIDATES)
    return result["ids"][0]

def retrieve_hybrid(question, k=4):
    # Reciprocal Rank Fusion: a chunk gets points from each list; higher in a list = more points.
    chunks = load_all_chunks()
    by_id = {c["id"]: c for c in chunks}
    points = {}
    for ranking in [vector_ranking(question), keyword_ranking(question, chunks)]:
        for rank, chunk_id in enumerate(ranking, 1):
            points[chunk_id] = points.get(chunk_id, 0) + 1 / (RRF_K + rank)
    best = sorted(points, key=points.get, reverse=True)[:k]
    return [{"text": by_id[i]["text"], "source": by_id[i]["source"]} for i in best]

if __name__ == "__main__":
    question = "How many requests per minute is the limit for openai/gpt-oss-20b?"
    print("Question:", question)
    print("\nVector top 4:", vector_ranking(question)[:4])
    print("BM25 top 4  :", keyword_ranking(question, load_all_chunks())[:4])
    print("\nHybrid top 4:")
    for c in retrieve_hybrid(question):
        print(" -", c["source"], "|", c["text"][:80].replace("\n", " "))
