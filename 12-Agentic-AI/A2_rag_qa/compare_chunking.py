from ingest import load_documents
from chunking import fixed_size_chunks
from recursive_chunking import recursive_chunks

def starts_mid_word(chunk, documents):
    # Find where the chunk sits in its book, then look at the letter just before it.
    for doc in documents:
        if doc["source"] == chunk["source"]:
            position = doc["text"].find(chunk["text"])
            if position <= 0:
                return False
            before = doc["text"][position - 1]
            return before.isalnum() and chunk["text"][0].isalnum()
    return False

def describe(name, chunks, documents):
    sizes = [len(c["text"]) for c in chunks]
    broken = sum(1 for c in chunks if starts_mid_word(c, documents))
    return {
        "name": name,
        "chunks": len(chunks),
        "average": round(sum(sizes) / len(sizes)),
        "smallest": min(sizes),
        "biggest": max(sizes),
        "broken": broken,
    }

if __name__ == "__main__":
    docs = load_documents()
    rows = [
        describe("Fixed-size (500 / 50)", fixed_size_chunks(docs), docs),
        describe("Recursive (500 / 50)", recursive_chunks(docs), docs),
    ]
    lines = [
        "| Strategy | Chunks | Avg size | Smallest | Biggest | Starts in the middle of a word |",
        "|---|---|---|---|---|---|",
    ]
    for r in rows:
        lines.append(f"| {r['name']} | {r['chunks']} | {r['average']} | {r['smallest']} | {r['biggest']} | {r['broken']} of {r['chunks']} |")
    table = "\n".join(lines)
    print(table)
    with open("results/chunking_comparison.md", "w") as f:
        f.write(table + "\n")
    print("Saved to results/chunking_comparison.md")
