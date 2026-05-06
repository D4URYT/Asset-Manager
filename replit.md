# BusinessDash — Business Management Dashboard

A full-stack enterprise web portal with dashboard analytics, user/product/customer/post management, and authentication.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/dashboard run dev` — run the React dashboard (port 23183)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec (then fix `lib/api-zod/src/index.ts` to remove duplicate `./generated/types` export)
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)
- Default admin: `admin@empresa.com` / `admin123`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5, bearer token auth (in-memory token store)
- DB: PostgreSQL + Drizzle ORM
- Frontend: React + Vite + Wouter + TanStack Query + shadcn/ui + Recharts
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- DB schema: `lib/db/src/schema/` (users, products, customers, posts, activity)
- API spec: `lib/api-spec/openapi.yaml`
- Generated hooks: `lib/api-client-react/src/generated/api.ts`
- Generated Zod schemas: `lib/api-zod/src/generated/api.ts`
- API routes: `artifacts/api-server/src/routes/` (auth, users, products, customers, posts, dashboard)
- Frontend pages: `artifacts/dashboard/src/pages/`
- Auth utilities: `artifacts/api-server/src/lib/auth.ts`
- Seed data: `artifacts/api-server/src/lib/seed.ts`

## Architecture decisions

- Bearer token auth stored in-memory on server (tokens lost on restart) + localStorage on client — simple, no sessions/cookies needed
- `setAuthTokenGetter` from `@workspace/api-client-react` (main export) wires up auto-auth on every API call
- Orval generates both Zod validators (api-zod) and React Query hooks (api-client-react) from a single OpenAPI spec
- After codegen, `lib/api-zod/src/index.ts` must export only `./generated/api` (not `./generated/types`) to avoid TS2308 duplicate export errors
- Dashboard analytics endpoints return computed/seeded data; product distribution uses real DB aggregation

## Product

- Login / Register with session persistence
- Dashboard home: KPI cards (users, products, customers, revenue), monthly sales line chart, user growth bar chart, product distribution pie chart, recent activity feed
- Users CRUD: searchable/filterable table, role/status management, create/edit/delete modals
- Products CRUD: searchable by name/category/status, stock tracking, price management
- Customers CRUD: company/phone/purchase totals, status filtering
- Posts CRUD: title/content/category/status/author, publish workflow
- Settings: profile section, dark mode toggle
- Collapsible sidebar navigation, dark/light mode toggle, responsive layout

## Gotchas

- After `pnpm --filter @workspace/api-spec run codegen`, manually fix `lib/api-zod/src/index.ts` to only export `./generated/api` — orval regenerates it with duplicate exports that cause TS errors
- Token store is in-memory; restarting the API server logs everyone out
- `price` and `totalPurchases` are stored as `numeric` in Postgres and serialized as `parseFloat()` in route handlers

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
