import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Ticket } from "@/lib/api";
import { formatCreated, sentimentColor, urgencyColor } from "@/lib/labels";

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <Card className="border-green-300">
      <CardHeader>
        <CardTitle>Ticket created</CardTitle>
        <CardDescription>
          #{ticket.id} · {formatCreated(ticket.created_time)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="capitalize">{ticket.issue_category}</Badge>
          <Badge className={`capitalize ${urgencyColor[ticket.urgency]}`}>
            urgency: {ticket.urgency}
          </Badge>
          <Badge className={`capitalize ${sentimentColor[ticket.sentiment]}`}>
            {ticket.sentiment}
          </Badge>
        </div>
        <dl className="grid grid-cols-[8rem_1fr] gap-y-1">
          <dt className="text-muted-foreground">Order / account</dt>
          <dd>{ticket.order_id ?? "—"}</dd>
          <dt className="text-muted-foreground">Customer</dt>
          <dd>{ticket.customer_name ?? "—"}</dd>
          <dt className="text-muted-foreground">Summary</dt>
          <dd>{ticket.summary}</dd>
        </dl>
      </CardContent>
    </Card>
  );
}
