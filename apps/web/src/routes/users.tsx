import { createFileRoute, redirect } from "@tanstack/react-router";

import { getUser } from "@/functions/get-user";

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

export const Route = createFileRoute("/users")({
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

const users = [
	{
		id: "USR-001",
		name: "John Smith",
		email: "john.smith@company.com",
		role: "admin",
		department: "Audit",
		status: "active",
		auditsAssigned: 45,
		auditsCompleted: 38,
		lastActive: "2025-01-06",
		createdAt: "2024-01-15",
	},
	{
		id: "USR-002",
		name: "Sarah Johnson",
		email: "sarah.johnson@company.com",
		role: "auditor",
		department: "Compliance",
		status: "active",
		auditsAssigned: 32,
		auditsCompleted: 29,
		lastActive: "2025-01-06",
		createdAt: "2024-02-20",
	},
	{
		id: "USR-003",
		name: "Mike Davis",
		email: "mike.davis@company.com",
		role: "auditor",
		department: "Security",
		status: "active",
		auditsAssigned: 28,
		auditsCompleted: 25,
		lastActive: "2025-01-05",
		createdAt: "2024-03-10",
	},
	{
		id: "USR-004",
		name: "Emily Brown",
		email: "emily.brown@company.com",
		role: "manager",
		department: "Operations",
		status: "active",
		auditsAssigned: 12,
		auditsCompleted: 12,
		lastActive: "2025-01-04",
		createdAt: "2024-04-05",
	},
	{
		id: "USR-005",
		name: "David Wilson",
		email: "david.wilson@company.com",
		role: "auditor",
		department: "IT",
		status: "active",
		auditsAssigned: 22,
		auditsCompleted: 19,
		lastActive: "2025-01-03",
		createdAt: "2024-05-12",
	},
	{
		id: "USR-006",
		name: "Lisa Anderson",
		email: "lisa.anderson@company.com",
		role: "viewer",
		department: "Finance",
		status: "inactive",
		auditsAssigned: 5,
		auditsCompleted: 5,
		lastActive: "2024-12-20",
		createdAt: "2024-06-18",
	},
	{
		id: "USR-007",
		name: "Robert Taylor",
		email: "robert.taylor@company.com",
		role: "auditor",
		department: "Quality",
		status: "pending",
		auditsAssigned: 0,
		auditsCompleted: 0,
		lastActive: "Never",
		createdAt: "2025-01-02",
	},
];

const activityLog = [
	{
		id: 1,
		user: "John Smith",
		action: "Completed audit",
		target: "Financial Q4 Review",
		timestamp: "2025-01-06 14:32",
	},
	{
		id: 2,
		user: "Sarah Johnson",
		action: "Started audit",
		target: "Compliance Check",
		timestamp: "2025-01-06 11:15",
	},
	{
		id: 3,
		user: "Mike Davis",
		action: "Updated template",
		target: "Security Audit Framework",
		timestamp: "2025-01-06 09:45",
	},
	{
		id: 4,
		user: "Emily Brown",
		action: "Generated report",
		target: "Monthly Audit Summary",
		timestamp: "2025-01-05 16:20",
	},
	{
		id: 5,
		user: "David Wilson",
		action: "Created audit",
		target: "IT Infrastructure Audit",
		timestamp: "2025-01-05 13:10",
	},
];

const roles = [
	{ name: "Admin", count: 2, permissions: "Full access" },
	{ name: "Manager", count: 4, permissions: "Manage team & view reports" },
	{ name: "Auditor", count: 12, permissions: "Conduct audits" },
	{ name: "Viewer", count: 8, permissions: "View only" },
];

function RouteComponent() {
	return (
		<div className="p-6 space-y-6">
			<div className="space-y-2">
				<h1 className="text-2xl font-semibold">Users</h1>
				<p className="text-muted-foreground text-sm">
					Manage user accounts and permissions
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader>
						<CardTitle>Total Users</CardTitle>
						<CardDescription>Registered users</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">26</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">+3</span> this month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Active</CardTitle>
						<CardDescription>Currently active</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">22</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">84.6%</span> of total
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle> Pending</CardTitle>
						<CardDescription>Awaiting activation</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">1</div>
						<p className="text-muted-foreground text-xs mt-2">
							Sent: <span className="text-primary">2 days ago</span>
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Inactive</CardTitle>
						<CardDescription>Not recently active</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">3</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-destructive">1</span> offline 30+ days
						</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Add New User</CardTitle>
					<CardDescription>
						Invite a new user to the platform
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-3">
						<div className="space-y-2">
							<Label htmlFor="user-name">Full Name</Label>
							<Input
								id="user-name"
								placeholder="Enter full name"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="user-email">Email Address</Label>
							<Input
								id="user-email"
								placeholder="user@company.com"
								type="email"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="user-role">Role</Label>
							<Select>
								<SelectTrigger id="user-role">
									<SelectValue placeholder="Select role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="admin">Admin</SelectItem>
									<SelectItem value="manager">Manager</SelectItem>
									<SelectItem value="auditor">Auditor</SelectItem>
									<SelectItem value="viewer">Viewer</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="flex gap-2 mt-4">
						<Button>Send Invite</Button>
						<Button variant="outline">Add User Directly</Button>
					</div>
				</CardContent>
			</Card>

			<Tabs defaultValue="all-users">
				<TabsList>
					<TabsTrigger value="all-users">All Users</TabsTrigger>
					<TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
					<TabsTrigger value="activity">Activity Log</TabsTrigger>
				</TabsList>

				<TabsContent value="all-users" className="space-y-4">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>All Users</CardTitle>
									<CardDescription>
										Manage user accounts and access
									</CardDescription>
								</div>
								<Input
									placeholder="Search users..."
									className="w-64"
								/>
							</div>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>User ID</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Role</TableHead>
										<TableHead>Department</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Audits</TableHead>
										<TableHead>Last Active</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{users.map((user) => (
										<TableRow key={user.id}>
											<TableCell className="font-medium">
												{user.id}
											</TableCell>
											<TableCell>{user.name}</TableCell>
											<TableCell>{user.email}</TableCell>
											<TableCell>
												{user.role === "admin" && (
													<Badge variant="destructive">
														Admin
													</Badge>
												)}
												{user.role === "manager" && (
													<Badge variant="default">
														Manager
													</Badge>
												)}
												{user.role === "auditor" && (
													<Badge variant="secondary">
														Auditor
													</Badge>
												)}
												{user.role === "viewer" && (
													<Badge variant="outline">
														Viewer
													</Badge>
												)}
											</TableCell>
											<TableCell>{user.department}</TableCell>
											<TableCell>
												{user.status === "active" && (
													<Badge variant="default">
														Active
													</Badge>
												)}
												{user.status === "inactive" && (
													<Badge variant="outline">
														Inactive
													</Badge>
												)}
												{user.status === "pending" && (
													<Badge variant="secondary">
														Pending
													</Badge>
												)}
											</TableCell>
											<TableCell>
												{user.auditsCompleted} /{" "}
												{user.auditsAssigned}
											</TableCell>
											<TableCell>{user.lastActive}</TableCell>
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
														{user.status === "active"
															? "Deactivate"
															: "Activate"}
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

				<TabsContent value="roles" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{roles.map((role) => (
							<Card key={role.name}>
								<CardHeader>
									<CardTitle className="text-lg">
										{role.name}
									</CardTitle>
									<CardDescription>
										{role.count} users assigned
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground mb-4">
										{role.permissions}
									</p>
									<Button variant="outline" className="w-full">
										Manage Permissions
									</Button>
								</CardContent>
							</Card>
						))}
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Role Permissions Matrix</CardTitle>
							<CardDescription>
								Detailed permissions for each role
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Permission</TableHead>
										<TableHead>Admin</TableHead>
										<TableHead>Manager</TableHead>
										<TableHead>Auditor</TableHead>
										<TableHead>Viewer</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{[
										"View Audits",
										"Create Audits",
										"Edit Audits",
										"Delete Audits",
										"View Reports",
										"Generate Reports",
										"Manage Users",
										"Manage Templates",
										"System Settings",
									].map((permission, index) => (
										<TableRow key={index}>
											<TableCell className="font-medium">
												{permission}
											</TableCell>
											<TableCell>
												<Badge variant="default">✓</Badge>
											</TableCell>
											<TableCell>
												{["View Audits", "View Reports"].includes(
													permission
												) ||
												["Create Audits", "Edit Audits"].includes(
													permission
												) ? (
													<Badge variant="default">✓</Badge>
												) : (
													<Badge variant="outline">-</Badge>
												)}
											</TableCell>
											<TableCell>
												{["View Audits", "Create Audits"].includes(
													permission
												) ? (
													<Badge variant="default">✓</Badge>
												) : (
													<Badge variant="outline">-</Badge>
												)}
											</TableCell>
											<TableCell>
												{permission === "View Audits" ||
												permission === "View Reports" ? (
													<Badge variant="default">✓</Badge>
												) : (
													<Badge variant="outline">-</Badge>
												)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="activity" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Recent Activity</CardTitle>
							<CardDescription>
								Latest user actions across the platform
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>User</TableHead>
										<TableHead>Action</TableHead>
										<TableHead>Target</TableHead>
										<TableHead>Timestamp</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{activityLog.map((log) => (
										<TableRow key={log.id}>
											<TableCell className="font-medium">
												{log.user}
											</TableCell>
											<TableCell>{log.action}</TableCell>
											<TableCell>{log.target}</TableCell>
											<TableCell>{log.timestamp}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
