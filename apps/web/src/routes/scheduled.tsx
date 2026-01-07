import { createFileRoute } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export const Route = createFileRoute("/scheduled")({
	component: RouteComponent,
});

const upcomingAudits = [
	{
		id: "AUD-009",
		name: "Annual Financial Audit",
		template: "Financial Audit Template",
		scheduledDate: "2025-01-15",
		estimatedDuration: "2 weeks",
		assignedTo: "John Smith",
		priority: "high",
		recurrence: "none",
		status: "scheduled",
	},
	{
		id: "AUD-010",
		name: "Quarterly Compliance Check",
		template: "Compliance Checklist",
		scheduledDate: "2025-01-18",
		estimatedDuration: "3 days",
		assignedTo: "Sarah Johnson",
		priority: "medium",
		recurrence: "quarterly",
		status: "scheduled",
	},
	{
		id: "AUD-011",
		name: "Security Assessment",
		template: "Security Audit Framework",
		scheduledDate: "2025-01-22",
		estimatedDuration: "1 week",
		assignedTo: "Mike Davis",
		priority: "high",
		recurrence: "monthly",
		status: "scheduled",
	},
	{
		id: "AUD-012",
		name: "Operations Review",
		template: "Operational Audit Template",
		scheduledDate: "2025-01-25",
		estimatedDuration: "5 days",
		assignedTo: "Emily Brown",
		priority: "low",
		recurrence: "none",
		status: "scheduled",
	},
];

const recurringAudits = [
	{
		id: "AUD-013",
		name: "Weekly Compliance Review",
		template: "Quick Compliance Check",
		recurrence: "weekly",
		nextRun: "2025-01-13",
		assignedTo: "John Smith",
		status: "active",
		totalRuns: 24,
	},
	{
		id: "AUD-014",
		name: "Monthly Financial Review",
		template: "Monthly Financial Template",
		recurrence: "monthly",
		nextRun: "2025-02-01",
		assignedTo: "Sarah Johnson",
		status: "active",
		totalRuns: 12,
	},
	{
		id: "AUD-015",
		name: "Quarterly Security Audit",
		template: "Security Audit Framework",
		recurrence: "quarterly",
		nextRun: "2025-04-01",
		assignedTo: "Mike Davis",
		status: "paused",
		totalRuns: 8,
	},
];

const auditQueue = [
	{
		id: "AUD-016",
		name: "IT Infrastructure Audit",
		status: "queued",
		position: 1,
		estimatedStart: "2025-01-14 09:00",
		estimatedDuration: "6 hours",
		dependencies: [],
	},
	{
		id: "AUD-017",
		name: "Vendor Assessment",
		status: "queued",
		position: 2,
		estimatedStart: "2025-01-14 15:00",
		estimatedDuration: "4 hours",
		dependencies: ["AUD-016"],
	},
	{
		id: "AUD-018",
		name: "Data Privacy Review",
		status: "queued",
		position: 3,
		estimatedStart: "2025-01-15 10:00",
		estimatedDuration: "3 hours",
		dependencies: ["AUD-016"],
	},
];

function RouteComponent() {
	return (
		<div className="p-6 space-y-6">
			<div className="space-y-2">
				<h1 className="text-2xl font-semibold">Scheduled Audits</h1>
				<p className="text-muted-foreground text-sm">
					Manage scheduled and recurring audit activities
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader>
						<CardTitle>Upcoming</CardTitle>
						<CardDescription>Scheduled this month</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">24</div>
						<p className="text-muted-foreground text-xs mt-2">
							Next: <span className="text-primary">Jan 15</span>
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Recurring</CardTitle>
						<CardDescription>Automated schedules</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">8</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">6</span> active, 2 paused
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>In Queue</CardTitle>
						<CardDescription>Waiting to start</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">3</div>
						<p className="text-muted-foreground text-xs mt-2">
							Starting in{" "}
							<span className="text-primary">2 days</span>
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Completed</CardTitle>
						<CardDescription>Past scheduled audits</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">156</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">98.7%</span> on-time rate
						</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Schedule New Audit</CardTitle>
					<CardDescription>
						Create one-time or recurring audit schedules
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-4">
						<div className="space-y-2">
							<Label htmlFor="audit-name">Audit Name</Label>
							<Input
								id="audit-name"
								placeholder="Enter audit name"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="template">Template</Label>
							<Select>
								<SelectTrigger id="template">
									<SelectValue placeholder="Select template" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="financial">
										Financial Audit Template
									</SelectItem>
									<SelectItem value="compliance">
										Compliance Checklist
									</SelectItem>
									<SelectItem value="security">
										Security Audit Framework
									</SelectItem>
									<SelectItem value="operational">
										Operational Audit Template
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="schedule-date">Schedule Date</Label>
							<Input id="schedule-date" type="date" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="recurrence">Recurrence</Label>
							<Select>
								<SelectTrigger id="recurrence">
									<SelectValue placeholder="One-time" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="none">One-time</SelectItem>
									<SelectItem value="daily">Daily</SelectItem>
									<SelectItem value="weekly">Weekly</SelectItem>
									<SelectItem value="biweekly">
										Bi-weekly
									</SelectItem>
									<SelectItem value="monthly">Monthly</SelectItem>
									<SelectItem value="quarterly">
										Quarterly
									</SelectItem>
									<SelectItem value="yearly">Yearly</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="flex gap-2 mt-4">
						<Button>Schedule Audit</Button>
						<Button variant="outline">Save as Template</Button>
					</div>
				</CardContent>
			</Card>

			<Tabs defaultValue="upcoming">
				<TabsList>
					<TabsTrigger value="upcoming">Upcoming</TabsTrigger>
					<TabsTrigger value="recurring">Recurring</TabsTrigger>
					<TabsTrigger value="queue">Queue</TabsTrigger>
					<TabsTrigger value="calendar">Calendar</TabsTrigger>
				</TabsList>

				<TabsContent value="upcoming" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Upcoming Audits</CardTitle>
							<CardDescription>
								Scheduled audits sorted by date
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Audit ID</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Template</TableHead>
										<TableHead>Scheduled Date</TableHead>
										<TableHead>Duration</TableHead>
										<TableHead>Assigned To</TableHead>
										<TableHead>Priority</TableHead>
										<TableHead>Recurrence</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{upcomingAudits.map((audit) => (
										<TableRow key={audit.id}>
											<TableCell className="font-medium">
												{audit.id}
											</TableCell>
											<TableCell>{audit.name}</TableCell>
											<TableCell>{audit.template}</TableCell>
											<TableCell>{audit.scheduledDate}</TableCell>
											<TableCell>
												{audit.estimatedDuration}
											</TableCell>
											<TableCell>{audit.assignedTo}</TableCell>
											<TableCell>
												{audit.priority === "high" && (
													<Badge variant="destructive">
														High
													</Badge>
												)}
												{audit.priority === "medium" && (
													<Badge variant="default">
														Medium
													</Badge>
												)}
												{audit.priority === "low" && (
													<Badge variant="outline">
														Low
													</Badge>
												)}
											</TableCell>
											<TableCell>
												{audit.recurrence !== "none" ? (
													<Badge variant="secondary">
														{audit.recurrence}
													</Badge>
												) : (
													<Badge variant="outline">
														One-time
													</Badge>
												)}
											</TableCell>
											<TableCell>
												<div className="flex gap-1">
													<Button
														variant="ghost"
														size="sm"
													>
														Edit
													</Button>
													<Button
														variant="ghost"
														size="sm"
													>
														Start
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="recurring" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Recurring Audits</CardTitle>
							<CardDescription>
								Automated audits that run on a schedule
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Audit ID</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Template</TableHead>
										<TableHead>Recurrence</TableHead>
										<TableHead>Next Run</TableHead>
										<TableHead>Assigned To</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Total Runs</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{recurringAudits.map((audit) => (
										<TableRow key={audit.id}>
											<TableCell className="font-medium">
												{audit.id}
											</TableCell>
											<TableCell>{audit.name}</TableCell>
											<TableCell>{audit.template}</TableCell>
											<TableCell>
												<Badge variant="secondary">
													{audit.recurrence}
												</Badge>
											</TableCell>
											<TableCell>{audit.nextRun}</TableCell>
											<TableCell>{audit.assignedTo}</TableCell>
											<TableCell>
												{audit.status === "active" ? (
													<Badge variant="default">
														Active
													</Badge>
												) : (
													<Badge variant="outline">
														Paused
													</Badge>
												)}
											</TableCell>
											<TableCell>{audit.totalRuns}</TableCell>
											<TableCell>
												<div className="flex gap-1">
													<Button
														variant="ghost"
														size="sm"
													>
														Edit
													</Button>
													{audit.status === "active" ? (
														<Button
															variant="ghost"
															size="sm"
														>
															Pause
														</Button>
													) : (
														<Button
															variant="ghost"
															size="sm"
														>
															Resume
														</Button>
													)}
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="queue" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Audit Queue</CardTitle>
							<CardDescription>
								Audits waiting to start with dependencies
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Position</TableHead>
										<TableHead>Audit ID</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Est. Start</TableHead>
										<TableHead>Duration</TableHead>
										<TableHead>Dependencies</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{auditQueue.map((audit) => (
										<TableRow key={audit.id}>
											<TableCell>
												<Badge variant="outline">
													#{audit.position}
												</Badge>
											</TableCell>
											<TableCell className="font-medium">
												{audit.id}
											</TableCell>
											<TableCell>{audit.name}</TableCell>
											<TableCell>
												<Badge variant="secondary">
													{audit.status}
												</Badge>
											</TableCell>
											<TableCell>{audit.estimatedStart}</TableCell>
											<TableCell>{audit.estimatedDuration}</TableCell>
											<TableCell>
												{audit.dependencies.length > 0 ? (
													audit.dependencies.map((dep) => (
														<Badge
															key={dep}
															variant="outline"
															className="mr-1"
														>
															{dep}
														</Badge>
													))
												) : (
													<span className="text-muted-foreground text-sm">
														None
													</span>
												)}
											</TableCell>
											<TableCell>
												<div className="flex gap-1">
													<Button
														variant="ghost"
														size="sm"
													>
														Priority
													</Button>
													<Button
														variant="ghost"
														size="sm"
													>
														Remove
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="calendar" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Calendar View</CardTitle>
							<CardDescription>
								Visual overview of scheduled audits
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-center py-12 text-muted-foreground">
								<p>Calendar component will be displayed here</p>
								<p className="text-sm mt-2">
									Integrate a calendar library for full scheduling
									capabilities
								</p>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
