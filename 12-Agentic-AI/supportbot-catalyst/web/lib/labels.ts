import type { Ticket } from "@/lib/api";

// Badge colours, used by the chat page ticket card and the dashboard.
export const urgencyColor: Record<Ticket["urgency"], string> = {
  critical: "bg-red-600 text-white",
  high: "bg-orange-500 text-white",
  medium: "bg-yellow-300 text-yellow-950",
  low: "bg-green-200 text-green-900",
};

export const sentimentColor: Record<Ticket["sentiment"], string> = {
  angry: "bg-red-100 text-red-800",
  frustrated: "bg-orange-100 text-orange-800",
  neutral: "bg-gray-100 text-gray-800",
  positive: "bg-green-100 text-green-800",
};

// CREATEDTIME is India time with no timezone marker, so we only reformat the
// text. Parsing it with new Date() would treat it as UTC and be 5.5 hours off.
export function formatCreated(created: string) {
  return `${created.slice(0, 16)} IST`; // "2026-10-04 15:45 IST"
}
