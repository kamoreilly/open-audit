# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
bun run dev          # Start all applications (web app on :3001)
bun run dev:web      # Start web app only
bun install          # Install dependencies
```

### Building
```bash
bun run build        # Build all applications
bun run check-types  # Type checking
```

### Database
```bash
bun run db:push      # Push schema changes to database
bun run db:studio    # Open Drizzle Studio (database UI)
bun run db:generate  # Generate migrations
bun run db:migrate   # Run migrations
```

## Architecture

**Open Audit** is a Better-T-Stack monorepo using Turborepo + Bun workspaces. The architecture follows a type-safe, full-stack pattern with TanStack Start (SSR), oRPC, Better-Auth, and Drizzle ORM.

### Monorepo Structure

```
apps/web/           # Fullstack SSR app (TanStack Start + React)
packages/
  api/              # API layer (oRPC routers - public/protected procedures)
  auth/             # Better-Auth configuration
  db/               # Database layer (Drizzle schema, client)
  env/              # Environment variables validation (server/web)
  config/           # Shared TypeScript configuration
```

### Key Architectural Patterns

1. **Type-Safe API Layer (oRPC)**: Server procedures defined in `/packages/api/src/routers/` are consumed via auto-generated type-safe client. Use `publicProcedure` for unauthenticated endpoints, `protectedProcedure` for authenticated endpoints.

2. **File-Based Routing**: Routes defined as files in `/apps/web/src/routes/` with TanStack Router. Protected routes use `beforeLoad` to check authentication and redirect to `/login` if needed.

3. **Authentication Flow**: Requests → `/api/auth/*` (Better-Auth handler) → Session stored in database/cookies → oRPC context reads session → Protected procedures validate session.

4. **Server-Side Rendering**: Context created per-request with session info. Server functions use `createServerFn`. Use `authMiddleware` for server functions requiring authentication.

### Technology Stack

- **Framework**: TanStack Start (SSR), React 19, Vite 7, TypeScript 5
- **Styling**: TailwindCSS 4, shadcn/ui (base-lyra theme, dark mode default)
- **API**: oRPC (type-safe), OpenAPI auto-docs at `/api/rpc/api-reference`
- **Auth**: Better-Auth (email/password, session-based)
- **Database**: PostgreSQL + Drizzle ORM
- **State**: TanStack Query, TanStack Form
- **Build**: Turborepo + Bun

### Important Paths

- `/packages/api/src/index.ts` - API procedure definitions
- `/packages/auth/src/index.ts` - Better-Auth instance setup
- `/packages/db/src/schema/auth.ts` - Database schema (user, session, account, verification)
- `/apps/web/src/routes/__root.tsx` - Root layout with providers
- `/apps/web/src/utils/orpc.ts` - oRPC client setup
- `/apps/web/src/middleware/auth.ts` - Auth middleware for server functions

### Development Patterns

**API Route**: Add procedure to `/packages/api/src/routers/index.ts`, access via `orpc.myRoute.mutate()` or `useQuery(orpc.myRoute.queryOptions())`

**Protected Route**: Use `beforeLoad` to check session with `getUser()` and redirect if unauthenticated

**Database Query**: Import from `@open-audit/db` and use `db.select().from(schema.user)`

**Environment**: Use `@open-audit/env/server` or `@open-audit/env/web` for validated env vars

### Configuration

- **Port**: Web app runs on `http://localhost:3001`
- **Database**: Configure `DATABASE_URL` in `/apps/web/.env`
- **TypeScript**: Strict mode enabled with `noUncheckedIndexedAccess`
- **Dark Mode**: Enabled by default via `next-themes`
