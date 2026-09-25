import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(
  () => (
    <StartServer
      document={(props) => (
        <html lang="ko">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#202322" />
            <link rel="icon" href="/favicon.png" type="image/png" />
            <link rel="apple-touch-icon" href="/apple-icon.png" />
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
  { mode: "async" },
);
