import { createFileRoute } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

export const Route = createFileRoute("/checklists")({
	component: RouteComponent,
});

const checklists = [
	{
		id: "CHK-001",
		name: "Financial Controls Checklist",
		category: "Financial",
		items: 25,
		mandatory: 20,
		createdBy: "John Smith",
		lastUpdated: "2025-01-05",
		usageCount: 45,
		isActive: true,
	},
	{
		id: "CHK-002",
		name: "GDPR Compliance Review",
		category: "Compliance",
		items: 18,
		mandatory: 15,
		createdBy: "Sarah Johnson",
		lastUpdated: "2025-01-03",
		usageCount: 67,
		isActive: true,
	},
	{
		id: "CHK-003",
		name: "Security Assessment Checklist",
		category: "Security",
		items: 32,
		mandatory: 28,
		createdBy: "Mike Davis",
		lastUpdated: "2024-12-28",
		usageCount: 38,
		isActive: true,
	},
	{
		id: "CHK-004",
		name: "Operational Efficiency Review",
		category: "Operational",
		items: 22,
		mandatory: 18,
		createdBy: "Emily Brown",
		lastUpdated: "2024-12-20",
		usageCount: 29,
		isActive: true,
	},
	{
		id: "CHK-005",
		name: "IT Infrastructure Audit",
		category: "Technical",
		items: 28,
		mandatory: 24,
		createdBy: "David Wilson",
		lastUpdated: "2024-12-15",
		usageCount: 22,
		isActive: false,
	},
];

const checklistItems = [
	{
		id: 1,
		text: "Review financial statements for accuracy",
		category: "Documentation",
		mandatory: true,
		weight: "high",
	},
	{
		id: 2,
		text: "Verify internal controls are functioning",
		category: "Controls",
		mandatory: true,
		weight: "high",
	},
	{
		id: 3,
		text: "Confirm segregation of duties",
		category: "Controls",
		mandatory: true,
		weight: "high",
	},
	{
		id: 4,
		text: "Check approval authorization matrix",
		category: "Process",
		mandatory: true,
		weight: "medium",
	},
	{
		id: 5,
		text: "Review cash reconciliation procedures",
		category: "Process",
		mandatory: false,
		weight: "medium",
	},
	{
		id: 6,
		text: "Validate expense report policies",
		category: "Policy",
		mandatory: false,
		weight: "low",
	},
];

const inProgressChecklists = [
	{
		id: "CHK-001",
		name: "Financial Controls Checklist",
		audit: "Financial Q4 Review",
		completed: 18,
		total: 25,
		progress: 72,
		assignedTo: "John Smith",
		dueDate: "2025-01-15",
		status: "in-progress",
	},
	{
		id: "CHK-002",
		name: "GDPR Compliance Review",
		audit: "Compliance Check",
		completed: 12,
		total: 18,
		progress: 67,
		assignedTo: "Sarah Johnson",
		dueDate: "2025-01-20",
		status: "in-progress",
	},
	{
		id: "CHK-003",
		name: "Security Assessment Checklist",
		audit: "Security Audit",
		completed: 28,
		total: 32,
		progress: 88,
		assignedTo: "Mike Davis",
		dueDate: "2025-01-10",
		status: "in-progress",
	},
];

function RouteComponent() {
	return (
		<div className="p-6 space-y-6">
			<div className="space-y-2">
				<h1 className="text-2xl font-semibold">Checklists</h1>
				<p className="text-muted-foreground text-sm">
					Manage audit checklists and checklist items
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader>
						<CardTitle>Total Checklists</CardTitle>
						<CardDescription>Available checklists</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">32</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">28</span> active
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>In Progress</CardTitle>
						<CardDescription>Currently being used</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">12</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">3</span> due today
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Total Items</CardTitle>
						<CardDescription>Checklist items database</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">856</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">642</span> mandatory
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Completion Rate</CardTitle>
						<CardDescription>Average checklist completion</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">94.2%</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">+2.3%</span> from last
							month
						</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Create New Checklist</CardTitle>
					<CardDescription>
						Build a new checklist from scratch or use a template
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-3">
						<div className="space-y-2">
							<Label htmlFor="checklist-name">Checklist Name</Label>
							<Input
								id="checklist-name"
								placeholder="Enter checklist name"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="checklist-category">
								Category
							</Label>
							<Select>
								<SelectTrigger id="checklist-category">
									<SelectValue placeholder="Select category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="financial">
										Financial
									</SelectItem>
									<SelectItem value="compliance">
										Compliance
									</SelectItem>
									<SelectItem value="security">
										Security
									</SelectItem>
									<SelectItem value="operational">
										Operational
									</SelectItem>
									<SelectItem value="technical">
										Technical
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="base-checklist">
								Base Checklist (Optional)
							</Label>
							<Select>
								<SelectTrigger id="base-checklist">
									<SelectValue placeholder="Start from scratch" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="blank">
										Start from scratch
									</SelectItem>
									<SelectItem value="chk-001">
										Financial Controls Checklist
									</SelectItem>
									<SelectItem value="chk-002">
										GDPR Compliance Review
									</SelectItem>
									<SelectItem value="chk-003">
										Security Assessment Checklist
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="flex gap-2 mt-4">
						<Button>Create Checklist</Button>
						<Button variant="outline">
							Import from Library
						</Button>
					</div>
				</CardContent>
			</Card>

			<Tabs defaultValue="all-checklists">
				<TabsList>
					<TabsTrigger value="all-checklists">
						All Checklists
					</TabsTrigger>
					<TabsTrigger value="in-progress">
						In Progress
					</TabsTrigger>
					<TabsTrigger value="items">Item Library</TabsTrigger>
					<TabsTrigger value="builder">Builder</TabsTrigger>
				</TabsList>

				<TabsContent value="all-checklists" className="space-y-4">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>All Checklists</CardTitle>
									<CardDescription>
										Manage all available checklists
									</CardDescription>
								</div>
								<Input
									placeholder="Search checklists..."
									className="w-64"
								/>
							</div>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Checklist ID</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Category</TableHead>
										<TableHead>Total Items</TableHead>
										<TableHead>Mandatory</TableHead>
										<TableHead>Usage</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Last Updated</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{checklists.map((checklist) => (
										<TableRow key={checklist.id}>
											<TableCell className="font-medium">
												{checklist.id}
											</TableCell>
											<TableCell>{checklist.name}</TableCell>
											<TableCell>
												<Badge variant="secondary">
													{checklist.category}
												</Badge>
											</TableCell>
											<TableCell>{checklist.items}</TableCell>
											<TableCell>{checklist.mandatory}</TableCell>
											<TableCell>{checklist.usageCount}</TableCell>
											<TableCell>
												{checklist.isActive ? (
													<Badge variant="default">
														Active
													</Badge>
												) : (
													<Badge variant="outline">
														Draft
													</Badge>
												)}
											</TableCell>
											<TableCell>
												{checklist.lastUpdated}
											</TableCell>
											<TableCell>
												<div className="flex gap-1">
													<Button
														variant="ghost"
														size="sm"
													>
														View
													</Button>
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
														Duplicate
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

				<TabsContent value="in-progress" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Active Checklist Progress</CardTitle>
							<CardDescription>
								Track checklists currently in use
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Checklist</TableHead>
										<TableHead>Audit</TableHead>
										<TableHead>Progress</TableHead>
										<TableHead>Completed</TableHead>
										<TableHead>Assigned To</TableHead>
										<TableHead>Due Date</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{inProgressChecklists.map((checklist) => (
										<TableRow key={checklist.id}>
											<TableCell className="font-medium">
												{checklist.name}
											</TableCell>
											<TableCell>{checklist.audit}</TableCell>
											<TableCell className="w-48">
												<div className="space-y-1">
													<Progress
														value={checklist.progress}
													/>
													<p className="text-muted-foreground text-xs">
														{checklist.completed} /{" "}
														{checklist.total} items
													</p>
												</div>
											</TableCell>
											<TableCell>
												<Badge variant="default">
													{checklist.progress}%
												</Badge>
											</TableCell>
											<TableCell>{checklist.assignedTo}</TableCell>
											<TableCell>{checklist.dueDate}</TableCell>
											<TableCell>
												{checklist.status ===
													"in-progress" && (
													<Badge variant="default">
														In Progress
													</Badge>
												)}
											</TableCell>
											<TableCell>
												<Button
													variant="ghost"
													size="sm"
												>
													Continue
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="items" className="space-y-4">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Item Library</CardTitle>
									<CardDescription>
										Reusable checklist items
									</CardDescription>
								</div>
								<Button>Add New Item</Button>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{checklistItems.map((item) => (
									<div
										key={item.id}
										className="flex items-start justify-between border-b pb-4 last:border-0"
									>
										<div className="flex items-start gap-3 flex-1">
											<Checkbox id={`item-${item.id}`} />
											<div className="flex-1 space-y-1">
												<label
													htmlFor={`item-${item.id}`}
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
												>
													{item.text}
												</label>
												<div className="flex gap-2">
													<Badge
														variant="outline"
														className="text-xs"
													>
														{item.category}
													</Badge>
													{item.mandatory && (
														<Badge
															variant="destructive"
															className="text-xs"
														>
															Mandatory
														</Badge>
													)}
													<Badge
														variant="secondary"
														className="text-xs"
													>
														{item.weight} weight
													</Badge>
												</div>
											</div>
										</div>
										<Button
											variant="ghost"
											size="sm"
										>
											Edit
										</Button>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="builder" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Checklist Builder</CardTitle>
							<CardDescription>
								Create or edit checklist structure
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div>
											<h3 className="font-semibold">
												Financial Controls Checklist
											</h3>
											<p className="text-muted-foreground text-sm">
												6 items • 4 mandatory
											</p>
										</div>
										<div className="flex gap-2">
											<Button
												variant="outline"
												size="sm"
											>
												Add Section
											</Button>
											<Button variant="outline" size="sm">
												Add Item
											</Button>
										</div>
									</div>

									<Separator />

									<div className="space-y-4">
										<div className="rounded-lg border p-4">
											<div className="flex items-center justify-between mb-3">
												<h4 className="font-medium">
													Section 1: Documentation
												</h4>
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
														Remove
													</Button>
												</div>
											</div>
											<div className="space-y-3">
												{checklistItems
													.slice(0, 2)
													.map((item) => (
														<div
															key={item.id}
															className="flex items-start gap-3"
														>
															<div className="flex items-center gap-2 flex-1">
																<Checkbox />
																<span className="text-sm">
																	{item.text}
																</span>
															</div>
															<div className="flex gap-1">
																{item.mandatory && (
																	<Badge
																		variant="destructive"
																		className="text-xs"
																	>
																		Required
																	</Badge>
																)}
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
																	Remove
																</Button>
															</div>
														</div>
													))}
											</div>
										</div>

										<div className="rounded-lg border p-4">
											<div className="flex items-center justify-between mb-3">
												<h4 className="font-medium">
													Section 2: Controls
												</h4>
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
														Remove
													</Button>
												</div>
											</div>
											<div className="space-y-3">
												{checklistItems
													.slice(2, 4)
													.map((item) => (
														<div
															key={item.id}
															className="flex items-start gap-3"
														>
															<div className="flex items-center gap-2 flex-1">
																<Checkbox />
																<span className="text-sm">
																	{item.text}
																</span>
															</div>
															<div className="flex gap-1">
																{item.mandatory && (
																	<Badge
																		variant="destructive"
																		className="text-xs"
																	>
																		Required
																	</Badge>
																)}
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
																	Remove
																</Button>
															</div>
														</div>
													))}
											</div>
										</div>
									</div>
								</div>

								<Separator />

								<div className="flex gap-2">
									<Button>Save Checklist</Button>
									<Button variant="outline">
										Preview
									</Button>
									<Button variant="outline">
										Publish
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
