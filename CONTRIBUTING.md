# Contributing & branching model

## Environments / long-lived branches

| Branch | Environment | Protection |
| --- | --- | --- |
| `main` | Trunk / reference | PR required, no direct pushes (including admins) |
| `develop` | Development | PR required, no direct pushes (including admins) |
| `uat/testing` | UAT / staging | PR required, no direct pushes (including admins) |
| `production/release` | Production | PR required, no direct pushes (including admins), linear history only |

**Nobody — including repo admins — pushes directly to any of these four
branches.** All four are configured in GitHub branch protection with "do not
allow bypassing the above settings" enabled, so every change lands through a
reviewed pull request.

Promotion flows one direction: `develop` → `uat/testing` → `production/release`.
`main` tracks the latest foundation/reference state and is the default
branch new work branches from when a sprint branch doesn't already exist.

## Sprints and task branches

Each delivery phase from the technical spec is a sprint branch cut from
`develop`:

- `sprint-1-foundation` — PWA scaffold, design system, auth, Postgres/Prisma, CI/CD, environment isolation
- `sprint-2-core-finance` — circles, expense allocation, balances, settlement, audit trail
- `sprint-3-personal-savings` — transactions, budgets, projections
- `sprint-4-reports-beta` — PDF generation, privacy review, PWA install/offline
- `sprint-5-future-scale` — service extraction, background workers, corporate approvals, payment settlement

Within a sprint, each task gets its own branch off the sprint branch, named
`<sprint-branch>/<task-slug>`, e.g.:

```
sprint-1-foundation/nextjs-pwa-scaffold
sprint-1-foundation/design-system
sprint-1-foundation/auth
sprint-1-foundation/postgres-prisma
sprint-1-foundation/ci-cd
sprint-1-foundation/env-isolation
```

### Flow

```
task branch  --PR-->  sprint branch  --PR-->  develop  --PR-->  uat/testing  --PR-->  production/release
```

- Task branches are unprotected — push freely, force-push your own branch,
  iterate.
- Open the PR into the sprint branch as soon as the task is reviewable.
- A sprint branch merges into `develop` once its tasks are done and CI is
  green.
- `develop` promotes to `uat/testing` for staging verification, then to
  `production/release` for release. Both promotions are PRs, reviewed like
  any other change.

## Pull requests

- CI (`typecheck`, `lint`, `unit`, API & E2E, dependency scan) must pass
  before merge.
- Keep PRs scoped to one task/phase item; link back to the relevant section
  of `docs/Splitzy_Technical_Specification_and_User_Flows.pdf`.
- Squash or merge per the target branch's existing history style; avoid
  force-pushing over a reviewed PR branch once review has started.
