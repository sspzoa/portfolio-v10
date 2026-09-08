# AGENTS.md

## Project intent

`portfolio-v10` is Seungpyo Suh's Korean, single-page portfolio at `https://sspzoa.io`. Notion is the content source. Keep the site readable, accessible, and minimal: one reading column, simple typography, whitespace, and thin rules.

Make changes for actual product requirements. Installed libraries are available infrastructure, not a requirement to introduce more state, API endpoints, wrappers, or abstraction layers. Preserve unrelated working-tree changes.

## Stack and commands

Use Bun for dependency management, scripts, and tests. Next.js App Router runs on Node.js; installing packages with Bun does not make Next.js a Bun server. Exact dependency versions belong in `package.json` and `bun.lock`.

- Rendering: React Server Components, React Compiler, and Next.js metadata routes.
- Styling: UnoCSS Wind3, PostCSS, and CSS custom properties.
- APIs: Elysia with Eden from `@elysia/eden`.
- Client infrastructure: Jotai and TanStack Query.
- Content: Notion HTTP API, Zod validation, and synchronous `react-markdown`.
- Quality: Bun tests, Biome, TypeScript, and the Next.js production build.

| Command | Purpose |
| --- | --- |
| `bun install` | Install dependencies from the project manifest and lockfile |
| `bun run dev` | Start the development server |
| `bun run check` | Run tests, lint, and the production build with type checking |
| `bun run test` | Run Bun tests |
| `bun run lint` | Check formatting and lint rules |
| `bun run build` | Build the production application |
| `bun run start` | Serve the production build |
| `bun outdated` | Review available dependency updates |

Run `bun run check` for application or build-configuration changes. Documentation-only changes need a content and diff review. Keep dependency updates scoped, update `bun.lock`, and align runtime type packages with supported runtimes. Keep UnoCSS packages pinned to the same version; its PostCSS integration is experimental.

## Code ownership and dependencies

| Location | Responsibility |
| --- | --- |
| `src/app` | Next.js routes, root layout, provider composition, metadata endpoints, error boundaries, and document styles |
| `src/app/api/[[...slugs]]/route.ts` | Thin Next.js adapter exporting supported HTTP handlers from `apiApp.fetch` |
| `src/app/app-providers.tsx` | Jotai and TanStack Query client provider boundary |
| `src/client/api.ts` | Application-specific Eden HTTP client factory |
| `src/server/api` | Elysia application composition and the server-side Eden client |
| `src/server/env.ts` | Lazy server credential validation |
| `src/server/notion` | Feature-independent HTTP transport, pagination, raw schemas, property readers, and integration errors |
| `src/features/portfolio/model` | Canonical Zod entity schemas and inferred domain types |
| `src/features/portfolio/server` | Notion source configuration, page schemas, mapping, repository, and safe section error messages |
| `src/features/portfolio/portfolio-page.tsx` | Page composition |
| `src/features/portfolio/portfolio-content.tsx` | Concurrent section loading and complete server-rendered content |
| `src/features/portfolio/ui` | Typed presentation, sections, and reusable entry components |
| `src/features/portfolio/config` | Static public profile, canonical URLs, SEO metadata, and JSON-LD |
| `src/features/portfolio/og-image.tsx` | Social image generation from static copy and bundled fonts |
| `src/shared` | Feature-independent helpers, Markdown presentation, and QueryClient lifecycle |
| `tests` | Test setup and cross-layer API, Eden, and typography checks |
| `tools/postcss` | CSS configuration dependency tracking |

Next.js routes and Elysia compose features; features depend on domain types, shared utilities, and generic Notion infrastructure. `src/server/api` may import features; `src/server/notion` and `src/shared` must not. Domain models have no React or server imports. Feature server modules have no UI imports. Presentation components receive typed data and do not call repositories or read credentials.

Use explicit imports. Do not introduce barrel files mixing client and server modules. Guard credential access, the authenticated Notion client, repositories, and API server entry points with `server-only`. The browser Eden client may import `ApiApp` using `import type`; it must not import the Elysia instance at runtime.

Use English identifiers, descriptive kebab-case filenames, and named exports except where framework or tooling entry points require defaults. Follow existing domain terminology, including `Certificate`, `certificateSchema`, and `fetchEducation`. Keep the Notion source key `educations` unchanged. Do not add code comments unless requested.

## Rendering and client state

The home route declares `force-dynamic`, exports static metadata, emits JSON-LD, and composes `PortfolioPage`. Keep content fetching in the portfolio server repository.

Start section requests concurrently and await all results before rendering portfolio content. The initial HTML must include every nonempty successful section and collapsed project descriptions. Omit empty sections; show a safe error for a failed section while preserving the others. Do not introduce section Suspense boundaries or a loading route that streams the portfolio into hidden replacement containers.

Main projects remain visible. Side projects use an initially closed native `details` element, and nested descriptions also use native `details`. Mouse and keyboard must expand existing markup without client fetching, conditional mounting, or `aria-hidden` on the content.

Jotai and TanStack Query currently provide infrastructure; the portfolio does not require atoms or client queries. Use Jotai only for genuine client state and TanStack Query for client API data when a feature needs them. Keep native disclosures state-free. Pass Server Components through provider `children` rather than importing server modules into Client Components.

Each server render gets an isolated Jotai store and QueryClient. `createQueryClient` creates a new cache; `getQueryClient` reuses one only in the browser. The default query stale time is 60 seconds. Never share a mutable server cache between users.

## Elysia and Eden

Keep `apiApp` in `src/server/api/app.ts` with the `/api` prefix and chained route definitions so Eden retains inferred route types. Export `ApiApp = typeof apiApp`. The Next.js adapter uses the Node.js runtime and exports only the HTTP methods implemented by the application.

The current API exposes static public profile data at `/api` and application availability at `/api/health`. Neither endpoint queries Notion; the health endpoint is not a Notion connectivity check.

Use `createApiClient(origin, options)` for HTTP calls, passing the current browser origin for same-origin requests. Use `serverApi` from `src/server/api/client.ts` for direct server-side Eden calls without HTTP. Check Eden's `error` before consuming `data`; a TanStack Query query function must throw on failure rather than cache an Eden error result as successful data. Do not route existing server-rendered Notion reads through HTTP merely to use Eden.

## Notion and content contracts

Keep `NOTION_TOKEN` in ignored `.env.local`. Validate credentials lazily. Never expose tokens in client code, HTML, serialized state, logs, or user-facing errors.

Preserve these transport and repository guarantees:

- API version `2025-09-03`, uncached requests, and a 15-second timeout covering response body consumption.
- Three total attempts with 1-second and 2-second backoff for retryable failures. Treat HTTP 429 as transient.
- Existing source IDs, property contracts, and sorting in `sources.ts`.
- Complete cursor pagination with safe failures for missing or repeated cursors and malformed responses.
- Raw page validation before mapping and domain validation after mapping.

Keep awards, certificates, and education separate. Ongoing date labels are opt-in for careers, experience, and education; projects and single-day activities retain date labels.

Render Markdown synchronously with `react-markdown`. Preserve CommonMark, Unicode bullet normalization, and raw HTML as literal escaped text. Allow only HTTP, HTTPS, and mailto links. Do not add `rehype-raw`, client Markdown hooks, or unmanaged Markdown image loading. Add plugins only for a concrete content requirement.

## Styling, accessibility, and metadata

`src/app/styles/tokens.css` owns design tokens. `uno.config.ts` maps them to utilities and defines source scanning. `src/app/globals.css` owns document basics and loads the Tailwind v4-compatible reset; this is not a Tailwind compiler dependency. Component styles live in JSX utility classes.

Use statically extractable UnoCSS utilities directly in JSX. Keep utilities visible on the elements by default. Use a shortcut only for a substantial repeated combination, such as `disclosure-summary`; keep per-instance spacing and sizing on the element. Do not create shortcuts for one-off styles or simple utility combinations. Keep global CSS limited to imports, document defaults, accessibility, motion preferences, and custom keyframes. Preserve complete literal utility alternatives for dynamic variants rather than constructing class names. OG image rendering uses inline styles because its image renderer does not consume the page stylesheet. Custom font sizes must inherit line height unless a component deliberately overrides it; UnoCSS's default line-height fallback previously compressed entry headings and captions.

Preserve `tools/postcss/config-dependencies.cjs` in the PostCSS pipeline so UnoCSS configuration changes invalidate CSS caches. Verify configuration changes against generated CSS and the running page; a passing build alone does not prove that cached styles refreshed.

Respect system light/dark and reduced-motion preferences. Preserve skip links, visible keyboard focus, responsive layouts, and the security headers in `next.config.ts`, including CSP. Styling must remain build-generated and available before JavaScript executes.

Canonical URLs use `https://sspzoa.io`. Metadata and JSON-LD use static public configuration without querying Notion. Preserve safe JSON-LD serialization. OG generation uses the bundled, renamed Pretendard 1.3.9 subsets in `assets/fonts`; retain their OFL license and refresh glyph coverage when changing Korean OG copy. Image generation must work offline.

## Verification

Tests use Bun with `tests/setup.ts` preloaded by `bunfig.toml`. The only globally mocked module is `server-only`. Use injected transports, local handlers, fixtures, or scoped spies for data tests; never call live Notion from tests. Restore modified environment values and spies after each test.

Keep unit tests beside their modules and cross-layer checks in `tests`. Add focused regression coverage for changed behavior rather than tests that only restate implementation details.

For UI or CSS changes, verify the actual page at desktop and mobile widths, keyboard interaction, and relevant color or motion modes. Check initial response HTML when modifying rendering or providers. Verify API status codes, Eden error handling, and type inference when changing API contracts. Report the checks performed and any remaining limitations; do not claim browser validation from unit tests alone.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
