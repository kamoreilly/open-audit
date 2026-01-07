# AGENTS.md

Working rules for the Open Audit codebase. This document defines exact patterns, conventions, and architectural decisions. Follow these rules to minimize errors and maintain consistency.

---

## TECHNOLOGY STACK

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | TanStack Start | SSR framework with file-based routing |
| Language | TypeScript 5 | Strict mode, `noUncheckedIndexedAccess` enabled |
| Runtime | Bun 1.3+ | Package manager and runtime |
| Build | Turborepo | Monorepo orchestration |
| Database | PostgreSQL | Primary data store |
| ORM | Drizzle ORM | Type-safe database queries |
| API | oRPC | End-to-end type-safe procedures |
| Validation | Zod 4 | Schema validation and type inference |
| Auth | Better-Auth | Session-based authentication |
| Styling | TailwindCSS 4 | Utility-first CSS |
| UI | shadcn/ui | Component library (base-lyra theme) |
| State | TanStack Query | Server state management |
| Forms | TanStack Form | Form handling with validation |

---

## MONOREPO STRUCTURE

```
open-audit/
├── apps/
│   └── web/                    # TanStack Start SSR app (port 3001)
├── packages/
│   ├── api/                    # oRPC procedures and context
│   ├── auth/                   # Better-Auth configuration
│   ├── db/                     # Drizzle schema and client
│   ├── env/                    # Environment validation
│   └── config/                 # Shared TypeScript config
├── turbo.json                  # Turborepo task pipeline
├── bts.jsonc                   # Better-T-Stack configuration
└── package.json                # Root workspace config
```

**Package Import Convention**: Use workspace scope `@open-audit/*` for cross-package imports.

```typescript
// Correct
import { db } from "@open-audit/db";
import { auth } from "@open-audit/auth";
import { orpc } from "@/utils/orpc"; // Local app import

// Incorrect - never use relative paths for cross-package imports
import { db } from "../../../db/src/index";
```

---

## DATABASE (DRIZZLE ORM)

### Schema Definition

**Location**: `/packages/db/src/schema/`

**Rules**:
1. One table per file. Group related tables in the same directory.
2. Use `pgTable()` for all table definitions.
3. Define columns with explicit types: `text()`, `timestamp()`, `boolean()`, `integer()`.
4. Apply `.notNull()` to all required fields.
5. Apply `.unique()` to unique constraints.
6. Use `references()` for foreign keys with `onDelete: "cascade"` for dependent data.

```typescript
// packages/db/src/schema/audits.ts
import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth";

export const audit = pgTable(
  "audit",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    status: text("status").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("audit_user_id_idx").on(table.userId),
    index("audit_status_idx").on(table.status),
  ]
);
```

**Relations**:
- Define relations in the same file as the table using `relations()` from Drizzle.
- Use `many()` for one-to-many, `one()` for many-to-one.

```typescript
export const auditRelations = relations(audit, ({ one, many }) => ({
  user: one(user, {
    fields: [audit.userId],
    references: [user.id],
  }),
  findings: many(finding),
}));
```

### Queries

**Import from `@open-audit/db`**:

```typescript
import { db } from "@open-audit/db";
import { audit, user } from "@open-audit/db/schema";
import { eq, desc } from "drizzle-orm";

// Single record
const result = await db.query.audit.findFirst({
  where: eq(audit.id, id),
  with: {
    user: true,
    findings: true,
  },
});

// Multiple records with relations
const audits = await db.query.audit.findMany({
  where: eq(audit.userId, userId),
  orderBy: [desc(audit.createdAt)],
  with: {
    user: { columns: { id: true, name: true, email: true } },
  },
});

// Insert
const newAudit = await db.insert(audit).values({ id, title, status, userId }).returning();

// Update
await db.update(audit).set({ status }).where(eq(audit.id, id));

// Delete
await db.delete(audit).where(eq(audit.id, id));
```

### Migrations

```bash
# After schema changes, generate migration
bun run db:generate

# Apply migration to database
bun run db:migrate

# Push schema directly (development only)
bun run db:push

# View database in UI
bun run db:studio
```

**Never** manually modify the database. Always use migrations.

---

## API LAYER (oRPC)

### Procedure Definition

**Location**: `/packages/api/src/routers/`

**Router Structure**:
- Export `appRouter` object containing all procedures.
- Export `AppRouter` type for client inference.
- Group related procedures in nested objects.

```typescript
// packages/api/src/routers/index.ts
import type { RouterClient } from "@orpc/server";
import { protectedProcedure, publicProcedure } from "@open-audit/api";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => "OK"),

  audits: {
    list: protectedProcedure.handler(async ({ context }) => {
      return db.query.audit.findMany({
        where: eq(audit.userId, context.session.user.id),
      });
    }),

    create: protectedProcedure
      .input(z.object({ title: z.string().min(1) }))
      .handler(async ({ context, data }) => {
        return db.insert(audit).values({
          id: generateId(),
          title: data.title,
          userId: context.session.user.id,
        }).returning();
      }),
  },
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
```

### Context Creation

**Location**: `/packages/api/src/context.ts`

The context is created per-request and contains the session from Better-Auth.

```typescript
import { auth } from "@open-audit/auth";

export async function createContext({ req }: { req: Request }) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  return { session };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
```

### Procedure Types

**`publicProcedure`**: No authentication required. Use for health checks, public data.

**`protectedProcedure`**: Requires valid session. `context.session.user` is guaranteed to exist.

```typescript
// packages/api/src/index.ts
import { ORPCError, os } from "@orpc/server";
import type { Context } from "./context";

export const o = os.$context<Context>();

export const publicProcedure = o;

const requireAuth = o.middleware(async ({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError("UNAUTHORIZED");
  }
  return next({
    context: { session: context.session },
  });
});

export const protectedProcedure = publicProcedure.use(requireAuth);
```

### Error Handling

Throw `ORPCError` with standard codes:

```typescript
import { ORPCError } from "@orpc/server";

throw new ORPCError("NOT_FOUND", { message: "Audit not found" });
throw new ORPCError("UNAUTHORIZED");
throw new ORPCError("BAD_REQUEST", { message: "Invalid input" });
```

### Input Validation

Use Zod for input validation. The `input` method receives the validated data.

```typescript
import { z } from "zod";

const createAuditSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.enum(["financial", "compliance", "security"]),
  email: z.email(), // Zod 4 syntax
});

create: protectedProcedure
  .input(createAuditSchema)
  .handler(async ({ context, data }) => {
    // data is typed as { title: string, type: "financial" | "compliance" | "security" }
  });
```

---

## ROUTING (TanStack Start)

### File-Based Routes

**Location**: `/apps/web/src/routes/`

**Route Pattern**: `createFileRoute("/path")()` exported as `Route`.

```typescript
// apps/web/src/routes/dashboard.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  return <div>Dashboard</div>;
}
```

### Protected Routes

Use `beforeLoad` to check authentication and redirect if needed. Call a server function to securely verify the session.

```typescript
import { createFileRoute, redirect } from "@tanstack/react-router";
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
  component: DashboardComponent,
});
```

The `getUser` server function is defined in `/apps/web/src/functions/get-user.ts`:

```typescript
import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/middleware/auth";

export const getUser = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return context.session;
  });
```

**Note**: Session data returned from `beforeLoad` is available in `context` for the component and nested routes.

### Loaders (Data Fetching)

Loaders execute on BOTH server and client. **Never** put sensitive logic directly in loaders.

```typescript
// ❌ WRONG - exposes secrets to client
export const Route = createFileRoute("/api-keys")({
  loader: () => {
    return db.query.apiKey.findMany(); // Exposes database to client
  },
});

// ✅ CORRECT - use server function
const getApiKeys = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return db.query.apiKey.findMany({
      where: eq(apiKey.userId, context.session.user.id),
    });
  });

export const Route = createFileRoute("/api-keys")({
  loader: () => getApiKeys(),
});
```

### Server Functions

Use `createServerFn` for server-only operations.

```typescript
import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/middleware/auth";
import { zodValidator } from "@tanstack/react-start/server";
import { z } from "zod";

export const createAudit = createServerFn()
  .validator(zodValidator(z.object({ title: z.string() })))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const result = await db.insert(audit).values({
      id: generateId(),
      title: data.title,
      userId: context.session.user.id,
    }).returning();
    return result[0];
  });
```

### Route Context

Access oRPC and queryClient via route context:

```typescript
export const Route = createFileRoute("/dashboard")({
  loader: async ({ context }) => {
    const audits = await context.orpc.audits.list.queryOptions();
    return context.queryClient.ensureQueryData(audits);
  },
});
```

---

## AUTHENTICATION (Better-Auth)

### Server Configuration

**Location**: `/packages/auth/src/index.ts`

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "@open-audit/db";
import * as schema from "@open-audit/db/schema/auth";
import { env } from "@open-audit/env/server";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  trustedOrigins: [env.CORS_ORIGIN],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [tanstackStartCookies()],
});
```

### Auth Handler

**Location**: `/apps/web/src/routes/api/auth/$.ts`

All auth requests flow through this handler using TanStack Start's file route pattern.

```typescript
import { auth } from "@open-audit/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => auth.handler(request),
      POST: ({ request }) => auth.handler(request),
    },
  },
});
```

### Client Usage

**Auth Client**: `/apps/web/src/lib/auth-client.ts`

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({});
```

> **Note**: The `baseURL` is automatically inferred from the current origin. Only specify it if using a different auth server.

**Sign In**:

```typescript
await authClient.signIn.email({
  email: "user@example.com",
  password: "password",
});
```

**Sign Out**:

```typescript
await authClient.signOut();
```

**Get Session**:

```typescript
const { data: session } = await authClient.getSession();
```

### Session in Components

For components that need session data, fetch via oRPC or use auth client.

```typescript
// Via oRPC (recommended for server data)
const { data: privateData } = await orpc.privateData.query();

// Via auth client (for simple session check)
const { data: session } = await authClient.getSession();
```

---

## UI COMPONENTS

### shadcn/ui Components

**Location**: `/apps/web/src/components/ui/`

**Usage**: Import directly from `@/components/ui/*`.

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
```

**Styling Rules**:
- Dark mode is default (`className="dark"` on `<html>` in `__root.tsx`).
- Use Tailwind utility classes for layout and spacing.
- Use semantic color tokens: `text-primary`, `bg-muted`, `border-destructive`.
- Never use arbitrary color values like `#ff0000` or `bg-blue-500`.

### Component Patterns

**Buttons**: Use semantic variants.

```typescript
<Button variant="default">Primary action</Button>
<Button variant="destructive">Dangerous action</Button>
<Button variant="outline">Secondary action</Button>
<Button variant="ghost">Tertiary action</Button>
```

**Forms**: Use TanStack Form with Zod validation.

```typescript
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const form = useForm({
  defaultValues: { title: "" },
  onSubmit: async ({ value }) => {
    await orpc.audits.create.mutate(value);
  },
  validators: {
    onSubmit: z.object({ title: z.string().min(1) }),
  },
});
```

**Tables**: Use the reusable `DataTable` component for consistent data tables.

```typescript
import { DataTable } from "@/components/data-table";
import { audits, type Audit } from "@open-audit/db/schema";

const columns: ColumnDef<Audit>[] = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "status", header: "Status" },
];

<DataTable columns={columns} data={audits} />
```

### Icons

Use **lucide-react** for icons.

```typescript
import { Search, Plus, Settings } from "lucide-react";

<Search className="h-4 w-4" />
```

---

## TYPE SAFETY RULES

1. **Never use `any`**. Use `unknown` for truly dynamic data, then validate with Zod.
2. **Enable strict mode**. All TypeScript strict options are enabled.
3. **Type inference**. Rely on inferred types from Drizzle, oRPC, and TanStack Query.
4. **Explicit returns**. Always specify return types for exported functions.

```typescript
// ❌ WRONG
async function getData(a: any) {
  return JSON.parse(a);
}

// ✅ CORRECT
async function getData(raw: string): Promise<UserData> {
  const parsed = unknownSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) throw new ORPCError("BAD_REQUEST");
  return parsed.data;
}
```

---

## ERROR HANDLING

### Server Errors (oRPC)

```typescript
import { ORPCError } from "@orpc/server";

throw new ORPCError("NOT_FOUND", { message: "Audit not found" });
```

### Client Errors (TanStack Query)

The query client is configured with global error handling that displays toasts.

```typescript
// In utils/orpc.ts
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      toast.error(`Error: ${error.message}`, {
        action: { label: "retry", onClick: query.invalidate },
      });
    },
  }),
});
```

### Form Errors

Use TanStack Form's built-in validation with Zod. Define validators at the form level.

```typescript
<form.Field name="title">
  {(field) => (
    <div className="space-y-2">
      <Label htmlFor={field.name}>Title</Label>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.errors.map((error) => (
        <p key={error?.message} className="text-destructive text-sm">
          {error?.message}
        </p>
      ))}
    </div>
  )}
</form.Field>
```

---

## SOLID PRINCIPLES IN THIS STACK

### Single Responsibility

- **API procedures**: Each procedure does one thing. Don't mix validation, business logic, and data fetching in one block.
- **Components**: One component per file. Extract complex logic into custom hooks.
- **Database schema**: One table per file. Relations defined alongside the table.

### Open/Closed

- **oRPC routers**: Add new procedures without modifying existing ones.
- **Middleware**: Chain middleware without altering handler logic.
- **UI components**: Use shadcn/ui as base, compose for specific use cases.

### Liskov Substitution

- **Procedure types**: `protectedProcedure` is a subtype of `publicProcedure`. Any context using `publicProcedure` works with `protectedProcedure`.
- **Database queries**: `db.query.audit.findMany()` returns consistent structure regardless of relations included.

### Interface Segregation

- **Context types**: Only include what the procedure needs. Don't pass full request object if only headers needed.
- **Component props**: Split large prop interfaces into focused ones.

### Dependency Inversion

- **oRPC client**: Components depend on `orpc` abstraction, not fetch implementation.
- **Database client**: Procedures use `db` interface, not direct Postgres connection.
- **Environment**: Import from `@open-audit/env/server` or `/web`, never `process.env` directly.

---

## DEVELOPMENT COMMANDS

```bash
# Development
bun run dev          # Start all apps (web on :3001)
bun run dev:web      # Start web app only

# Database
bun run db:push      # Push schema to database (dev only)
bun run db:studio    # Open Drizzle Studio
bun run db:generate  # Generate migration
bun run db:migrate   # Run migrations

# Building
bun run build        # Build all apps
bun run check-types  # Type check all packages

# Dependencies
bun install          # Install dependencies
```

---

## ENVIRONMENT VARIABLES

### Validation

**Location**: `/packages/env/src/`

Environment variables are validated using `@t3-oss/env-core` with Zod schemas.

**Server Environment** (`/packages/env/src/server.ts`):

```typescript
import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    CORS_ORIGIN: z.url(),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
```

**Client Environment** (`/packages/env/src/web.ts`):

```typescript
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    // Add client-side env vars here with VITE_ prefix
  },
  runtimeEnv: (import.meta as any).env,
  emptyStringAsUndefined: true,
});
```

**Rules**:
1. **Never** use `process.env` directly. Import from `@open-audit/env/server` or `@open-audit/env/web`.
2. All environment variables must be validated with Zod schemas.
3. Server-side variables should never be exposed to the client.
4. Client-side variables must use the `VITE_` prefix.

---

## SECURITY RULES

1. **Never expose secrets in client code**. Use server functions for sensitive operations.
2. **Validate all inputs**. Use Zod schemas at API boundaries.
3. **Use protected procedures** for authenticated operations.
4. **SQL injection protection**: Drizzle ORM prevents this. Never concatenate SQL strings.
5. **XSS protection**: React escapes by default. Never use `dangerouslySetInnerHTML` with user content.
6. **CSRF protection**: Better-Auth handles this via session cookies.
7. **Rate limiting**: Configure in Better-Auth for sensitive endpoints.

---

## TESTING CONVENTIONS

```typescript
// API procedure tests
import { appRouter } from "@open-audit/api/routers";
import { createContext } from "@open-audit/api/context";

const mockReq = new Request("http://localhost");
const ctx = await createContext({ req: mockReq });

const caller = appRouter.createCaller(ctx);

test("audits.list returns user audits", async () => {
  const result = await caller.audits.list();
  expect(result).toHaveLength(1);
});
```

---

## COMMON PATTERNS

### Paginated List

```typescript
// API
list: protectedProcedure
  .input(z.object({ page: z.number().default(1), limit: z.number().default(20) }))
  .handler(async ({ context, data }) => {
    const offset = (data.page - 1) * data.limit;
    return db.query.audit.findMany({
      where: eq(audit.userId, context.session.user.id),
      limit: data.limit,
      offset,
      orderBy: [desc(audit.createdAt)],
    });
  }),
```

### Search/Filter

```typescript
// API
import { sql, ilike, or, and } from "drizzle-orm";

search: protectedProcedure
  .input(z.object({ query: z.string() }))
  .handler(async ({ context, data }) => {
    return db.query.audit.findMany({
      where: and(
        eq(audit.userId, context.session.user.id),
        or(
          ilike(audit.title, `%${data.query}%`),
          ilike(audit.description, `%${data.query}%`)
        )
      ),
    });
  }),
```

### CRUD Resource

```typescript
// Full CRUD pattern for a resource
resource: {
  list: protectedProcedure.handler(/* ... */),
  byId: protectedProcedure.input(z.object({ id: z.string() })).handler(/* ... */),
  create: protectedProcedure.input(createSchema).handler(/* ... */),
  update: protectedProcedure.input(updateSchema).handler(/* ... */),
  delete: protectedProcedure.input(z.object({ id: z.string() })).handler(/* ... */),
}
```

---

## FILES TO NEVER MODIFY

1. **`turbo.json`** - Task pipeline configuration
2. **`bts.jsonc`** - Better-T-Stack configuration
3. **`apps/web/vite.config.ts`** - Vite plugins (unless adding new plugins)
4. **`apps/web/tsconfig.json`** - Path aliases
5. **Generated files**: Migration files (after committed), auto-generated types

---

## CHECKLIST BEFORE COMMIT

- [ ] TypeScript compiles without errors (`bun run check-types`)
- [ ] Database schema changes have migration (`bun run db:generate`)
- [ ] New procedures are in `appRouter` export
- [ ] Protected routes use `beforeLoad` or `authMiddleware`
- [ ] Environment variables are validated in `/packages/env/`
- [ ] Components use semantic color tokens, not arbitrary colors
- [ ] No `any` types (use `unknown` + Zod validation)
- [ ] Error handling uses `ORPCError` for API, toast for UI
