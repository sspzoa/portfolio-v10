# AGENTS.md

## Product

This repository is Seungpyo Suh's Korean single-page portfolio at `https://sspzoa.io`. Notion supplies the content. Preserve the readable single column, restrained typography, whitespace, thin rules, responsive layout, and system light/dark themes.

Implement actual product requirements. Do not add unused state libraries, endpoints, wrappers, or architectural layers. Preserve unrelated working-tree changes. Keep README as the short profile and portfolio link. Do not add code comments unless requested.

## Runtime and commands

Use Bun for package management and scripts. The application uses SolidStart 2, Solid Router, SolidJS, Vite 8, Nitro 3, Elysia, Eden, UnoCSS Wind3, Zod, markdown-it, Satori, and resvg. Node.js 24 is the production runtime. Pin direct dependency versions exactly and keep UnoCSS packages on the same version. Commit `package.json` and `bun.lock` together.

| Command | Purpose |
| --- | --- |
| `bun install --frozen-lockfile` | Install the recorded dependency versions |
| `bun run dev` | Start Vite at `http://127.0.0.1:3000` |
| `bun run lint` | Check Biome formatting and lint rules |
| `bun run lint:fix` | Apply Biome fixes; review the diff afterward |
| `bun run typecheck` | Check TypeScript without emitting files |
| `bun run build` | Build the Node production output |
| `bun run check` | Run lint, type checking, and the production build |
| `bun run start` | Serve `.output/server/index.mjs`, loading `.env.local` when present |
| `bun run preview` | Preview the build through Vite |
| `NITRO_PRESET=vercel bun run build` | Produce Vercel deployment output |
| `bun outdated` | Inspect dependency updates |

The user removed automated tests and their tooling. Do not reintroduce them without a request. Application and build changes require `bun run check` plus relevant runtime verification. Documentation-only changes require content and diff review. Building deployment output is not proof of a successful deployment.

## Layout and boundaries

Keep the official create-solid basic layout and the built-in `~` alias. Do not add `features`, `shared`, or another top-level server layer.

| Location | Responsibility |
| --- | --- |
| `src/app.tsx` | Router, metadata provider, error boundary, root Suspense, stylesheet imports |
| `src/entry-client.tsx` | Solid hydration |
| `src/entry-server.tsx` | HTML document, viewport, theme color, icons, assets, async SSR |
| `src/routes` | Page routes, thin API adapters, metadata routes, dynamic OG, 404 |
| `src/components` | Typed presentation and section composition |
| `src/app.css` | Reset, document defaults, focus, motion, print styles |
| `src/tokens.css` | Design tokens |
| `uno.config.ts` | Wind3 utilities, token mapping, shortcuts, content extraction |
| `vite.config.ts` | Official SolidStart, UnoCSS, and Nitro plugin configuration |
| `src/lib/portfolio` | Domain schemas, inferred types, result types, Solid Router query |
| `src/lib/server/api` | Elysia app and direct server Eden client |
| `src/lib/api-client.ts` | Typed HTTP Eden client factory |
| `src/lib/server/notion` | Notion HTTP transport, pagination, raw schemas, property readers, errors |
| `src/lib/server/portfolio` | Source configuration, page schemas, mapping, repository, section loading |
| `src/lib/server/og-image.ts` | In-memory dynamic social image generation |
| `src/lib/server/env.ts` | Lazy credential validation |
| `src/lib/server/security-headers.ts`, `src/middleware.ts` | Response security and dynamic cache policy |
| `src/lib/profile.ts`, `src/lib/seo.ts` | Public profile, canonical URLs, metadata, safe JSON-LD |
| `assets` | Bundled logo and licensed OG fonts |
| `public` | Directly served favicon and application icons |

Use descriptive kebab-case filenames, English identifiers, explicit imports, and named exports except framework entry points. Avoid barrels mixing client and server code. Keep credentials, authenticated clients, repositories, loaders, and API instances behind `import "server-only"`. Browser code imports API types with `import type`, never the server instance. Generic Notion utilities must not import portfolio mapping or UI. Domain schemas have no UI or server imports. Components receive typed data.

## Rendering and API

The home route preloads `getPortfolio`, reads it with `createAsync`, and renders static metadata and safely serialized JSON-LD. Its `"use server"` query calls `serverApi.portfolio.get()`. The direct Eden client uses `treaty(apiApp)`; SSR must not make an HTTP request to itself. Elysia owns the portfolio endpoint and calls `loadPortfolio`.

Keep `apiApp` prefixed with `/api`, chain its routes, and export `ApiApp = typeof apiApp` for inference. SolidStart route adapters pass `event.request` to `apiApp.fetch`. `/api` returns the static public profile; `/api/health` reports application availability. Neither requires Notion credentials. Check Eden's `error` before consuming `data`. Use `createApiClient(origin, options)` only for HTTP consumers.

Load all portfolio sections concurrently and resolve them before returning. Convert section failures to safe messages and retain successful sections. Omit empty sections. Keep `createHandler` in `mode: "async"`; initial HTML must contain successful sections and collapsed descriptions. Use one root Suspense boundary, without section streaming or client requests to reveal existing descriptions.

Keep Router `explicitLinks` so normal anchors retain browser focus behavior. Use reactive prop reads, `For`, `Show`, and memos where needed. Do not destructure reactive props or snapshot derived state. Native Solid signals/stores are sufficient when client state is needed. Never share mutable user data or a QueryClient across server requests.

Main projects stay visible. Side projects and descriptions use initially closed native `details`. Preserve keyboard operation and existing DOM content. Experience entries do not display logos. Career and education logos remain visible. Only main skills display icons; main skills come first within each category. Display logos and icons in their original colors.

## Notion and errors

Keep `NOTION_TOKEN` in ignored `.env.local` locally and deployment environment variables in production. Validate lazily so static routes work without credentials. Never expose tokens, raw authenticated request objects, or Notion response bodies in browser bundles, HTML, serialized state, logs, or user-facing errors.

Preserve Notion API version `2025-09-03`, uncached requests, and a 15-second attempt timeout covering response-body consumption. Limit retryable failures to three attempts. Use 1-second and 2-second fallback delays and honor valid `Retry-After` seconds when longer. Pagination must finish completely and fail safely for missing/repeated cursors or invalid responses.

Preserve source IDs, property names, and sorting in `sources.ts`. Validate raw pages before mapping and domain entities afterward. Keep `Certificate`, `certificateSchema`, `fetchEducation`, and source key `educations`. Awards, certificates, and education remain distinct. Ongoing labels are opt-in for career, experience, and education; projects and single-day records retain their intended date labels.

Log safe structured diagnostics: section, recognized error kind, HTTP status and retryability where available, and a bounded cause category. Never log arbitrary error messages, causes, stacks, or payloads that may contain credentials/content. User-facing messages remain separate from diagnostics.

## Content, styling, and metadata

Markdown is synchronous CommonMark with raw HTML disabled and Unicode bullet normalization. Allow only HTTP, HTTPS, and mailto links; blocked links retain their formatted labels. Allowed links use `target="_blank"` and `rel="noopener noreferrer"`. Render unmanaged images as alt text and CMS headings as paragraphs. Only trusted renderer output and safely escaped static JSON-LD may enter `innerHTML`.

Use the standard `UnoCSS()` Vite plugin before SolidStart, with `virtual:uno.css` imported in `src/app.tsx`. Use the same default mode in development and production. Do not replace dependency-internal hooks, patch node_modules, introduce experimental extraction modes, or restore PostCSS as a workaround. Review official release notes and installed APIs before changing framework configuration; verify both generated CSS and the page.

Keep document styles in `src/app.css`, tokens in `src/tokens.css`, and component styles in statically extractable JSX utilities. Dynamic classes need complete literal alternatives. Shortcuts are for substantial repetition; instance spacing remains on the element. Font-size utilities inherit line height unless intentionally overridden.

The user removed the skip-to-content link; do not reintroduce it without a request. Preserve visible focus, semantic headings, accessible disclosures, reduced motion, print styles, and layouts without horizontal overflow. Keep the charcoal browser theme color. Nitro route rules apply security headers to static assets; middleware also covers dynamic responses. Dynamic responses use `Cache-Control: no-store`.

Canonical URLs use `https://sspzoa.io`. Metadata, robots, sitemap, and JSON-LD use static configuration without Notion. `/opengraph-image` returns a freshly rendered 1200×630 PNG. Satori accepts plain element objects and bundled font buffers, emitting SVG paths; resvg renders the SVG asynchronously without system fonts. Use Nitro's `traceDeps: ["satori", "harfbuzzjs*"]` to package its Node/WASM dependencies without rebundling them. Keep generation offline and in memory: no temporary fonts, process cleanup hooks, or build-time PNG. Preserve bundled font licenses and glyph coverage when changing copy.

## Verification and delivery

Inspect the diff and preserve earlier accepted UI changes. For styles or rendering, check desktop/mobile, light/dark, reduced motion, keyboard disclosures, initial HTML, and styles without JavaScript. For UnoCSS configuration, also verify a newly introduced utility through HMR and the production CSS output.

For API/content changes, check status codes, safe partial failures, retries with injected responses, pagination, and Eden behavior as relevant. Use local fixtures or temporary verification scripts rather than live Notion for failure cases. Do not add permanent test tooling without authorization.

For OG changes, inspect the actual PNG, dimensions, offline operation, and concurrent requests. Check that client assets contain no server credentials or server-only libraries. Verify Vercel output when changing build/deployment configuration. Report only checks actually performed and distinguish local verification from deployment. Do not push unless requested.
