import { cn } from "@/lib/utils";

type TripStatus = "not_started" | "active" | "completed" | "cancelled";

interface TripStatusBadgeProps {
  status: TripStatus;
  className?: string;
}

const statusConfig: Record<TripStatus, { label: string; className: string }> = {
  not_started: {
    label: "Not Started",
    className: "bg-secondary text-secondary-foreground",
  },
  active: {
    label: "Active",
    className: "bg-success/15 text-success border border-success/20",
  },
  completed: {
    label: "Completed",
    className: "bg-primary/15 text-primary border border-primary/20",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/15 text-destructive border border-destructive/20",
  },
};

const TripStatusBadge = ({ status, className }: TripStatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
        config.className,
        className
      )}
    >
      {status === "active" && (
        <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
      )}
      {config.label}
    </span>
  );
};

export default TripStatusBadge;
export type { TripStatus };
