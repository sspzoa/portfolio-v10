# AGENTS.md

## Project intent

`portfolio-v10` is Seungpyo Suh's Korean, single-page portfolio at `https://sspzoa.io`. Notion is the content source. Keep the site readable, accessible, and minimal: one reading column, simple typography, whitespace, and thin rules.

Make changes for actual product requirements. Installed libraries are infrastructure, not a reason to introduce state, endpoints, wrappers, or abstraction layers. Preserve unrelated working-tree changes.

## Scaffold

The project was initialized with `create-solid@0.12.0 --solidstart --v2 --ts --template basic`. Keep its `src/app.tsx`, entry modules, `src/routes`, `src/components`, `src/app.css`, `src/global.d.ts`, and `~` alias conventions. Retain product-specific SSR, accessibility, security, and content guarantees when extending the scaffold.

## Stack and commands

Use Bun for dependencies, scripts, and tests. SolidStart 2 runs on Vite 8 and Nitro 3 with Node.js 24 or newer. Keep exact dependency versions in `package.json` and `bun.lock`. Keep UnoCSS packages pinned to the same version.

- Rendering: SolidJS, Solid Router, SolidStart async SSR, and `@solidjs/meta`.
- State: native Solid signals/stores and `@tanstack/solid-query` for client API caching.
- Styling: UnoCSS Wind3 through PostCSS, CSS custom properties, and the Tailwind v4-compatible reset.
- API: Elysia with Eden from `@elysia/eden`.
- Content: Notion HTTP API, Zod validation, and synchronous `markdown-it` rendering.
- Social image: request-time SVG rendering with `@resvg/resvg-js` and bundled fonts.
- Quality: Bun tests, Biome, TypeScript, and the production build.

| Command | Purpose |
| --- | --- |
| `bun install` | Install dependencies from the manifest and lockfile |
| `bun run dev` | Generate the social image and start Vite on port 3000 |
| `bun run check` | Run tests, lint, type checking, and production build |
| `bun run test` | Run Bun tests with Solid SSR JSX compilation |
| `bun run lint` | Check formatting and lint rules |
| `bun run typecheck` | Check TypeScript without emitting files |
| `bun run build` | Generate the social image and build the application |
| `bun run start` | Serve the Node production build, loading `.env.local` when present |
| `bun outdated` | Review available dependency updates |

Run `bun run check` for application or build changes. Documentation-only changes need content and diff review. Review the installed SolidStart APIs and current official documentation before changing framework configuration. Nitro uses its Node server preset locally and can target other hosts through `NITRO_PRESET`; verify the intended deployment output before publishing.

## Code ownership

| Location | Responsibility |
| --- | --- |
| `src/app.tsx` | Router, metadata and query providers, and one root Suspense boundary |
| `src/components/app-shell.tsx` | Skip link and app error boundary |
| `src/entry-client.tsx` | Solid hydration entry |
| `src/entry-server.tsx` | HTML document, assets, icons, viewport, and complete async SSR |
| `src/routes` | UI routes, thin API adapters, metadata endpoints, and 404 handling |
| `src/middleware.ts` | Response security headers and uncached dynamic responses |
| `src/app.css` and `src/tokens.css` | Document defaults and design tokens |
| `src/lib/api-client.ts` | Application-specific Eden HTTP client factory |
| `src/lib/server/api` | Elysia application and direct server Eden client |
| `src/lib/server/env.ts` | Lazy server credential validation |
| `src/lib/server/notion` | Generic HTTP transport, pagination, raw schemas, property readers, and integration errors |
| `src/lib/portfolio` | Canonical Zod entities and inferred domain types |
| `src/lib/server/portfolio` | Notion sources, page validation, mapping, repository, and concurrent section loading |
| `src/lib/portfolio-query.ts` | Solid Router query with a server-function boundary |
| `src/components/portfolio.tsx` | Page composition from typed data |
| `src/components/portfolio-content.tsx` | Section composition, safe failures, and empty-section omission |
| `src/components` | Typed presentation, sections, and entries |
| `src/lib/profile.ts` and `src/lib/seo.ts` | Static public profile, canonical URLs, SEO copy, and JSON-LD |
| `src/lib/server/og-image.ts` | Dynamic social PNG generation |
| `src/lib` | Public configuration, schemas, Markdown, API clients, and query helpers |
| `src/components/query-provider.tsx` | Request-isolated TanStack Solid Query provider |
| `src/lib/query-client.ts` | QueryClient factory with a 60-second stale time |
| `tests` | Test setup and cross-layer API, Eden, and typography checks |
| `tools/postcss` | CSS configuration dependency tracking |

Use the official basic template layout: `src/routes` for routes, `src/components` for UI, and `src/lib` for application logic. Use the built-in `~` alias; do not recreate `features/server/shared` top-level layers. Keep authenticated code inside `src/lib/server` and schemas inside `src/lib/portfolio`. Generic Notion transport must not depend on portfolio-specific mapping or UI. Domain schemas have no UI or server imports. Components receive typed data without querying repositories or reading credentials.

Use explicit imports and English identifiers, descriptive kebab-case filenames, and named exports except framework entry points. Do not introduce barrels mixing client and server modules. Guard credentials, authenticated Notion clients, repositories, loaders, and API server entry points with `import "server-only"`; SolidStart enforces this boundary during builds. Browser Eden imports `ApiApp` using `import type`, never the Elysia instance. UI may use erased type-only imports for loader result types.

Preserve terminology including `Certificate`, `certificateSchema`, and `fetchEducation`. Keep the Notion source key `educations`. Do not add code comments unless requested.

## Rendering and state

The home route preloads the portfolio query, reads it with `createAsync`, and emits static metadata and safely serialized JSON-LD. The query invokes the repository loader through a `"use server"` function. Never route these server reads through the public HTTP API.

`loadPortfolio` starts all section requests concurrently and resolves all results before returning. Failures are converted into safe section messages without dropping successful sections. Omit empty sections. Keep `createHandler` in `mode: "async"`: the initial HTML includes every successful section and all collapsed descriptions. The root Suspense boundary coordinates async data; do not introduce section-level streaming, loading routes, or hidden replacement containers.

Keep `Router` in `explicitLinks` mode so native anchors, including the skip link, retain browser focus behavior. Use reactive prop reads and `For`/`Show` where appropriate. Do not destructure reactive props or snapshot derived values outside accessors or memos. Native `createSignal`, `createStore`, and Context handle application state when needed; do not add Jotai or a React adapter. `QueryProvider` creates an isolated TanStack Solid Query client per app root with a 60-second stale time. The current portfolio still uses the server loader and needs no client query or global state. Never share a mutable server cache between requests.

Main projects remain visible. Side projects use an initially closed native `details`; nested descriptions also use native `details`. Mouse and keyboard reveal existing markup without client requests, conditional mounting, or `aria-hidden` on its content.

## Elysia and Eden

Keep `apiApp` in `src/lib/server/api/app.ts` with the `/api` prefix and chained routes so Eden retains inferred types. Export `ApiApp = typeof apiApp`. The SolidStart adapters pass `event.request` to `apiApp.fetch`.

`/api` returns static public profile data; `/api/health` reports application availability. Neither queries Notion; health is not a Notion connectivity check. Keep these endpoints independent of credentials.

Use `createApiClient(origin, options)` for HTTP, with the browser origin for same-origin requests. Use `serverApi` for direct server calls. Check Eden's `error` before consuming `data`.

## Notion and content contracts

Keep `NOTION_TOKEN` in ignored `.env.local`; validate it lazily. Never expose tokens in browser code, HTML, serialized state, logs, or user-facing errors.

Preserve the API version `2025-09-03`, uncached requests, and 15-second timeout covering body consumption. Make three total attempts with 1-second and 2-second backoff for retryable failures, including HTTP 429. Preserve source IDs, properties, and sorting in `sources.ts`. Paginate completely, failing safely for missing/repeated cursors or malformed responses. Validate raw pages before mapping and domain data after mapping.

Keep awards, certificates, and education separate. Ongoing date labels are opt-in for careers, experience, and education; projects and single-day activities retain date labels.

Markdown uses CommonMark with raw HTML disabled and Unicode bullet normalization. Render raw HTML as escaped literal text. Only HTTP, HTTPS, and mailto links are allowed; blocked links retain formatted labels. Open allowed links with `target="_blank"` and `rel="noopener noreferrer"`. Render image alt text without loading unmanaged images. CMS headings become paragraphs. Only the trusted renderer output and safely escaped static JSON-LD may enter `innerHTML`; never pass raw Notion text into it.

## Styling, accessibility, and metadata

`src/tokens.css` owns tokens; `uno.config.ts` maps them to utilities and controls scanning. `src/app.css` owns document basics, accessibility, motion preferences, and the reset. Component styles live in statically extractable JSX utilities. Keep complete literal alternatives for dynamic classes.

Use a shortcut only for substantial repetition, such as `disclosure-summary`; retain per-instance sizing and spacing on the element. Custom font sizes inherit line height unless deliberately overridden.

Keep UnoCSS's PostCSS integration and `tools/postcss/config-dependencies.cjs`. The Vite plugin failed to generate utility CSS with this SolidStart/Vite build configuration. Verify configuration changes against generated CSS and the running page; a passing build is insufficient.

Respect system light/dark and reduced motion. Preserve skip links, visible keyboard focus, responsive layouts, and all headers in `src/lib/server/security-headers.ts`. Nitro route rules apply security headers to static assets, while middleware also covers dynamic responses. Styles must be available before JavaScript executes.

Canonical URLs use `https://sspzoa.io`. Metadata, crawler routes, and JSON-LD use static configuration without Notion. Keep safe JSON-LD serialization. `/opengraph-image` generates and returns PNG bytes on each request. Bundle logo and font assets with the server; do not generate a static PNG during dev/build. Temporary font files required by resvg are isolated per request and removed after rendering. Use bundled renamed Pretendard 1.3.9 subsets in `assets/fonts`, retain their license, and refresh glyph coverage when changing copy. Image generation works offline without system fonts.

## Verification

Tests use Bun with `tests/setup.ts` preloaded. Its JSX transform uses the Solid SSR compiler. The only globally mocked module is `server-only`. Data tests use injected transports, local handlers, fixtures, or scoped spies, never live Notion. Restore environment values and spies.

Keep unit tests beside modules and cross-layer checks in `tests`. Add focused behavioral regressions. For UI/CSS, inspect desktop/mobile, keyboard disclosures and skip links, light/dark, and reduced motion. Check raw initial HTML when changing rendering. Check API status, Eden errors/types, metadata, OG output, and browser assets for server-code leakage. Report actual checks and limitations; do not claim browser validation from unit tests.
