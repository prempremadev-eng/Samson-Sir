from langchain_text_splitters import RecursiveCharacterTextSplitter
from ingest import load_documents
from chunking import fixed_size_chunks

def recursive_chunks(documents):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
    )
    chunks=[]
    for doc in documents:
        pieces = splitter.split_text(doc["text"])
        for piece in pieces:
            chunks.append({"source": doc["source"], "text":piece})
    return chunks
if __name__=="__main__":
    docs = load_documents()
    fixed = fixed_size_chunks(docs)
    recursive = recursive_chunks(docs)
    print("Fixed-size chunks:", len(fixed))
    print("Recursive chunks :", len(recursive))
    print("---How does chunk 5 END? ---")
    print("Fixed :", repr(fixed[5]["text"][-60:]))
    print("Recursive :",repr(*recursive[5]["text"][-60:]))
