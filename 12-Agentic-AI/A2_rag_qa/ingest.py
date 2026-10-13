from pypdf import PdfReader

files = [
    "docs/catalyst_data_store.pdf",
    "docs/chromadb_getting_started.pdf",
    "docs/groq_rate_limits.pdf",
]

def load_documents():
    documents = []
    for path in files:
        reader = PdfReader(path)
        text=  ""
        for page in reader.pages:
            text = text + page.extract_text()
        documents.append({"source": path, "text":text})
    return documents

if __name__ == "__main__":
    docs =  load_documents()
    for d in docs:
        print(d["source"], "->", len(d["text"]), "characters")
