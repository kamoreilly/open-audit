import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Logo size={32} />
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Open Source Audit Management
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Streamline your audit workflows with a powerful, open-source platform.
            Track findings, manage compliance, and collaborate with your team.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login">
              <Button size="lg">Get Started</Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-center text-3xl font-bold">Features</h2>
          <p className="text-muted-foreground mb-12 text-center">
            Everything you need to manage audits effectively
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Audit Tracking</CardTitle>
                <CardDescription>
                  Track and manage all your audits in one place with comprehensive
                  dashboards and reports.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Findings Management</CardTitle>
                <CardDescription>
                  Document, categorize, and track findings from discovery to resolution
                  with full audit trails.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Work together seamlessly with real-time updates, comments, and
                  notifications for your audit team.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Reporting</CardTitle>
                <CardDescription>
                  Generate detailed compliance reports for audits, standards, and
                  regulatory requirements.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Open Source</CardTitle>
                <CardDescription>
                  Fully open-source and self-hostable. Maintain full control over your
                  audit data and infrastructure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customizable Workflows</CardTitle>
                <CardDescription>
                  Adapt the platform to your needs with customizable audit templates,
                  workflows, and approval processes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Open Audit. Open source audit management.
            </div>
            <div className="flex gap-4 text-sm">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                Documentation
              </a>
              <Link to="/login" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
