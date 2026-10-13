from pypdf import PdfReader

files = [
    "docs/catalyst_data_store.pdf",
    "docs/chromadb_getting_started.pdf",
    "docs/groq_rate_limits.pdf",
]

def remove_repeated_menu(pages):
    # Many pages end with the same website menu. Find the lines that ALL pages end with.
    if len(pages) < 3:
        return pages
    page_lines = [page.split("\n") for page in pages]
    menu_size = 0
    while True:
        last_lines = [lines[-(menu_size + 1)] for lines in page_lines if len(lines) > menu_size + 1]
        if len(last_lines) < len(pages) or len(set(last_lines)) != 1:
            break
        menu_size = menu_size + 1
    if menu_size < 3:
        return pages
    return ["\n".join(lines[:-menu_size]) for lines in page_lines]

def join_short_lines(text):
    # If almost every line is just 1-2 words, the line breaks mean nothing. Join them with spaces.
    lines = text.split("\n")
    average = len(text) / len(lines)
    if average < 20:
        return " ".join(line.strip() for line in lines if line.strip())
    return text

def load_documents():
    documents = []
    for path in files:
        reader = PdfReader(path)
        pages = []
        for page in reader.pages:
            pages.append(page.extract_text())
        pages = remove_repeated_menu(pages)
        text = "\n".join(pages)
        text = join_short_lines(text)
        documents.append({"source": path, "text": text})
    return documents

if __name__ == "__main__":
    docs = load_documents()
    for d in docs:
        print(d["source"], "->", len(d["text"]), "characters")
