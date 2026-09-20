import { mount, StartClient } from "@solidjs/start/client";
import { inject } from "@vercel/analytics";

inject({ mode: import.meta.env.DEV ? "development" : "production" });
mount(() => <StartClient />, document.getElementById("app")!);
