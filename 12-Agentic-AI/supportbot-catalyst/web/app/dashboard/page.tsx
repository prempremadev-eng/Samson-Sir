"use client";

import { useCallback, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTickets, type Ticket } from "@/lib/api";
import { formatCreated, sentimentColor, urgencyColor } from "@/lib/labels";

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

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-4 p-4">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Tickets</h1>
          <p className="text-sm text-muted-foreground">
            Most urgent first, then angriest customers first.
          </p>
        </div>
        <Button variant="outline" onClick={load} disabled={loading}>
          {loading ? "Loading…" : "Refresh"}
        </Button>
      </header>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Could not load tickets</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Urgency</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Order / account</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="w-[40%]">Summary</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!loading && !error && tickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No tickets yet. Finish a chat to create one.
                </TableCell>
              </TableRow>
            )}
            {tickets.map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  <Badge className={`capitalize ${urgencyColor[t.urgency]}`}>{t.urgency}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={`capitalize ${sentimentColor[t.sentiment]}`}>{t.sentiment}</Badge>
                </TableCell>
                <TableCell className="capitalize">{t.issue_category}</TableCell>
                <TableCell>{t.order_id ?? "—"}</TableCell>
                <TableCell>{t.customer_name ?? "—"}</TableCell>
                <TableCell className="whitespace-normal">{t.summary}</TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
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
