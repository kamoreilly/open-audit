import { createFileRoute } from "@tanstack/react-router";

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

export const Route = createFileRoute("/templates")({
	component: RouteComponent,
});

const templates = [
	{
		id: "TPL-001",
		name: "Financial Audit Template",
		category: "Financial",
		sections: 12,
		questions: 85,
		createdBy: "John Smith",
		createdAt: "2024-06-15",
		lastModified: "2024-12-20",
		version: "2.3",
		usageCount: 45,
		isActive: true,
	},
	{
		id: "TPL-002",
		name: "Compliance Checklist",
		category: "Compliance",
		sections: 8,
		questions: 62,
		createdBy: "Sarah Johnson",
		createdAt: "2024-07-22",
		lastModified: "2024-12-18",
		version: "1.8",
		usageCount: 67,
		isActive: true,
	},
	{
		id: "TPL-003",
		name: "Security Audit Framework",
		category: "Security",
		sections: 15,
		questions: 120,
		createdBy: "Mike Davis",
		createdAt: "2024-05-10",
		lastModified: "2024-12-15",
		version: "3.1",
		usageCount: 38,
		isActive: true,
	},
	{
		id: "TPL-004",
		name: "Operational Audit Template",
		category: "Operational",
		sections: 10,
		questions: 78,
		createdBy: "Emily Brown",
		createdAt: "2024-08-05",
		lastModified: "2024-12-10",
		version: "1.5",
		usageCount: 29,
		isActive: true,
	},
	{
		id: "TPL-005",
		name: "IT Infrastructure Audit",
		category: "Technical",
		sections: 14,
		questions: 95,
		createdBy: "David Wilson",
		createdAt: "2024-09-12",
		lastModified: "2024-12-08",
		version: "2.0",
		usageCount: 22,
		isActive: false,
	},
	{
		id: "TPL-006",
		name: "Quality Assurance Template",
		category: "Quality",
		sections: 9,
		questions: 56,
		createdBy: "John Smith",
		createdAt: "2024-10-01",
		lastModified: "2024-12-05",
		version: "1.2",
		usageCount: 18,
		isActive: true,
	},
];

const templateSections = [
	{
		id: 1,
		title: "Executive Summary",
		description: "Overview and key findings",
		questions: 5,
		required: true,
	},
	{
		id: 2,
		title: "Financial Controls",
		description: "Assessment of financial control mechanisms",
		questions: 15,
		required: true,
	},
	{
		id: 3,
		title: "Risk Assessment",
		description: "Identification and evaluation of risks",
		questions: 12,
		required: true,
	},
	{
		id: 4,
		title: "Compliance Review",
		description: "Regulatory and policy compliance check",
		questions: 18,
		required: true,
	},
];

function RouteComponent() {
	return (
		<div className="p-6 space-y-6">
			<div className="space-y-2">
				<h1 className="text-2xl font-semibold">Templates</h1>
				<p className="text-muted-foreground text-sm">
					Manage and create audit templates
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader>
						<CardTitle>Total Templates</CardTitle>
						<CardDescription>All available templates</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">24</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">21</span> active
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Categories</CardTitle>
						<CardDescription>Template categories</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">8</div>
						<p className="text-muted-foreground text-xs mt-2">
							Most used:{" "}
							<span className="text-primary">Compliance</span>
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>In Draft</CardTitle>
						<CardDescription>Templates being created</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">3</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">1</span> near completion
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Total Usage</CardTitle>
						<CardDescription>Templates used in audits</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">1,284</div>
						<p className="text-muted-foreground text-xs mt-2">
							<span className="text-primary">+12%</span> this month
						</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Create New Template</CardTitle>
					<CardDescription>
						Start building a new audit template
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-3">
						<div className="space-y-2">
							<Label htmlFor="template-name">Template Name</Label>
							<Input
								id="template-name"
								placeholder="Enter template name"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="category">Category</Label>
							<Select>
								<SelectTrigger id="category">
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
									<SelectItem value="quality">
										Quality
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="base-template">
								Base Template (Optional)
							</Label>
							<Select>
								<SelectTrigger id="base-template">
									<SelectValue placeholder="Start from scratch" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="blank">
										Start from scratch
									</SelectItem>
									<SelectItem value="tpl-001">
										Financial Audit Template
									</SelectItem>
									<SelectItem value="tpl-002">
										Compliance Checklist
									</SelectItem>
									<SelectItem value="tpl-003">
										Security Audit Framework
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="flex gap-2 mt-4">
						<Button>Create Template</Button>
						<Button variant="outline">Import Template</Button>
					</div>
				</CardContent>
			</Card>

			<Tabs defaultValue="all">
				<TabsList>
					<TabsTrigger value="all">All Templates</TabsTrigger>
					<TabsTrigger value="active">Active</TabsTrigger>
					<TabsTrigger value="draft">Draft</TabsTrigger>
					<TabsTrigger value="categories">Categories</TabsTrigger>
				</TabsList>

				<TabsContent value="all" className="space-y-4">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>All Templates</CardTitle>
									<CardDescription>
										Manage all audit templates
									</CardDescription>
								</div>
								<div className="flex gap-2">
									<Input
										placeholder="Search templates..."
										className="w-64"
									/>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Template ID</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Category</TableHead>
										<TableHead>Sections</TableHead>
										<TableHead>Questions</TableHead>
										<TableHead>Version</TableHead>
										<TableHead>Usage</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Last Modified</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{templates.map((template) => (
										<TableRow key={template.id}>
											<TableCell className="font-medium">
												{template.id}
											</TableCell>
											<TableCell>{template.name}</TableCell>
											<TableCell>{template.category}</TableCell>
											<TableCell>{template.sections}</TableCell>
											<TableCell>{template.questions}</TableCell>
											<TableCell>
												<Badge variant="outline">
													v{template.version}
												</Badge>
											</TableCell>
											<TableCell>{template.usageCount}</TableCell>
											<TableCell>
												{template.isActive ? (
													<Badge variant="default">
														Active
													</Badge>
												) : (
													<Badge variant="secondary">
														Draft
													</Badge>
												)}
											</TableCell>
											<TableCell>
												{template.lastModified}
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

				<TabsContent value="active" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Active Templates</CardTitle>
							<CardDescription>
								Templates available for audits
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Category</TableHead>
										<TableHead>Questions</TableHead>
										<TableHead>Usage Count</TableHead>
										<TableHead>Created By</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{templates
										.filter((t) => t.isActive)
										.map((template) => (
											<TableRow key={template.id}>
												<TableCell className="font-medium">
													{template.name}
												</TableCell>
												<TableCell>
													<Badge variant="secondary">
														{template.category}
													</Badge>
												</TableCell>
												<TableCell>{template.questions}</TableCell>
												<TableCell>{template.usageCount}</TableCell>
												<TableCell>{template.createdBy}</TableCell>
												<TableCell>
													<Button
														variant="ghost"
														size="sm"
													>
														Use Template
													</Button>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="draft" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Draft Templates</CardTitle>
							<CardDescription>
								Templates being created or modified
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Category</TableHead>
										<TableHead>Sections</TableHead>
										<TableHead>Questions</TableHead>
										<TableHead>Last Modified</TableHead>
										<TableHead>Progress</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{templates
										.filter((t) => !t.isActive)
										.map((template) => (
											<TableRow key={template.id}>
												<TableCell className="font-medium">
													{template.name}
												</TableCell>
												<TableCell>{template.category}</TableCell>
												<TableCell>{template.sections}</TableCell>
												<TableCell>{template.questions}</TableCell>
												<TableCell>{template.lastModified}</TableCell>
												<TableCell className="w-48">
													<Progress value={75} />
												</TableCell>
												<TableCell>
													<Button variant="ghost" size="sm">
														Continue Editing
													</Button>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="categories" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{[
							{ name: "Financial", count: 4, color: "default" },
							{ name: "Compliance", count: 6, color: "default" },
							{ name: "Security", count: 3, color: "default" },
							{ name: "Operational", count: 4, color: "default" },
							{ name: "Technical", count: 3, color: "default" },
							{ name: "Quality", count: 4, color: "default" },
						].map((category) => (
							<Card key={category.name}>
								<CardHeader>
									<div className="flex items-center justify-between">
										<CardTitle className="text-lg">
											{category.name}
										</CardTitle>
										<Badge variant="secondary">
											{category.count} templates
										</Badge>
									</div>
									<CardDescription>
										Audit templates for {category.name.toLowerCase()}{" "}
										reviews
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Button variant="outline" className="w-full">
										View Templates
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
			</Tabs>

			<Card>
				<CardHeader>
					<CardTitle>Template Structure Preview</CardTitle>
					<CardDescription>
						Example: Financial Audit Template Structure
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{templateSections.map((section, index) => (
							<div key={section.id}>
								<div className="flex items-start justify-between">
									<div className="space-y-1">
										<div className="flex items-center gap-2">
											<span className="text-muted-foreground text-sm">
												Section {section.id}
											</span>
											{section.required && (
												<Badge variant="destructive" className="text-xs">
													Required
												</Badge>
											)}
										</div>
										<h4 className="font-medium">{section.title}</h4>
										<p className="text-muted-foreground text-sm">
											{section.description}
										</p>
										<p className="text-muted-foreground text-xs">
											{section.questions} questions
										</p>
									</div>
									<Button variant="ghost" size="sm">
										Edit
									</Button>
								</div>
								{index < templateSections.length - 1 && (
									<Separator className="mt-4" />
								)}
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
