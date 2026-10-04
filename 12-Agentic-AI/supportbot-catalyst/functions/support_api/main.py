import logging

import instructor
import zcatalyst_sdk
from flask import Request, make_response, jsonify
from groq import Groq

from prompts import SUPPORT_PROMPT, EXTRACT_PROMPT
from ticket_schema import SupportTicket

MODEL = "openai/gpt-oss-120b"
READY = "READY_TO_CLOSE"
TABLE = "SupportTickets"
TEXT_LIMIT = 10000  # Data Store "text" columns hold at most 10,000 characters

# The function is public, so keep requests small and sane.
MAX_MESSAGES = 40
MAX_CHARS = 2000

logger = logging.getLogger()


def send(data, status=200):
    return make_response(jsonify(data), status)


def clean_messages(body):
    """Return (messages, error). Only user/assistant text is accepted."""
    if not isinstance(body, dict) or not isinstance(body.get("messages"), list):
        return None, "Body must be JSON like {\"messages\": [...]}"

    messages = body["messages"]
    if not messages:
        return None, "messages must not be empty"
    if len(messages) > MAX_MESSAGES:
        return None, f"Too many messages (max {MAX_MESSAGES})"

    cleaned = []
    for m in messages:
        if not isinstance(m, dict):
            return None, "Each message must be an object"
        role, content = m.get("role"), m.get("content")
        # Never accept a system message from the browser.
        if role not in ("user", "assistant"):
            return None, "role must be 'user' or 'assistant'"
        if not isinstance(content, str) or not content.strip():
            return None, "content must be non-empty text"
        if len(content) > MAX_CHARS:
            return None, f"A message is too long (max {MAX_CHARS} characters)"
        cleaned.append({"role": role, "content": content})

    if cleaned[-1]["role"] != "user":
        return None, "The last message must be from the user"
    return cleaned, None


def chat(request):
    messages, error = clean_messages(request.get_json(silent=True))
    if error:
        return send({"error": error}, 400)

    # The server adds the system prompt, same as A1 chat_loop.py.
    full = [{"role": "system", "content": SUPPORT_PROMPT}] + messages

    try:
        client = Groq()  # reads GROQ_API_KEY from the Catalyst env variable
        response = client.chat.completions.create(model=MODEL, messages=full)
        answer = response.choices[0].message.content
    except Exception:
        logger.exception("Groq chat call failed")
        return send({"error": "The support agent is unavailable. Please try again."}, 502)

    ready = READY in answer
    reply = answer.replace(READY, "").strip()  # the customer never sees the signal
    if not ready:
        return send({"reply": reply, "ready": False})

    # Conversation is finished: same transcript as A1 (it includes the bot's
    # last answer with READY_TO_CLOSE, because A1 saved that too).
    transcript = build_transcript(messages + [{"role": "assistant", "content": answer}])
    try:
        ticket = extract_ticket(transcript)
        row = save_ticket(ticket, transcript)
    except Exception:
        logger.exception("Ticket extraction or save failed")
        # The customer still gets the goodbye reply; the ticket just failed.
        return send({"reply": reply, "ready": True, "ticket": None,
                     "ticket_error": "Could not create the ticket."})

    return send({"reply": reply, "ready": True,
                 "ticket": {**ticket.model_dump(), "id": row["ROWID"],
                            "created_time": row["CREATEDTIME"]}})


def build_transcript(messages):
    # Same loop as A1 extract.py: skip system, one "role: content" line each.
    transcript = ""
    for m in messages:
        if m["role"] != "system":
            transcript += f'{m["role"]}: {m["content"]}\n'
    return transcript


def extract_ticket(transcript):
    # Same call as A1 extract.py: instructor + Groq, JSON mode, max_retries=2.
    client = instructor.from_groq(Groq(), mode=instructor.Mode.JSON)
    return client.chat.completions.create(
        model=MODEL,
        response_model=SupportTicket,
        max_retries=2,
        messages=[{"role": "system", "content": EXTRACT_PROMPT},
                  {"role": "user", "content": transcript}],
    )


def save_ticket(ticket, transcript):
    # Admin scope: the website visitor is not logged in, so the function
    # itself writes the row.
    app = zcatalyst_sdk.initialize(scope="admin")
    if len(transcript) > TEXT_LIMIT:
        transcript = transcript[:TEXT_LIMIT - 15] + "\n[truncated]"
    return app.datastore().table(TABLE).insert_row({
        "order_id": ticket.order_id,
        "customer_name": ticket.customer_name,
        "issue_category": ticket.issue_category,
        "urgency": ticket.urgency,
        "sentiment": ticket.sentiment,
        "summary": ticket.summary,
        "transcript": transcript,
    })


# Lower number = shown first.
URGENCY_ORDER = {"critical": 0, "high": 1, "medium": 2, "low": 3}
SENTIMENT_ORDER = {"angry": 0, "frustrated": 1, "neutral": 2, "positive": 3}
PAGE_SIZE = 300  # ZCQL returns at most 300 rows per query


def sort_tickets(tickets):
    # urgency first, then sentiment; if both are equal, newest first
    tickets = sorted(tickets, key=lambda t: t["created_time"], reverse=True)
    return sorted(tickets, key=lambda t: (URGENCY_ORDER.get(t["urgency"], 9),
                                          SENTIMENT_ORDER.get(t["sentiment"], 9)))


def list_tickets():
    try:
        zcql = zcatalyst_sdk.initialize(scope="admin").zcql()
        rows, offset = [], 0
        while True:
            page = zcql.execute_query(
                f"SELECT ROWID, CREATEDTIME, order_id, customer_name, issue_category, "
                f"urgency, sentiment, summary FROM {TABLE} LIMIT {offset}, {PAGE_SIZE}")
            # ZCQL wraps each row: [{"SupportTickets": {...}}, ...]
            rows += [r[TABLE] for r in page]
            if len(page) < PAGE_SIZE:
                break
            offset += PAGE_SIZE
    except Exception:
        logger.exception("Reading tickets failed")
        return send({"error": "Could not load tickets."}, 502)

    tickets = [{
        "id": r["ROWID"],
        "created_time": r["CREATEDTIME"],
        "order_id": r["order_id"],
        "customer_name": r["customer_name"],
        "issue_category": r["issue_category"],
        "urgency": r["urgency"],
        "sentiment": r["sentiment"],
        "summary": r["summary"],
    } for r in rows]
    return send({"tickets": sort_tickets(tickets)})


def handler(request: Request):
    if request.path == "/chat":
        if request.method != "POST":
            return send({"error": "Use POST"}, 405)
        return chat(request)

    if request.path == "/tickets":
        if request.method != "GET":
            return send({"error": "Use GET"}, 405)
        return list_tickets()

    return send({"error": "Unknown path"}, 404)
