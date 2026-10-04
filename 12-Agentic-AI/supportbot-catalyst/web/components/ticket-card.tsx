import { CircleCheck } from "lucide-react";
import { CategoryLabel, SentimentBadge, UrgencyBadge } from "@/components/ticket-badges";
import type { Ticket } from "@/lib/api";
import { formatCreated } from "@/lib/labels";

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-sm">
      <div className="flex items-start gap-3 border-b border-emerald-100 bg-emerald-50 px-5 py-4">
        <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" />
        <div>
          <p className="font-semibold text-emerald-900">Ticket created</p>
          <p className="text-sm text-emerald-800/80">
            Our team will follow up. Reference #{ticket.id} · {formatCreated(ticket.created_time)}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 px-5 py-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Category</dt>
          <dd className="mt-1"><CategoryLabel category={ticket.issue_category} /></dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Urgency</dt>
          <dd className="mt-1"><UrgencyBadge urgency={ticket.urgency} /></dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Sentiment</dt>
          <dd className="mt-1"><SentimentBadge sentiment={ticket.sentiment} /></dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Order / account</dt>
          <dd className="mt-1 font-mono text-slate-800">{ticket.order_id ?? "—"}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Customer</dt>
          <dd className="mt-1 text-slate-800">{ticket.customer_name ?? "—"}</dd>
        </div>
        <div className="sm:col-span-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Summary</dt>
          <dd className="mt-1 text-slate-800">{ticket.summary}</dd>
        </div>
      </dl>
    </div>
  );
}
