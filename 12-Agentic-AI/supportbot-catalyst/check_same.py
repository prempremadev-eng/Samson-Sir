"""Check that our copied prompts and the SupportTicket schema are identical to A1.

Run from the supportbot-catalyst folder:   python3 check_same.py
It only READS ../A1_support_bot. It never writes there.
"""
import ast
import sys
from pathlib import Path

HERE = Path(__file__).parent
A1 = HERE.parent / "A1_support_bot"
sys.path.insert(0, str(HERE / "functions" / "support_api"))

from prompts import SUPPORT_PROMPT, EXTRACT_PROMPT  # noqa: E402


def a1_support_prompt():
    # the "content" of the {"role": "system", ...} message in chat_loop.py
    tree = ast.parse((A1 / "chat_loop.py").read_text())
    for node in ast.walk(tree):
        if isinstance(node, ast.Dict):
            d = {ast.literal_eval(k): v for k, v in zip(node.keys, node.values)}
            if "role" in d and ast.literal_eval(d["role"]) == "system":
                return ast.literal_eval(d["content"])


def a1_extract_prompt():
    # the SYSTEM_PROMPT = """...""" in extract.py
    tree = ast.parse((A1 / "extract.py").read_text())
    for node in ast.walk(tree):
        if isinstance(node, ast.Assign) and getattr(node.targets[0], "id", "") == "SYSTEM_PROMPT":
            return ast.literal_eval(node.value)


checks = {
    "SUPPORT_PROMPT": SUPPORT_PROMPT == a1_support_prompt(),
    "EXTRACT_PROMPT": EXTRACT_PROMPT == a1_extract_prompt(),
    # the schema file is copied as-is, so compare the whole file byte for byte
    "ticket_schema.py": (HERE / "functions" / "support_api" / "ticket_schema.py").read_bytes()
    == (A1 / "ticket_schema.py").read_bytes(),
}

for name, same in checks.items():
    print(("OK      " if same else "DIFFERENT"), name)

sys.exit(0 if all(checks.values()) else 1)
