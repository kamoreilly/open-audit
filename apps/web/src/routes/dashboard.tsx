import { createFileRoute, redirect } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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

export const Route = createFileRoute("/dashboard")({
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

function RouteComponent() {
	return (
		<div className="p-6 space-y-6">
			<div className="space-y-2">
				<h1 className="text-2xl font-semibold">Dashboard</h1>
				<p className="text-muted-foreground text-sm">
					Welcome back! Here is an overview of your audit activities.
				</p>
			</div>

			<Separator />

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader>
						<CardTitle>Total Audits</CardTitle>
						<CardDescription>All time audit records</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">1,284</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">+12%</span> from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Pending</CardTitle>
						<CardDescription>Awaiting review</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">47</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-destructive">+5</span> from last week
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>In Progress</CardTitle>
						<CardDescription>Currently being audited</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">23</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">+3</span> started today
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Completed</CardTitle>
						<CardDescription>Successfully finished</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">1,214</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">94.5%</span> completion rate
						</p>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="recent">
				<TabsList>
					<TabsTrigger value="recent">Recent Audits</TabsTrigger>
					<TabsTrigger value="scheduled">Scheduled</TabsTrigger>
					<TabsTrigger value="templates">Templates</TabsTrigger>
				</TabsList>

				<TabsContent value="recent" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Recent Audit Activity</CardTitle>
							<CardDescription>
								Latest audit records and their current status
							</CardDescription>
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
										<TableHead>Last Updated</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">AUD-001</TableCell>
										<TableCell>Financial Q4 Review</TableCell>
										<TableCell>Financial</TableCell>
										<TableCell>
											<Badge variant="default">In Progress</Badge>
										</TableCell>
										<TableCell>
											<div className="w-full">
												<Progress value={75} />
											</div>
										</TableCell>
										<TableCell>2 hours ago</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">AUD-002</TableCell>
										<TableCell>Compliance Check</TableCell>
										<TableCell>Compliance</TableCell>
										<TableCell>
											<Badge variant="secondary">Pending</Badge>
										</TableCell>
										<TableCell>
											<div className="w-full">
												<Progress value={0} />
											</div>
										</TableCell>
										<TableCell>5 hours ago</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">AUD-003</TableCell>
										<TableCell>Security Assessment</TableCell>
										<TableCell>Security</TableCell>
										<TableCell>
											<Badge variant="outline">Completed</Badge>
										</TableCell>
										<TableCell>
											<div className="w-full">
												<Progress value={100} />
											</div>
										</TableCell>
										<TableCell>1 day ago</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">AUD-004</TableCell>
										<TableCell>Operations Review</TableCell>
										<TableCell>Operational</TableCell>
										<TableCell>
											<Badge variant="destructive">Failed</Badge>
										</TableCell>
										<TableCell>
											<div className="w-full">
												<Progress value={60} />
											</div>
										</TableCell>
										<TableCell>2 days ago</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">AUD-005</TableCell>
										<TableCell>IT Infrastructure Audit</TableCell>
										<TableCell>Technical</TableCell>
										<TableCell>
											<Badge variant="default">In Progress</Badge>
										</TableCell>
										<TableCell>
											<div className="w-full">
												<Progress value={45} />
											</div>
										</TableCell>
										<TableCell>3 days ago</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
						<CardFooter className="justify-between">
							<p className="text-muted-foreground text-xs">
								Showing 5 of 1,284 audits
							</p>
							<Button variant="outline" size="sm">
								View All
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="scheduled" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Scheduled Audits</CardTitle>
							<CardDescription>
								Upcoming audits and their scheduled dates
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Audit ID</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Scheduled Date</TableHead>
										<TableHead>Priority</TableHead>
										<TableHead>Assigned To</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">AUD-006</TableCell>
										<TableCell>Annual Compliance Review</TableCell>
										<TableCell>2025-01-15</TableCell>
										<TableCell>
											<Badge variant="destructive">High</Badge>
										</TableCell>
										<TableCell>John Smith</TableCell>
										<TableCell>
											<Badge variant="secondary">Scheduled</Badge>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">AUD-007</TableCell>
										<TableCell>Quality Assurance Audit</TableCell>
										<TableCell>2025-01-18</TableCell>
										<TableCell>
											<Badge variant="default">Medium</Badge>
										</TableCell>
										<TableCell>Sarah Johnson</TableCell>
										<TableCell>
											<Badge variant="secondary">Scheduled</Badge>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">AUD-008</TableCell>
										<TableCell>Vendor Assessment</TableCell>
										<TableCell>2025-01-20</TableCell>
										<TableCell>
											<Badge variant="outline">Low</Badge>
										</TableCell>
										<TableCell>Mike Davis</TableCell>
										<TableCell>
											<Badge variant="secondary">Scheduled</Badge>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="templates" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>Financial Audit Template</CardTitle>
								<CardDescription>
									Standard financial audit checklist
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-xs">
									Comprehensive template for financial audits including balance sheets,
									income statements, and cash flow analysis.
								</p>
							</CardContent>
							<CardFooter>
								<Button variant="outline" size="sm" className="w-full">
									Use Template
								</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Compliance Checklist</CardTitle>
								<CardDescription>
									Regulatory compliance verification
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-xs">
									Template for verifying compliance with industry regulations and
									standards.
								</p>
							</CardContent>
							<CardFooter>
								<Button variant="outline" size="sm" className="w-full">
									Use Template
								</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Security Assessment</CardTitle>
								<CardDescription>
									IT security audit framework
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-xs">
									Template for assessing security controls, vulnerabilities, and
									risk management.
								</p>
							</CardContent>
							<CardFooter>
								<Button variant="outline" size="sm" className="w-full">
									Use Template
								</Button>
							</CardFooter>
						</Card>
					</div>
				</TabsContent>
			</Tabs>

			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
					<CardDescription>
						Commonly performed audit operations
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-wrap gap-2">
						<Button size="sm">New Audit</Button>
						<Button variant="outline" size="sm">Import Data</Button>
						<Button variant="outline" size="sm">Generate Report</Button>
						<Button variant="outline" size="sm">Schedule Audit</Button>
						<Button variant="outline" size="sm">View Analytics</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
