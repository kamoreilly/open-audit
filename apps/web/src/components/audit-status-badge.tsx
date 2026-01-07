import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AuditStatus =
	| "pending"
	| "in-progress"
	| "completed"
	| "failed"
	| "scheduled"
	| "cancelled";

interface AuditStatusBadgeProps {
	status: AuditStatus;
}

const statusConfig: Record<
	AuditStatus,
	{ variant: "default" | "secondary" | "destructive" | "outline"; label: string }
> = {
	pending: { variant: "secondary", label: "Pending" },
	"in-progress": { variant: "default", label: "In Progress" },
	completed: { variant: "outline", label: "Completed" },
	failed: { variant: "destructive", label: "Failed" },
	scheduled: { variant: "secondary", label: "Scheduled" },
	cancelled: { variant: "outline", label: "Cancelled" },
};

export function AuditStatusBadge({ status }: AuditStatusBadgeProps) {
	const config = statusConfig[status];

	return <Badge variant={config.variant}>{config.label}</Badge>;
}
