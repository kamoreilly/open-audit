import { createFileRoute } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/search")({
	component: RouteComponent,
});

const searchResults = {
	audits: [
		{
			id: "AUD-001",
			name: "Financial Q4 Review",
			type: "Financial",
			status: "in-progress",
			assignedTo: "John Smith",
			lastModified: "2025-01-05",
		},
		{
			id: "AUD-012",
			name: "Financial Audit 2024",
			type: "Financial",
			status: "completed",
			assignedTo: "Sarah Johnson",
			lastModified: "2024-12-20",
		},
	],
	reports: [
		{
			id: "RPT-003",
			name: "Financial Audit Analysis",
			type: "Financial",
			createdAt: "2025-01-03",
			createdBy: "Mike Davis",
		},
	],
	templates: [
		{
			id: "TPL-001",
			name: "Financial Audit Template",
			category: "Financial",
			questions: 85,
			usageCount: 45,
		},
	],
	checklists: [
		{
			id: "CHK-001",
			name: "Financial Controls Checklist",
			category: "Financial",
			items: 25,
			usageCount: 45,
		},
	],
};

const recentSearches = [
	"financial audit",
	"compliance check",
	"security assessment",
	"Q4 review",
];

const savedSearches = [
	{ name: "My Pending Audits", query: "status:pending assignedTo:me" },
	{ name: "High Priority Items", query: "priority:high" },
	{ name: "This Week's Due Dates", query: "dueDate:week" },
];

function RouteComponent() {
	return (
		<div className="p-6 space-y-6">
			<div className="space-y-2">
				<h1 className="text-2xl font-semibold">Search</h1>
				<p className="text-muted-foreground text-sm">
					Search across all audits, reports, templates, and more
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Global Search</CardTitle>
					<CardDescription>
						Enter keywords to search across the platform
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex gap-2">
						<Input
							placeholder="Search for audits, reports, templates, users..."
							className="flex-1"
						/>
						<Select defaultValue="all">
							<SelectTrigger className="w-48">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Types</SelectItem>
								<SelectItem value="audits">Audits</SelectItem>
								<SelectItem value="reports">Reports</SelectItem>
								<SelectItem value="templates">
									Templates
								</SelectItem>
								<SelectItem value="checklists">
									Checklists
								</SelectItem>
								<SelectItem value="users">Users</SelectItem>
							</SelectContent>
						</Select>
						<Button>Search</Button>
					</div>
					<div className="flex gap-2 mt-4">
						<Button variant="outline" size="sm">
							Advanced Search
						</Button>
						<Button variant="outline" size="sm">
							Save Search
						</Button>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Recent Searches</CardTitle>
						<CardDescription>
							Quick access to your recent searches
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-2">
							{recentSearches.map((search, index) => (
								<Badge
									key={index}
									variant="outline"
									className="cursor-pointer hover:bg-accent"
								>
									{search}
								</Badge>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Saved Searches</CardTitle>
						<CardDescription>
							Your saved search queries
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{savedSearches.map((search, index) => (
								<div
									key={index}
									className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent cursor-pointer"
								>
									<div>
										<p className="text-sm font-medium">
											{search.name}
										</p>
										<p className="text-muted-foreground text-xs">
											{search.query}
										</p>
									</div>
									<Button variant="ghost" size="sm">
										Run
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="all">
				<TabsList>
					<TabsTrigger value="all">All Results</TabsTrigger>
					<TabsTrigger value="audits">Audits (2)</TabsTrigger>
					<TabsTrigger value="reports">Reports (1)</TabsTrigger>
					<TabsTrigger value="templates">Templates (1)</TabsTrigger>
					<TabsTrigger value="checklists">Checklists (1)</TabsTrigger>
				</TabsList>

				<TabsContent value="all" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Search Results</CardTitle>
							<CardDescription>
								Found 5 results for "financial"
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="border-b pb-4">
									<div className="flex items-start justify-between">
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<Badge variant="secondary">
													Audit
												</Badge>
												<span className="text-muted-foreground text-sm">
													AUD-001
												</span>
											</div>
											<h3 className="font-semibold">
												Financial Q4 Review
											</h3>
											<p className="text-muted-foreground text-sm">
												In progress • Assigned to John
												Smith
											</p>
										</div>
										<Button variant="outline" size="sm">
											View
										</Button>
									</div>
								</div>

								<div className="border-b pb-4">
									<div className="flex items-start justify-between">
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<Badge variant="secondary">
													Audit
												</Badge>
												<span className="text-muted-foreground text-sm">
													AUD-012
												</span>
											</div>
											<h3 className="font-semibold">
												Financial Audit 2024
											</h3>
											<p className="text-muted-foreground text-sm">
												Completed • Assigned to Sarah
												Johnson
											</p>
										</div>
										<Button variant="outline" size="sm">
											View
										</Button>
									</div>
								</div>

								<div className="border-b pb-4">
									<div className="flex items-start justify-between">
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<Badge variant="default">
													Report
												</Badge>
												<span className="text-muted-foreground text-sm">
													RPT-003
												</span>
											</div>
											<h3 className="font-semibold">
												Financial Audit Analysis
											</h3>
											<p className="text-muted-foreground text-sm">
												Created by Mike Davis • Jan 3,
												2025
											</p>
										</div>
										<Button variant="outline" size="sm">
											View
										</Button>
									</div>
								</div>

								<div className="border-b pb-4">
									<div className="flex items-start justify-between">
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<Badge variant="outline">
													Template
												</Badge>
												<span className="text-muted-foreground text-sm">
													TPL-001
												</span>
											</div>
											<h3 className="font-semibold">
												Financial Audit Template
											</h3>
											<p className="text-muted-foreground text-sm">
												85 questions • Used 45 times
											</p>
										</div>
										<Button variant="outline" size="sm">
											View
										</Button>
									</div>
								</div>

								<div>
									<div className="flex items-start justify-between">
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<Badge variant="outline">
													Checklist
												</Badge>
												<span className="text-muted-foreground text-sm">
													CHK-001
												</span>
											</div>
											<h3 className="font-semibold">
												Financial Controls Checklist
											</h3>
											<p className="text-muted-foreground text-sm">
												25 items • Used 45 times
											</p>
										</div>
										<Button variant="outline" size="sm">
											View
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="audits" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Audits</CardTitle>
							<CardDescription>
								2 results found
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{searchResults.audits.map((audit) => (
									<div
										key={audit.id}
										className="flex items-start justify-between border-b pb-4 last:border-0"
									>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<span className="text-muted-foreground text-sm">
													{audit.id}
												</span>
												<Badge variant="secondary">
													{audit.type}
												</Badge>
											</div>
											<h3 className="font-semibold">
												{audit.name}
											</h3>
											<p className="text-muted-foreground text-sm">
												{audit.status} • Assigned to{" "}
												{audit.assignedTo}
											</p>
											<p className="text-muted-foreground text-xs">
												Last modified:{" "}
												{audit.lastModified}
											</p>
										</div>
										<Button variant="outline" size="sm">
											View
										</Button>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="reports" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Reports</CardTitle>
							<CardDescription>
								1 result found
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{searchResults.reports.map((report) => (
									<div
										key={report.id}
										className="flex items-start justify-between"
									>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<span className="text-muted-foreground text-sm">
													{report.id}
												</span>
												<Badge variant="secondary">
													{report.type}
												</Badge>
											</div>
											<h3 className="font-semibold">
												{report.name}
											</h3>
											<p className="text-muted-foreground text-sm">
												Created by {report.createdBy}
											</p>
											<p className="text-muted-foreground text-xs">
												Created: {report.createdAt}
											</p>
										</div>
										<Button variant="outline" size="sm">
											View
										</Button>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="templates" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Templates</CardTitle>
							<CardDescription>
								1 result found
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{searchResults.templates.map((template) => (
									<div
										key={template.id}
										className="flex items-start justify-between"
									>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<span className="text-muted-foreground text-sm">
													{template.id}
												</span>
												<Badge variant="secondary">
													{template.category}
												</Badge>
											</div>
											<h3 className="font-semibold">
												{template.name}
											</h3>
											<p className="text-muted-foreground text-sm">
												{template.questions} questions •
												Used {template.usageCount}{" "}
												times
											</p>
										</div>
										<Button variant="outline" size="sm">
											View
										</Button>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="checklists" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Checklists</CardTitle>
							<CardDescription>
								1 result found
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{searchResults.checklists.map((checklist) => (
									<div
										key={checklist.id}
										className="flex items-start justify-between"
									>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<span className="text-muted-foreground text-sm">
													{checklist.id}
												</span>
												<Badge variant="secondary">
													{checklist.category}
												</Badge>
											</div>
											<h3 className="font-semibold">
												{checklist.name}
											</h3>
											<p className="text-muted-foreground text-sm">
												{checklist.items} items •
												Used {checklist.usageCount}{" "}
												times
											</p>
										</div>
										<Button variant="outline" size="sm">
											View
										</Button>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
