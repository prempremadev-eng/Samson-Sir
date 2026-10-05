from typing import Literal, Optional
from pydantic import BaseModel


class SupportTicket(BaseModel):
    order_id: Optional[str] = None
    customer_name: Optional[str] = None
    issue_category: Literal["shipping", "billing", "defect", "other"]
    urgency: Literal["low", "medium", "high", "critical"]
    sentiment: Literal["positive", "neutral", "frustrated", "angry"]
    summary: str


good = SupportTicket(
    issue_category="shipping",
    urgency="high",
    sentiment="neutral",
    summary="Order has not arrived.",
)
print(good)

bad = SupportTicket(
    issue_category="shipping",
    urgency="emergency",
    sentiment="neutral",
    summary="Order has not arrived.",
)
