import type { Ticket } from "@/lib/api";

// Badge colours, used by the chat page ticket card and the dashboard.
// Each entry: badge background/text/border + the small dot colour.
export const urgencyStyle: Record<Ticket["urgency"], { badge: string; dot: string }> = {
  critical: { badge: "bg-red-50 text-red-700 ring-red-200", dot: "bg-red-500" },
  high: { badge: "bg-orange-50 text-orange-700 ring-orange-200", dot: "bg-orange-500" },
  medium: { badge: "bg-amber-50 text-amber-700 ring-amber-200", dot: "bg-amber-400" },
  low: { badge: "bg-emerald-50 text-emerald-700 ring-emerald-200", dot: "bg-emerald-500" },
};

export const sentimentStyle: Record<Ticket["sentiment"], { badge: string; dot: string }> = {
  angry: { badge: "bg-rose-50 text-rose-700 ring-rose-200", dot: "bg-rose-500" },
  frustrated: { badge: "bg-amber-50 text-amber-800 ring-amber-200", dot: "bg-amber-500" },
  neutral: { badge: "bg-slate-50 text-slate-700 ring-slate-200", dot: "bg-slate-400" },
  positive: { badge: "bg-emerald-50 text-emerald-700 ring-emerald-200", dot: "bg-emerald-500" },
};

// CREATEDTIME is India time with no timezone marker, so we only reformat the
// text. Parsing it with new Date() would treat it as UTC and be 5.5 hours off.
export function formatCreated(created: string) {
  return `${created.slice(0, 16)} IST`; // "2026-10-04 15:45 IST"
}
