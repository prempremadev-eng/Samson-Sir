import json
import os
import sys

from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from ragas import EvaluationDataset, RunConfig, evaluate
from ragas.embeddings import LangchainEmbeddingsWrapper
from ragas.llms import LangchainLLMWrapper
from ragas.metrics import Faithfulness, LLMContextPrecisionWithReference, LLMContextRecall, ResponseRelevancy

from rag import ask

load_dotenv(".env")
JUDGE_MODEL = "openai/gpt-oss-120b"  # a different, bigger model than the one that answers
MODES = ["dense", "hybrid"]
METRICS = ["faithfulness", "answer_relevancy", "context_recall", "context_precision"]


def run_pipeline(mode, eval_set):
    # Step 1: ask every question and keep the answer + the retrieved chunks.
    # Saved to a file, so a re-run (for example after a rate-limit error) does not ask Groq again.
    path = f"results/answers_{mode}.json"
    if os.path.exists(path):
        with open(path) as f:
            return json.load(f)
    rows = []
    for item in eval_set:
        answer, chunks = ask(item["question"], mode=mode)
        rows.append({
            "user_input": item["question"],
            "response": answer,
            "retrieved_contexts": [c["text"] for c in chunks],
            "retrieved_sources": [c["source"] for c in chunks],
            "reference": item["ground_truth"],
        })
        print(f"  [{mode}] answered: {item['question']}")
    with open(path, "w") as f:
        json.dump(rows, f, indent=2)
    return rows


def score(mode, rows):
    # Step 2: RAGAS uses a judge LLM to grade every answer on the 4 metrics.
    path = f"results/ragas_{mode}.csv"
    if os.path.exists(path):
        import pandas as pd
        return pd.read_csv(path)
    judge = LangchainLLMWrapper(ChatGroq(model=JUDGE_MODEL, temperature=0, reasoning_effort="low", max_retries=10))
    embeddings = LangchainEmbeddingsWrapper(HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2"))
    dataset = EvaluationDataset.from_list([
        {k: r[k] for k in ["user_input", "response", "retrieved_contexts", "reference"]} for r in rows
    ])
    metrics = [
        Faithfulness(),
        ResponseRelevancy(strictness=1),
        LLMContextRecall(),
        LLMContextPrecisionWithReference(name="context_precision"),
    ]
    # Only 2 calls at a time and patient retries, because Groq allows 8K tokens per minute.
    config = RunConfig(max_workers=2, timeout=600, max_retries=15, max_wait=120)
    result = evaluate(dataset, metrics=metrics, llm=judge, embeddings=embeddings, run_config=config)
    table = result.to_pandas()
    table.to_csv(path, index=False)
    return table


def write_summary(tables):
    lines = [
        "| Retrieval | " + " | ".join(METRICS) + " |",
        "|---|" + "---|" * len(METRICS),
    ]
    for mode, table in tables.items():
        lines.append(f"| {mode} | " + " | ".join(f"{table[m].mean():.3f}" for m in METRICS) + " |")
    lines += ["", "### Per question (hybrid)", "", "| # | Question | " + " | ".join(METRICS) + " |", "|---|---|" + "---|" * len(METRICS)]
    hybrid = tables.get("hybrid")
    if hybrid is not None:
        for i, row in hybrid.iterrows():
            values = " | ".join("—" if row[m] != row[m] else f"{row[m]:.2f}" for m in METRICS)
            lines.append(f"| {i + 1} | {row['user_input']} | {values} |")
    text = "\n".join(lines) + "\n"
    with open("results/ragas_summary.md", "w") as f:
        f.write(text)
    print(text)


if __name__ == "__main__":
    with open("eval_set.json") as f:
        eval_set = json.load(f)
    if len(sys.argv) > 1:  # e.g. "python evaluate.py 1" tries only the first question
        eval_set = eval_set[: int(sys.argv[1])]
    os.makedirs("results", exist_ok=True)
    tables = {}
    for mode in MODES:
        print(f"== {mode} ==")
        rows = run_pipeline(mode, eval_set)
        tables[mode] = score(mode, rows)
    write_summary(tables)
