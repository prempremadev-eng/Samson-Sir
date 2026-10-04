// Talks to the Catalyst function. The URL comes from .env.local.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export type Role = "user" | "assistant";

export type Message = {
  role: Role;
  content: string;
};

// Same fields as SupportTicket in ticket_schema.py, plus what the Data Store adds.
export type Ticket = {
  id: string;
  created_time: string; // India time, e.g. "2026-10-04 15:45:41:300"
  order_id: string | null;
  customer_name: string | null;
  issue_category: "shipping" | "billing" | "defect" | "other";
  urgency: "low" | "medium" | "high" | "critical";
  sentiment: "positive" | "neutral" | "frustrated" | "angry";
  summary: string;
};

export type ChatResponse = {
  reply: string;
  ready: boolean;
  ticket?: Ticket | null;
  ticket_error?: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_API_BASE is not set. Copy .env.example to .env.local.");
  }
  const res = await fetch(`${API_BASE}${path}`, init);
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.error ?? `Request failed (${res.status})`);
  }
  return data as T;
}

// The function has no memory, so we always send the FULL conversation.
export function sendChat(messages: Message[]) {
  return request<ChatResponse>("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
}

export function getTickets() {
  return request<{ tickets: Ticket[] }>("/tickets");
}
