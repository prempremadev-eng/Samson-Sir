import { CircleHelp, CreditCard, PackageX, Truck, type LucideIcon } from "lucide-react";
import type { Ticket } from "@/lib/api";
import { sentimentStyle, urgencyStyle } from "@/lib/labels";

function DotBadge({ label, badge, dot }: { label: string; badge: string; dot: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${badge}`}
    >
      <span className={`size-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

export function UrgencyBadge({ urgency }: { urgency: Ticket["urgency"] }) {
  return <DotBadge label={urgency} {...urgencyStyle[urgency]} />;
}

export function SentimentBadge({ sentiment }: { sentiment: Ticket["sentiment"] }) {
  return <DotBadge label={sentiment} {...sentimentStyle[sentiment]} />;
}

const categoryIcon: Record<Ticket["issue_category"], LucideIcon> = {
  shipping: Truck,
  billing: CreditCard,
  defect: PackageX,
  other: CircleHelp,
};

export function CategoryLabel({ category }: { category: Ticket["issue_category"] }) {
  const Icon = categoryIcon[category];
  return (
    <span className="inline-flex items-center gap-1.5 capitalize text-slate-700">
      <Icon className="size-4 text-slate-400" />
      {category}
    </span>
  );
}
