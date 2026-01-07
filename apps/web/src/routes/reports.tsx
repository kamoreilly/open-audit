import { createFileRoute, redirect } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getUser } from "@/functions/get-user";

export const Route = createFileRoute("/reports")({
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

const recentReports = [
	{
		id: "RPT-001",
		name: "Monthly Audit Summary",
		type: "Summary",
		createdAt: "2025-01-05",
		createdBy: "John Smith",
		status: "completed",
		auditsCovered: 45,
	},
	{
		id: "RPT-002",
		name: "Compliance Status Report",
		type: "Compliance",
		createdAt: "2025-01-04",
		createdBy: "Sarah Johnson",
		status: "completed",
		auditsCovered: 12,
	},
	{
		id: "RPT-003",
		name: "Financial Audit Analysis",
		type: "Financial",
		createdAt: "2025-01-03",
		createdBy: "Mike Davis",
		status: "in-progress",
		auditsCovered: 8,
	},
	{
		id: "RPT-004",
		name: "Risk Assessment Report",
		type: "Risk",
		createdAt: "2025-01-02",
		createdBy: "Emily Brown",
		status: "completed",
		auditsCovered: 23,
	},
];

const auditMetrics = [
	{ category: "Financial", completed: 145, pending: 12, failed: 3 },
	{ category: "Compliance", completed: 89, pending: 8, failed: 1 },
	{ category: "Security", completed: 67, pending: 15, failed: 5 },
	{ category: "Operational", completed: 234, pending: 22, failed: 8 },
	{ category: "Technical", completed: 156, pending: 18, failed: 4 },
];

function RouteComponent() {
	return (
		<div className="p-6 space-y-6">
			<div className="space-y-2">
				<h1 className="text-2xl font-semibold">Reports</h1>
				<p className="text-muted-foreground text-sm">
					Generate and analyze audit reports
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader>
						<CardTitle>Total Reports</CardTitle>
						<CardDescription>All generated reports</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">256</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">+8%</span> from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Completed</CardTitle>
						<CardDescription>Successfully generated</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">241</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">94.1%</span> completion rate
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>In Progress</CardTitle>
						<CardDescription>Currently generating</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">12</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">3</span> queued for generation
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Failed</CardTitle>
						<CardDescription>Generation errors</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">3</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-destructive">+2</span> from last week
						</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Generate New Report</CardTitle>
					<CardDescription>
						Create custom reports with filters and parameters
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-3">
						<div className="space-y-2">
							<label
								htmlFor="report-type"
								className="text-sm font-medium"
							>
								Report Type
							</label>
							<Select>
								<SelectTrigger id="report-type">
									<SelectValue placeholder="Select report type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="summary">Summary Report</SelectItem>
									<SelectItem value="detailed">
										Detailed Analysis
									</SelectItem>
									<SelectItem value="compliance">
										Compliance Status
									</SelectItem>
									<SelectItem value="financial">
										Financial Audit
									</SelectItem>
									<SelectItem value="risk">Risk Assessment</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<label
								htmlFor="date-range"
								className="text-sm font-medium"
							>
								Date Range
							</label>
							<Select>
								<SelectTrigger id="date-range">
									<SelectValue placeholder="Select date range" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="7d">Last 7 days</SelectItem>
									<SelectItem value="30d">Last 30 days</SelectItem>
									<SelectItem value="90d">Last 90 days</SelectItem>
									<SelectItem value="1y">Last year</SelectItem>
									<SelectItem value="custom">Custom range</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<label
								htmlFor="format"
								className="text-sm font-medium"
							>
								Export Format
							</label>
							<Select>
								<SelectTrigger id="format">
									<SelectValue placeholder="Select format" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="pdf">PDF</SelectItem>
									<SelectItem value="excel">Excel</SelectItem>
									<SelectItem value="csv">CSV</SelectItem>
									<SelectItem value="json">JSON</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="flex gap-2 mt-4">
						<Button>Generate Report</Button>
						<Button variant="outline">Schedule Report</Button>
					</div>
				</CardContent>
			</Card>

			<Tabs defaultValue="recent">
				<TabsList>
					<TabsTrigger value="recent">Recent Reports</TabsTrigger>
					<TabsTrigger value="metrics">Audit Metrics</TabsTrigger>
					<TabsTrigger value="scheduled">Scheduled</TabsTrigger>
				</TabsList>

				<TabsContent value="recent" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Recent Reports</CardTitle>
							<CardDescription>
								Latest generated reports and their status
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Report ID</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Type</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Audits Covered</TableHead>
										<TableHead>Created By</TableHead>
										<TableHead>Created Date</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{recentReports.map((report) => (
										<TableRow key={report.id}>
											<TableCell className="font-medium">
												{report.id}
											</TableCell>
											<TableCell>{report.name}</TableCell>
											<TableCell>{report.type}</TableCell>
											<TableCell>
												{report.status === "completed" && (
													<Badge variant="outline">
														Completed
													</Badge>
												)}
												{report.status === "in-progress" && (
													<Badge variant="default">
														In Progress
													</Badge>
												)}
											</TableCell>
											<TableCell>{report.auditsCovered}</TableCell>
											<TableCell>{report.createdBy}</TableCell>
											<TableCell>{report.createdAt}</TableCell>
											<TableCell>
												<Button variant="ghost" size="sm">
													Download
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="metrics" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Audit Metrics by Category</CardTitle>
							<CardDescription>
								Overview of audit completion rates across different
								categories
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								{auditMetrics.map((metric) => {
									const total =
										metric.completed + metric.pending + metric.failed;
									const completionRate = (metric.completed / total) * 100;
									return (
										<div
											key={metric.category}
											className="space-y-2"
										>
											<div className="flex items-center justify-between">
												<span className="font-medium">
													{metric.category}
												</span>
												<span className="text-muted-foreground text-sm">
													{metric.completed} / {total} completed
												</span>
											</div>
											<Progress value={completionRate} />
											<div className="flex gap-4 text-sm">
												<span className="text-muted-foreground">
													<Badge variant="outline" className="mr-1">
														{metric.completed}
													</Badge>
													Completed
												</span>
												<span className="text-muted-foreground">
													<Badge
														variant="secondary"
														className="mr-1"
													>
														{metric.pending}
													</Badge>
													Pending
												</span>
												<span className="text-muted-foreground">
													<Badge
														variant="destructive"
														className="mr-1"
													>
														{metric.failed}
													</Badge>
													Failed
												</span>
											</div>
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="scheduled" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Scheduled Reports</CardTitle>
							<CardDescription>
								Automated reports scheduled for generation
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Report Name</TableHead>
										<TableHead>Type</TableHead>
										<TableHead>Frequency</TableHead>
										<TableHead>Next Run</TableHead>
										<TableHead>Recipients</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">
											Weekly Audit Summary
										</TableCell>
										<TableCell>Summary</TableCell>
										<TableCell>Weekly</TableCell>
										<TableCell>2025-01-13</TableCell>
										<TableCell>
											<Badge variant="outline">+5</Badge>
										</TableCell>
										<TableCell>
											<Badge variant="default">Active</Badge>
										</TableCell>
										<TableCell>
											<Button variant="ghost" size="sm">
												Edit
											</Button>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Monthly Compliance Report
										</TableCell>
										<TableCell>Compliance</TableCell>
										<TableCell>Monthly</TableCell>
										<TableCell>2025-02-01</TableCell>
										<TableCell>
											<Badge variant="outline">+12</Badge>
										</TableCell>
										<TableCell>
											<Badge variant="default">Active</Badge>
										</TableCell>
										<TableCell>
											<Button variant="ghost" size="sm">
												Edit
											</Button>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Quarterly Financial Audit
										</TableCell>
										<TableCell>Financial</TableCell>
										<TableCell>Quarterly</TableCell>
										<TableCell>2025-04-01</TableCell>
										<TableCell>
											<Badge variant="outline">+8</Badge>
										</TableCell>
										<TableCell>
											<Badge variant="secondary">Paused</Badge>
										</TableCell>
										<TableCell>
											<Button variant="ghost" size="sm">
												Edit
											</Button>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
