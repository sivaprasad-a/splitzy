# Splitzy

A PWA-first money management platform: shared expense circles, a personal
tracker, savings projections, PDF reporting, and (later) settlement
integrations. Full product and technical spec: [docs/Splitzy_Technical_Specification_and_User_Flows.pdf](docs/Splitzy_Technical_Specification_and_User_Flows.pdf).

## Stack

Next.js (App Router) / React 19 / TypeScript (strict) / Redux Toolkit +
RTK Query / MUI / React Hook Form + Zod / Auth.js / PostgreSQL + Prisma /
Vitest + Testing Library + Playwright / Vercel.

## Getting started

```bash
cp .env.example .env.local   # fill in secrets
docker compose up -d         # local Postgres on :5432
npm install
npm run prisma:migrate       # applies the schema, generates the client
npm run dev                  # http://localhost:3000
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` / `start` | Production build / serve |
| `npm run lint` / `typecheck` | Static checks |
| `npm run test` / `test:watch` | Vitest unit/component tests |
| `npm run test:e2e` | Playwright E2E (builds + serves first) |
| `npm run prisma:migrate` | Create/apply a local migration |
| `npm run format` / `format:write` | Prettier check / write |

## Delivery phases

1. **Foundation** (current) — PWA scaffold, design system, auth, Postgres/Prisma, CI/CD, environment isolation.
2. **Core finance** — circles, exact expense allocation, balances, manual settlement, audit trail.
3. **Personal + savings** — transactions, budgets, projections.
4. **Reports + beta** — PDF generation, privacy review, PWA install/offline.
5. **Future scale** — service extraction, background workers, corporate approvals, payment provider settlement.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the branching model and how each
phase maps to sprint branches.

## Security & correctness

Money amounts use exact minor-unit arithmetic with deterministic rounding;
every mutation is authorized server-side and recorded as an immutable audit
event. See the technical spec's Security and correctness section before
touching the ledger, auth, or reporting code paths.
