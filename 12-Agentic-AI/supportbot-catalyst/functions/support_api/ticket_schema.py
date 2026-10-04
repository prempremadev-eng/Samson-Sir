from typing import Literal, Optional
from pydantic import BaseModel


class SupportTicket(BaseModel):
    order_id: Optional[str] = None
    customer_name: Optional[str] = None
    issue_category: Literal["shipping", "billing", "defect", "other"]
    urgency: Literal["low", "medium", "high", "critical"]
    sentiment: Literal["positive", "neutral", "frustrated", "angry"]
    summary: str
