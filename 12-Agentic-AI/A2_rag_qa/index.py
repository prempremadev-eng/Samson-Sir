import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
from ingest import load_documents
from recursive_chunking import recursive_chunks

DB_FOLDER = "chroma_db"
COLLECTION_NAME = "a2_docs"
EMBEDDING_MODEL = "all-MiniLM-L6-v2"

def get_collection():
    # Open (or create) the vector database on disk, with the embedding model attached.
    client = chromadb.PersistentClient(path=DB_FOLDER)
    embedder = SentenceTransformerEmbeddingFunction(model_name=EMBEDDING_MODEL)
    return client.get_or_create_collection(name=COLLECTION_NAME, embedding_function=embedder)

def build_index():
    chunks = recursive_chunks(load_documents())
    client = chromadb.PersistentClient(path=DB_FOLDER)
    # Start fresh every time, so running this twice never stores the same chunk twice.
    if COLLECTION_NAME in [c.name for c in client.list_collections()]:
        client.delete_collection(COLLECTION_NAME)
    collection = get_collection()
    collection.add(
        ids=[f"chunk-{number}" for number in range(len(chunks))],
        documents=[c["text"] for c in chunks],
        metadatas=[{"source": c["source"]} for c in chunks],
    )
    return collection

if __name__ == "__main__":
    collection = build_index()
    print("Chunks stored in ChromaDB:", collection.count())
    question = "How many requests per minute can I send?"
    result = collection.query(query_texts=[question], n_results=3)
    print("Question:", question)
    for text, meta, distance in zip(result["documents"][0], result["metadatas"][0], result["distances"][0]):
        print(f"--- {meta['source']} (distance {distance:.2f}) ---")
        print(text[:200])
