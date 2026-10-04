from ticket_schema import SupportTicket

ticket = SupportTicket(
    order_id="ORD-45821",
    issue_category="shipping",
    urgency="critical",
    sentiment="frustrated",
    summary="Order not arrived after 5 days, needed urgently.",
)

print(ticket.model_dump_json(indent=2))

