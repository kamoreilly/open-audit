import { createFileRoute, redirect } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getUser } from "@/functions/get-user";

export const Route = createFileRoute("/audits")({
	beforeLoad: async ({ location }) => {
		const session = await getUser();
		if (!session?.user) {
			throw redirect({
				to: "/login",
				search: { redirect: location.href },
			});
		}
		return { session };
	},
	component: RouteComponent,
});

const audits = [
	{
		id: "AUD-001",
		name: "Financial Q4 Review",
		type: "Financial",
		status: "in-progress",
		progress: 75,
		assignedTo: "John Smith",
		createdDate: "2025-01-03",
		dueDate: "2025-01-15",
		priority: "high",
	},
	{
		id: "AUD-002",
		name: "Compliance Check",
		type: "Compliance",
		status: "pending",
		progress: 0,
		assignedTo: "Sarah Johnson",
		createdDate: "2025-01-02",
		dueDate: "2025-01-20",
		priority: "medium",
	},
	{
		id: "AUD-003",
		name: "Security Assessment",
		type: "Security",
		status: "completed",
		progress: 100,
		assignedTo: "Mike Davis",
		createdDate: "2025-01-01",
		dueDate: "2025-01-10",
		priority: "high",
	},
	{
		id: "AUD-004",
		name: "Operations Review",
		type: "Operational",
		status: "failed",
		progress: 60,
		assignedTo: "Emily Brown",
		createdDate: "2024-12-28",
		dueDate: "2025-01-05",
		priority: "high",
	},
	{
		id: "AUD-005",
		name: "IT Infrastructure Audit",
		type: "Technical",
		status: "in-progress",
		progress: 45,
		assignedTo: "David Wilson",
		createdDate: "2024-12-25",
		dueDate: "2025-01-18",
		priority: "medium",
	},
	{
		id: "AUD-006",
		name: "Annual Compliance Review",
		type: "Compliance",
		status: "scheduled",
		progress: 0,
		assignedTo: "John Smith",
		createdDate: "2024-12-20",
		dueDate: "2025-01-25",
		priority: "high",
	},
	{
		id: "AUD-007",
		name: "Quality Assurance Audit",
		type: "Quality",
		status: "scheduled",
		progress: 0,
		assignedTo: "Sarah Johnson",
		createdDate: "2024-12-18",
		dueDate: "2025-02-01",
		priority: "medium",
	},
	{
		id: "AUD-008",
		name: "Vendor Assessment",
		type: "Vendor",
		status: "pending",
		progress: 0,
		assignedTo: "Mike Davis",
		createdDate: "2024-12-15",
		dueDate: "2025-02-10",
		priority: "low",
	},
];

function RouteComponent() {
	return (
		<div className="p-6 space-y-6">
			<div className="space-y-2">
				<h1 className="text-2xl font-semibold">Audits</h1>
				<p className="text-muted-foreground text-sm">
					Manage and track all audit activities
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Filters</CardTitle>
					<CardDescription>
						Search and filter audits by various criteria
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-4">
						<div className="space-y-2">
							<Label htmlFor="search">Search</Label>
							<Input
								id="search"
								placeholder="Search audits..."
								type="search"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="status">Status</Label>
							<Select>
								<SelectTrigger id="status">
									<SelectValue placeholder="All statuses" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Statuses</SelectItem>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="in-progress">In Progress</SelectItem>
									<SelectItem value="completed">Completed</SelectItem>
									<SelectItem value="failed">Failed</SelectItem>
									<SelectItem value="scheduled">Scheduled</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="type">Type</Label>
							<Select>
								<SelectTrigger id="type">
									<SelectValue placeholder="All types" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Types</SelectItem>
									<SelectItem value="financial">Financial</SelectItem>
									<SelectItem value="compliance">Compliance</SelectItem>
									<SelectItem value="security">Security</SelectItem>
									<SelectItem value="operational">Operational</SelectItem>
									<SelectItem value="technical">Technical</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="priority">Priority</Label>
							<Select>
								<SelectTrigger id="priority">
									<SelectValue placeholder="All priorities" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Priorities</SelectItem>
									<SelectItem value="high">High</SelectItem>
									<SelectItem value="medium">Medium</SelectItem>
									<SelectItem value="low">Low</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="flex gap-2 mt-4">
						<Button>Apply Filters</Button>
						<Button variant="outline">Reset</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>All Audits</CardTitle>
							<CardDescription>
								Showing 8 of 1,284 audits
							</CardDescription>
						</div>
						<Button>New Audit</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Audit ID</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Progress</TableHead>
								<TableHead>Assigned To</TableHead>
								<TableHead>Due Date</TableHead>
								<TableHead>Priority</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{audits.map((audit) => (
								<TableRow key={audit.id}>
									<TableCell className="font-medium">{audit.id}</TableCell>
									<TableCell>{audit.name}</TableCell>
									<TableCell>{audit.type}</TableCell>
									<TableCell>
										{audit.status === "in-progress" && (
											<Badge variant="default">In Progress</Badge>
										)}
										{audit.status === "pending" && (
											<Badge variant="secondary">Pending</Badge>
										)}
										{audit.status === "completed" && (
											<Badge variant="outline">Completed</Badge>
										)}
										{audit.status === "failed" && (
											<Badge variant="destructive">Failed</Badge>
										)}
										{audit.status === "scheduled" && (
											<Badge variant="secondary">Scheduled</Badge>
										)}
									</TableCell>
									<TableCell>
										<div className="w-full">
											<Progress value={audit.progress} />
										</div>
									</TableCell>
									<TableCell>{audit.assignedTo}</TableCell>
									<TableCell>{audit.dueDate}</TableCell>
									<TableCell>
										{audit.priority === "high" && (
											<Badge variant="destructive">High</Badge>
										)}
										{audit.priority === "medium" && (
											<Badge variant="default">Medium</Badge>
										)}
										{audit.priority === "low" && (
											<Badge variant="outline">Low</Badge>
										)}
									</TableCell>
									<TableCell>
										<Button variant="ghost" size="sm">
											View
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
