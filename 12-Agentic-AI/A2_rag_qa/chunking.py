from langchain_text_splitters import CharacterTextSplitter
from ingest import load_documents

def fixed_size_chunks(documents):
    splitter = CharacterTextSplitter(
        separator="",
        chunk_size=500,
        chunk_overlap=50,
    )
    chunks=[]
    for doc in documents:
        pieces = splitter.split_text(doc["text"])
        for piece in pieces:
            chunks.append({"source": doc["source"], "text": piece})
    return chunks

if __name__=="__main__":
    docs = load_documents()
    fixed = fixed_size_chunks(docs)
    print("Fixed-size chunks:", len(fixed))
    print("--- Example chunk ---")
    print(fixed[0]["text"])
    
