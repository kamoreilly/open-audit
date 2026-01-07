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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/settings")({
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
				<h1 className="text-2xl font-semibold">Settings</h1>
				<p className="text-muted-foreground text-sm">
					Manage application settings and preferences
				</p>
			</div>

			<Tabs defaultValue="general">
				<TabsList>
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="notifications">
						Notifications
					</TabsTrigger>
					<TabsTrigger value="security">Security</TabsTrigger>
					<TabsTrigger value="integrations">
						Integrations
					</TabsTrigger>
					<TabsTrigger value="audit">Audit Settings</TabsTrigger>
				</TabsList>

				<TabsContent value="general" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Organization Settings</CardTitle>
							<CardDescription>
								Basic information about your organization
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="org-name">
										Organization Name
									</Label>
									<Input
										id="org-name"
										defaultValue="Acme Corporation"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="org-industry">
										Industry
									</Label>
									<Select defaultValue="finance">
										<SelectTrigger id="org-industry">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="finance">
												Finance
											</SelectItem>
											<SelectItem value="healthcare">
												Healthcare
											</SelectItem>
											<SelectItem value="technology">
												Technology
											</SelectItem>
											<SelectItem value="manufacturing">
												Manufacturing
											</SelectItem>
											<SelectItem value="retail">
												Retail
											</SelectItem>
											<SelectItem value="other">
												Other
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="org-size">
										Organization Size
									</Label>
									<Select defaultValue="medium">
										<SelectTrigger id="org-size">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="small">
												Small (1-50)
											</SelectItem>
											<SelectItem value="medium">
												Medium (51-500)
											</SelectItem>
											<SelectItem value="large">
												Large (501-5000)
											</SelectItem>
											<SelectItem value="enterprise">
												Enterprise (5000+)
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="org-timezone">
										Timezone
									</Label>
									<Select defaultValue="utc">
										<SelectTrigger id="org-timezone">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="utc">
												UTC
											</SelectItem>
											<SelectItem value="est">
												Eastern Time
											</SelectItem>
											<SelectItem value="pst">
												Pacific Time
											</SelectItem>
											<SelectItem value="cst">
												Central Time
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<Separator />
							<div className="space-y-2">
								<Label htmlFor="org-logo">Logo URL</Label>
								<Input
									id="org-logo"
									placeholder="https://example.com/logo.png"
									type="url"
								/>
							</div>
							<div className="flex gap-2">
								<Button>Save Changes</Button>
								<Button variant="outline">Cancel</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Application Preferences</CardTitle>
							<CardDescription>
								Customize your application experience
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="dark-mode">
										Dark Mode
									</Label>
									<p className="text-muted-foreground text-sm">
										Use dark theme across the application
									</p>
								</div>
								<Switch id="dark-mode" defaultChecked />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="compact-view">
										Compact View
									</Label>
									<p className="text-muted-foreground text-sm">
										Show more content with less spacing
									</p>
								</div>
								<Switch id="compact-view" />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="auto-save">
										Auto-Save
									</Label>
									<p className="text-muted-foreground text-sm">
										Automatically save work in progress
									</p>
								</div>
								<Switch id="auto-save" defaultChecked />
							</div>
							<Separator />
							<div className="space-y-2">
								<Label htmlFor="default-page">
									Default Landing Page
								</Label>
								<Select defaultValue="dashboard">
									<SelectTrigger id="default-page">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="dashboard">
											Dashboard
										</SelectItem>
										<SelectItem value="audits">
											Audits
										</SelectItem>
										<SelectItem value="scheduled">
											Scheduled
										</SelectItem>
										<SelectItem value="reports">
											Reports
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Data & Privacy</CardTitle>
							<CardDescription>
								Manage data retention and privacy settings
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="data-retention">
									Data Retention Period
								</Label>
								<Select defaultValue="7years">
									<SelectTrigger id="data-retention">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1year">
											1 Year
										</SelectItem>
										<SelectItem value="3years">
											3 Years
										</SelectItem>
										<SelectItem value="5years">
											5 Years
										</SelectItem>
										<SelectItem value="7years">
											7 Years
										</SelectItem>
										<SelectItem value="forever">
											Forever
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="anonymize-data">
										Anonymize Data
									</Label>
									<p className="text-muted-foreground text-sm">
										Remove personal identifiers after retention
										period
									</p>
								</div>
								<Switch id="anonymize-data" />
							</div>
							<Separator />
							<div className="space-y-2">
								<Label>Export Data</Label>
								<p className="text-muted-foreground text-sm">
									Download all your organization data
								</p>
								<Button variant="outline">Export All Data</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="notifications" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Email Notifications</CardTitle>
							<CardDescription>
								Manage email notification preferences
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="email-assignments">
										Audit Assignments
									</Label>
									<p className="text-muted-foreground text-sm">
										Receive emails when assigned to audits
									</p>
								</div>
								<Switch id="email-assignments" defaultChecked />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="email-due-dates">
										Due Date Reminders
									</Label>
									<p className="text-muted-foreground text-sm">
										Get reminders before audits are due
									</p>
								</div>
								<Switch id="email-due-dates" defaultChecked />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="email-reports">
										Report Generation
									</Label>
									<p className="text-muted-foreground text-sm">
										Notify when reports are ready
									</p>
								</div>
								<Switch id="email-reports" defaultChecked />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="email-comments">
										Comments & Mentions
									</Label>
									<p className="text-muted-foreground text-sm">
										Receive notifications for comments and
										mentions
									</p>
								</div>
								<Switch id="email-comments" defaultChecked />
							</div>
							<Separator />
							<div className="space-y-2">
								<Label htmlFor="email-frequency">
									Digest Frequency
								</Label>
								<Select defaultValue="daily">
									<SelectTrigger id="email-frequency">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="immediate">
											Immediate
										</SelectItem>
										<SelectItem value="daily">
											Daily Digest
										</SelectItem>
										<SelectItem value="weekly">
											Weekly Digest
										</SelectItem>
										<SelectItem value="never">
											Never
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Push Notifications</CardTitle>
							<CardDescription>
								In-app notification settings
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="push-enabled">
										Enable Push Notifications
									</Label>
									<p className="text-muted-foreground text-sm">
										Receive in-app notifications
									</p>
								</div>
								<Switch id="push-enabled" defaultChecked />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="push-sounds">
										Notification Sounds
									</Label>
									<p className="text-muted-foreground text-sm">
										Play sound for notifications
									</p>
								</div>
								<Switch id="push-sounds" />
							</div>
							<Separator />
							<div className="space-y-2">
								<Label htmlFor="quiet-hours">
									Quiet Hours
								</Label>
								<Select defaultValue="none">
									<SelectTrigger id="quiet-hours">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="none">
											No Quiet Hours
										</SelectItem>
										<SelectItem value="evening">
											Evening (6 PM - 8 AM)
										</SelectItem>
										<SelectItem value="night">
											Night (10 PM - 7 AM)
										</SelectItem>
										<SelectItem value="custom">
											Custom
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="security" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Password Policy</CardTitle>
							<CardDescription>
								Configure password requirements
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="min-length">
									Minimum Password Length
								</Label>
								<Input
									id="min-length"
									type="number"
									defaultValue="8"
									min="6"
									max="32"
								/>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="require-uppercase">
										Require Uppercase
									</Label>
									<p className="text-muted-foreground text-sm">
										Passwords must contain uppercase letters
									</p>
								</div>
								<Switch id="require-uppercase" defaultChecked />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="require-numbers">
										Require Numbers
									</Label>
									<p className="text-muted-foreground text-sm">
										Passwords must contain numbers
									</p>
								</div>
								<Switch id="require-numbers" defaultChecked />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="require-special">
										Require Special Characters
									</Label>
									<p className="text-muted-foreground text-sm">
										Passwords must contain special characters
									</p>
								</div>
								<Switch id="require-special" defaultChecked />
							</div>
							<Separator />
							<div className="space-y-2">
								<Label htmlFor="password-expiry">
									Password Expiry
								</Label>
								<Select defaultValue="90days">
									<SelectTrigger id="password-expiry">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="never">
											Never
										</SelectItem>
										<SelectItem value="30days">
											30 Days
										</SelectItem>
										<SelectItem value="60days">
											60 Days
										</SelectItem>
										<SelectItem value="90days">
											90 Days
										</SelectItem>
										<SelectItem value="180days">
											180 Days
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Session Management</CardTitle>
							<CardDescription>
								Configure user session settings
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="session-timeout">
									Session Timeout
								</Label>
								<Select defaultValue="24hours">
									<SelectTrigger id="session-timeout">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1hour">
											1 Hour
										</SelectItem>
										<SelectItem value="8hours">
											8 Hours
										</SelectItem>
										<SelectItem value="24hours">
											24 Hours
										</SelectItem>
										<SelectItem value="7days">
											7 Days
										</SelectItem>
										<SelectItem value="never">
											Never
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="remember-me">
										Remember Me
									</Label>
									<p className="text-muted-foreground text-sm">
										Allow users to stay logged in
									</p>
								</div>
								<Switch id="remember-me" defaultChecked />
							</div>
							<Separator />
							<div className="space-y-2">
								<Label>Active Sessions</Label>
								<p className="text-muted-foreground text-sm">
									Manage all active user sessions
								</p>
								<div className="flex gap-2">
									<Button variant="outline">
										View All Sessions
									</Button>
									<Button variant="destructive">
										Revoke All Sessions
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Two-Factor Authentication</CardTitle>
							<CardDescription>
								Add an extra layer of security
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="2fa-enabled">
										Enable 2FA
									</Label>
									<p className="text-muted-foreground text-sm">
										Require two-factor authentication for all
										users
									</p>
								</div>
								<Switch id="2fa-enabled" />
							</div>
							<Separator />
							<div className="space-y-2">
								<Label htmlFor="2fa-method">
									2FA Method
								</Label>
								<Select defaultValue="totp">
									<SelectTrigger id="2fa-method">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="totp">
											Authenticator App (TOTP)
										</SelectItem>
										<SelectItem value="sms">
											SMS Verification
										</SelectItem>
										<SelectItem value="email">
											Email Verification
										</SelectItem>
										<SelectItem value="hardware">
											Hardware Key
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="integrations" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Connected Services</CardTitle>
							<CardDescription>
								Manage third-party integrations
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between border-b pb-4">
								<div className="space-y-1">
									<Label>Slack</Label>
									<p className="text-muted-foreground text-sm">
										Receive notifications in Slack channels
									</p>
								</div>
								<Badge variant="default">Connected</Badge>
							</div>
							<div className="flex items-center justify-between border-b pb-4">
								<div className="space-y-1">
									<label
										htmlFor="microsoft"
										className="text-sm font-medium"
									>
										Microsoft 365
									</label>
									<p className="text-muted-foreground text-sm">
										Sync with Microsoft services
									</p>
								</div>
								<Badge variant="secondary">Not Connected</Badge>
							</div>
							<div className="flex items-center justify-between border-b pb-4">
								<div className="space-y-1">
									<Label>Google Workspace</Label>
									<p className="text-muted-foreground text-sm">
										Integrate with Google apps
									</p>
								</div>
								<Badge variant="secondary">Not Connected</Badge>
							</div>
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label>Zoom</Label>
									<p className="text-muted-foreground text-sm">
										Schedule audit meetings via Zoom
									</p>
								</div>
								<Badge variant="default">Connected</Badge>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>API Access</CardTitle>
							<CardDescription>
								Manage API keys and webhooks
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label>API Keys</Label>
								<p className="text-muted-foreground text-sm">
									Generate API keys for programmatic access
								</p>
								<Button variant="outline">
									Generate New API Key
								</Button>
							</div>
							<Separator />
							<div className="space-y-2">
								<Label>Webhooks</Label>
								<p className="text-muted-foreground text-sm">
									Configure webhooks for real-time updates
								</p>
								<Button variant="outline">
									Configure Webhooks
								</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="audit" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Audit Defaults</CardTitle>
							<CardDescription>
								Set default values for new audits
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="default-priority">
									Default Priority
								</Label>
								<Select defaultValue="medium">
									<SelectTrigger id="default-priority">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="low">Low</SelectItem>
										<SelectItem value="medium">
											Medium
										</SelectItem>
										<SelectItem value="high">High</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Separator />
							<div className="space-y-2">
								<Label htmlFor="default-duration">
									Default Duration
								</Label>
								<Select defaultValue="1week">
									<SelectTrigger id="default-duration">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1day">1 Day</SelectItem>
										<SelectItem value="3days">
											3 Days
										</SelectItem>
										<SelectItem value="1week">
											1 Week
										</SelectItem>
										<SelectItem value="2weeks">
											2 Weeks
										</SelectItem>
										<SelectItem value="1month">
											1 Month
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="auto-assign">
										Auto-Assign Audits
									</Label>
									<p className="text-muted-foreground text-sm">
										Automatically assign auditors based on
										workload
									</p>
								</div>
								<Switch id="auto-assign" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Workflows</CardTitle>
							<CardDescription>
								Configure audit workflow steps
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label>Workflow Stages</Label>
								<p className="text-muted-foreground text-sm">
									Drag to reorder audit workflow stages
								</p>
								<div className="space-y-2">
									{[
										"Planning",
										"Fieldwork",
										"Reporting",
										"Review",
										"Finalization",
									].map((stage, index) => (
										<div
											key={stage}
											className="flex items-center justify-between border rounded-md p-3"
										>
											<div className="flex items-center gap-3">
												<Badge variant="outline">
													{index + 1}
												</Badge>
												<span>{stage}</span>
											</div>
											<Button variant="ghost" size="sm">
												Edit
											</Button>
										</div>
									))}
								</div>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="require-approval">
										Require Approval
									</Label>
									<p className="text-muted-foreground text-sm">
										Audits must be approved before completion
									</p>
								</div>
								<Switch id="require-approval" defaultChecked />
							</div>
							<Separator />
							<div className="space-y-2">
								<Label htmlFor="approvers">
									Default Approvers
								</Label>
								<Select>
									<SelectTrigger id="approvers">
										<SelectValue placeholder="Select approvers" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="managers">
											All Managers
										</SelectItem>
										<SelectItem value="admins">
											All Admins
										</SelectItem>
										<SelectItem value="specific">
											Specific Users
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Scoring & Metrics</CardTitle>
							<CardDescription>
								Configure audit scoring methodology
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="scoring-method">
									Scoring Method
								</Label>
								<Select defaultValue="weighted">
									<SelectTrigger id="scoring-method">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="weighted">
											Weighted Average
										</SelectItem>
										<SelectItem value="simple">
											Simple Average
										</SelectItem>
										<SelectItem value="pass-fail">
											Pass/Fail
										</SelectItem>
										<SelectItem value="custom">
											Custom Formula
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Separator />
							<div className="space-y-2">
								<Label htmlFor="pass-threshold">
									Pass Threshold
								</Label>
								<Input
									id="pass-threshold"
									type="number"
									defaultValue="70"
									min="0"
									max="100"
								/>
								<p className="text-muted-foreground text-sm">
									Score required to pass audit
								</p>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<Label htmlFor="auto-calculate">
										Auto-Calculate Scores
									</Label>
									<p className="text-muted-foreground text-sm">
										Automatically calculate scores from responses
									</p>
								</div>
								<Switch id="auto-calculate" defaultChecked />
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
