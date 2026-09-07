# AGENTS.md

`portfolio-v10` is Seungpyo Suh's minimal, single-page portfolio, powered by Notion.

## Commands

Use Bun exclusively. Run `bun run check` (tests, lint, production build) for application changes. Use `bun outdated` to review stable updates; keep runtime type packages aligned with the supported runtime and keep `bun.lock` current. Tests use Bun and mock only the `server-only` package in `tests/setup.ts`; they must not call live Notion.

## Architecture

- `src/app`: Next.js routes, metadata, global styles, and error boundaries. The home route only composes `PortfolioPage` and declares `force-dynamic`.
- `src/server/notion`: generic HTTP transport, pagination, raw Notion schemas, property conversion, and integration errors. This layer has no portfolio or UI dependencies.
- `src/server/env.ts`: lazy server credential validation. Keep `NOTION_TOKEN` in ignored `.env.local` and never serialize it to a client.
- `src/features/portfolio/model`: canonical Zod entity schemas and inferred types. No React or server imports.
- `src/features/portfolio/server`: source IDs and sorts, raw page contracts, mapping, repository, and user-safe error classification. No React or UI dependencies.
- `src/features/portfolio/portfolio-content.tsx`: server composition, parallel section streaming, per-section failures, and empty-state handling.
- `src/features/portfolio/ui`: pure presentation receiving typed data. Sections share entry primitives and never import repositories or read environment variables.
- `src/features/portfolio/config`: static public profile information.
- `src/shared`: reusable date formatting and safe server-rendered Markdown through `react-markdown`. No feature or server dependencies.

The dependency direction is route/composition → feature UI or repository → domain/shared or generic Notion. Use explicit imports instead of mixed client/server barrel exports. Environment, client, and repository entry points are guarded by `server-only`.

## Data behavior

Preserve API version `2025-09-03`, uncached requests, 15-second timeouts, three total attempts, 1s/2s backoff, source IDs, and sorting. Query every cursor page; malformed payloads and pagination loops must fail safely. HTTP 429 is transient, not configuration failure. Validate raw Notion payloads before mapping and domain data after mapping.

Keep awards, certificates, and education separate. An empty source omits its section; one failing source must not remove other sections.

## UI behavior

Keep one reading column, simple typography, whitespace, and thin rules. UI copy is Korean; code and identifiers are English. Use named exports except for framework-required defaults. Do not add code comments unless requested.

Main projects are visible. Side projects are always rendered into initial HTML inside a native, initially closed `details` element. Never conditionally mount, client-fetch, or mark that content `aria-hidden`. Both mouse and keyboard must expand the same existing markup. Nested project descriptions also use native `details`.

Use Server Components by default. Avoid client state for presentation. Rich text uses the synchronous `react-markdown` component for CommonMark, with HTTP/HTTPS/mailto links. Preserve Unicode bullet normalization and literal raw HTML; never add `rehype-raw`, client Markdown hooks, or unmanaged image loading. Add Markdown plugins only for content requirements. Ongoing date labels are opt-in for careers, experience, and education; single-day activities and projects must remain dates.

## Styling and security

Theme tokens live in `src/app/styles/tokens.css`; document basics in `src/app/globals.css`; feature styles in `src/features/portfolio/ui/portfolio.css`. Components use semantic class names. Respect system light/dark and reduced-motion preferences. Preserve skip links, focus indicators, CSP, and other security headers in `next.config.ts`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
