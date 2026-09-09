<h3 align="center">
  Seungpyo Suh
  - Product Engineer
</h3>

<p align="center">
   <a href="https://github.com/horang-corp">Horang</a>
 • Dongguk University • Korea Digital Media High School
</p>

<p align="center">
  Portfolio: <a href="https://sspzoa.io">sspzoa.io</a>
</p>

## Development

Initialized with the official `create-solid@0.12.0` SolidStart v2 basic template.
Built with SolidJS, Solid Router, TanStack Solid Query, UnoCSS, Elysia/Eden, and Notion.
Requires Node.js 24+ and Bun 1.3.14+.

```sh
bun install
```

Set `NOTION_TOKEN` in `.env.local` to a Notion integration token with read access
to the data sources configured in `src/lib/server/portfolio/sources.ts`.
Never commit the environment file.

```sh
bun run dev
bun run check
bun run build
bun run start
```

Development uses port 3000. Production supports `HOST` and `PORT` environment
variables. Configure the deployment environment's `NOTION_TOKEN` for production;
the local start command also reads `.env.local` if it exists.

The default production output is a Nitro Node server at `.output/server/index.mjs`,
with static assets in `.output/public`. Other hosting targets can use Nitro's
`NITRO_PRESET` build environment variable. A host previously configured for Next.js
must use the SolidStart/Nitro build output instead.

All Notion sections load concurrently on the server. The response waits for the
complete portfolio HTML, including closed native project disclosures. A failed
source shows a safe section error while the other sections remain available.

`/api` returns the public profile and `/api/health` reports application availability
without contacting Notion. Metadata and crawler routes also work without Notion.
`/opengraph-image` generates a PNG on each request from bundled fonts and logo assets,
without Notion or external network requests. No generated PNG is stored in `public`.

## Structure and state

The official scaffold was generated with:

```sh
bunx create-solid@0.12.0 app --solidstart --v2 --ts --template basic
```

The template entry points and file routing are retained. Product-specific code uses
`src/components` for presentation and `src/lib` for application logic, with the
built-in `~` import alias. Authenticated Notion code lives in `src/lib/server`.
The former `features`, `shared`, and top-level `server` directories are removed.

Use Solid's `createSignal`, `createStore`, and Context when client state is needed.
Jotai and React are not dependencies. `QueryProvider` connects TanStack Solid Query
with a fresh QueryClient for each app root and a 60-second default stale time.
Client API queries can use the Eden client; throw on Eden errors so Query records
a failure. The portfolio itself continues to load through its server query.

Changes beyond the basic scaffold include complete async SSR, native anchor focus,
security headers, the Query provider, UnoCSS PostCSS integration, dynamic OG image
generation, and Bun tests.
