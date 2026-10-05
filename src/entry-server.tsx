import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(
  () => (
    <StartServer
      document={(props) => (
        <html lang="ko">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="color-scheme" content="light dark" />
            <meta name="theme-color" content="#202322" />
            <link rel="icon" href="/favicon.ico" sizes="32x32" />
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin="anonymous" />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@kfonts/line-seed-sans-kr@0.1.0/index.css"
              crossorigin="anonymous"
            />
            {props.assets}
          </head>
          <body>
            <div id="app">{props.children}</div>
            {props.scripts}
          </body>
        </html>
      )}
    />
  ),
  (event) => ({ mode: "async", nonce: event.locals.nonce }),
);
