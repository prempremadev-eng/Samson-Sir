from pypdf import PdfReader
reader = PdfReader("docs/groq_rate_limits.pdf")
print(len(reader.pages))
text = ""
for page in reader.pages:
    text = text + page.extract_text()
print(text[:600])
