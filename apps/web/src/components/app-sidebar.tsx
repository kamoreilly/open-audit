import {
	BarChart3,
	FileText,
	Home,
	Search,
	Settings,
	Users,
	Calendar,
	CheckSquare,
	BookTemplate,
	LogOut,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useRouteContext } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

interface SidebarProps {
	className?: string;
}

export function AppSidebar({ className }: SidebarProps) {
	const { session } = useRouteContext({ strict: false });
	const navigate = useNavigate();

	const user = session?.user;
	const displayName = user?.name ?? "User";
	const displayEmail = user?.email ?? "";
	const initials = displayName
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2)
		|| "U";

	const handleSignOut = async () => {
		await authClient.signOut();
		navigate({ to: "/" });
	};

	return (
		<aside
			className={cn(
				"fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background",
				className
			)}
		>
			<div className="flex h-full flex-col">
				<div className="flex h-16 items-center gap-2 border-b px-4">
					<Logo showText={false} size={28} />
					<span className="font-semibold">Open Audit</span>
				</div>

				<nav className="flex-1 overflow-y-auto py-4">
					<div className="space-y-1 px-3">
						<p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
							Overview
						</p>
						<SidebarMenuItem href="/dashboard" icon={<Home />} label="Dashboard" isActive />
						<SidebarMenuItem href="/audits" icon={<FileText />} label="Audits" />
						<SidebarMenuItem href="/reports" icon={<BarChart3 />} label="Reports" />
					</div>

					<Separator className="my-3" />

					<div className="space-y-1 px-3">
						<p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
							Management
						</p>
						<SidebarMenuItem href="/scheduled" icon={<Calendar />} label="Scheduled" />
						<SidebarMenuItem href="/templates" icon={<BookTemplate />} label="Templates" />
						<SidebarMenuItem href="/checklists" icon={<CheckSquare />} label="Checklists" />
					</div>

					<Separator className="my-3" />

					<div className="space-y-1 px-3">
						<p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
							System
						</p>
						<SidebarMenuItem href="/search" icon={<Search />} label="Search" />
						<SidebarMenuItem href="/users" icon={<Users />} label="Team" />
						<SidebarMenuItem href="/settings" icon={<Settings />} label="Settings" />
					</div>
				</nav>

				<div className="border-t p-3">
					<div className="flex items-center gap-3 rounded-lg bg-muted p-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
							{initials}
						</div>
						<div className="flex flex-col flex-1 min-w-0">
							<span className="text-xs font-medium truncate">{displayName}</span>
							{displayEmail && (
								<span className="text-muted-foreground text-xs truncate">{displayEmail}</span>
							)}
						</div>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 shrink-0"
							onClick={handleSignOut}
							title="Sign out"
						>
							<LogOut className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</aside>
	);
}

interface SidebarMenuItemProps {
	href: string;
	icon: React.ReactNode;
	label: string;
	isActive?: boolean;
}

function SidebarMenuItem({ href, icon, label, isActive = false }: SidebarMenuItemProps) {
	return (
		<a
			href={href}
			className={cn(
				"flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
				isActive
					? "bg-accent text-accent-foreground"
					: "text-muted-foreground hover:bg-muted hover:text-foreground"
			)}
		>
			<span className="h-4 w-4">{icon}</span>
			<span>{label}</span>
		</a>
	);
}
