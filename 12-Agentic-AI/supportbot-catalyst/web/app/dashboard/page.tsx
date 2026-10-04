"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertCircle, AlertTriangle, CalendarDays, Frown, Inbox, RefreshCw, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryLabel, SentimentBadge, UrgencyBadge } from "@/components/ticket-badges";
import { getTickets, type Ticket } from "@/lib/api";
import { formatCreated } from "@/lib/labels";

function StatCard({ icon: Icon, label, value, tone }: { icon: LucideIcon; label: string; value: number | string; tone: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-white p-3 shadow-sm sm:gap-4 sm:p-4">
      <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg sm:size-10 ${tone}`}>
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
        <p className="text-2xl font-semibold tabular-nums">{value}</p>
      </div>
    </div>
  );
}

// Today's date in India time, e.g. "2026-10-04" (CREATEDTIME is India time too).
function todayIST() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

export default function DashboardPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTickets(); // already sorted by the server
      setTickets(data.tickets);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load tickets");
    } finally {
      setLoading(false);
    }
  }, []);

  // First load when the page opens. loading already starts as true, so we
  // only set state after the request finishes.
  useEffect(() => {
    getTickets()
      .then((data) => setTickets(data.tickets))
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load tickets"))
      .finally(() => setLoading(false));
  }, []);

  const today = todayIST();
  const stats = {
    total: tickets.length,
    urgent: tickets.filter((t) => t.urgency === "critical" || t.urgency === "high").length,
    upset: tickets.filter((t) => t.sentiment === "angry" || t.sentiment === "frustrated").length,
    today: tickets.filter((t) => t.created_time.startsWith(today)).length,
  };
  const show = (n: number) => (loading ? "–" : n);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 p-4 lg:py-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Support tickets</h1>
          <p className="mt-1 text-sm text-slate-500">
            Sorted by urgency, then by how upset the customer is.
          </p>
        </div>
        <Button variant="outline" onClick={load} disabled={loading}>
          <RefreshCw className={loading ? "animate-spin" : ""} />
          Refresh
        </Button>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Inbox} label="Total tickets" value={show(stats.total)} tone="bg-primary/10 text-primary" />
        <StatCard icon={AlertTriangle} label="Critical + high" value={show(stats.urgent)} tone="bg-red-50 text-red-600" />
        <StatCard icon={Frown} label="Upset customers" value={show(stats.upset)} tone="bg-amber-50 text-amber-600" />
        <StatCard icon={CalendarDays} label="Created today" value={show(stats.today)} tone="bg-emerald-50 text-emerald-600" />
      </div>

      {error && (
        <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-600" />
          <div>
            <p className="font-semibold text-red-900">Could not load tickets</p>
            <p className="text-red-800/80">{error}</p>
          </div>
        </div>
      )}

      {/* Phones: one card per ticket (a 7-column table does not fit) */}
      <div className="space-y-3 md:hidden">
        {loading &&
          tickets.length === 0 &&
          [0, 1, 2].map((i) => (
            <div key={i} className="h-36 animate-pulse rounded-xl border bg-white" />
          ))}

        {!loading && !error && tickets.length === 0 && (
          <div className="rounded-xl border bg-white py-12 text-center shadow-sm">
            <Inbox className="mx-auto mb-2 size-8 text-slate-300" />
            <p className="font-medium">No tickets yet</p>
            <p className="text-sm text-slate-500">Finish a chat to create the first one.</p>
          </div>
        )}

        {tickets.map((t) => (
          <article key={t.id} className="space-y-3 rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                <UrgencyBadge urgency={t.urgency} />
                <SentimentBadge sentiment={t.sentiment} />
              </div>
              <span className="shrink-0 text-xs text-slate-500">{formatCreated(t.created_time)}</span>
            </div>
            <p className="text-sm text-slate-800">{t.summary}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-3 text-sm">
              <CategoryLabel category={t.issue_category} />
              <span className="font-mono text-xs text-slate-700">{t.order_id ?? "—"}</span>
              {t.customer_name && <span className="text-slate-700">{t.customer_name}</span>}
            </div>
          </article>
        ))}
      </div>

      {/* Tablets and computers: the full table */}
      <div className="hidden overflow-hidden rounded-xl border bg-white shadow-sm md:block">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="pl-5">Urgency</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Order / account</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="w-[38%]">Summary</TableHead>
              <TableHead className="pr-5">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading &&
              tickets.length === 0 &&
              [0, 1, 2].map((i) => (
                <TableRow key={i}>
                  {[16, 20, 20, 24, 16, 64, 28].map((w, j) => (
                    <TableCell key={j} className={j === 0 ? "pl-5" : ""}>
                      <div className="h-4 animate-pulse rounded bg-slate-100" style={{ width: `${w * 4}px` }} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!loading && !error && tickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center">
                  <Inbox className="mx-auto mb-2 size-8 text-slate-300" />
                  <p className="font-medium">No tickets yet</p>
                  <p className="text-sm text-slate-500">Finish a chat to create the first one.</p>
                </TableCell>
              </TableRow>
            )}

            {tickets.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="pl-5"><UrgencyBadge urgency={t.urgency} /></TableCell>
                <TableCell><SentimentBadge sentiment={t.sentiment} /></TableCell>
                <TableCell><CategoryLabel category={t.issue_category} /></TableCell>
                <TableCell className="font-mono text-xs text-slate-700">{t.order_id ?? "—"}</TableCell>
                <TableCell className="text-slate-700">{t.customer_name ?? "—"}</TableCell>
                <TableCell className="whitespace-normal">
                  <p className="line-clamp-2 text-slate-700" title={t.summary}>{t.summary}</p>
                </TableCell>
                <TableCell className="whitespace-nowrap pr-5 text-xs text-slate-500">
                  {formatCreated(t.created_time)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
