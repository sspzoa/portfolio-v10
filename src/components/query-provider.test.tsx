import { expect, test } from "bun:test";
import { useQueryClient } from "@tanstack/solid-query";
import { renderToString } from "solid-js/web";
import { QueryProvider } from "./query-provider";

test("isolates query caches between server renders and retains child HTML", () => {
  const clients: ReturnType<typeof useQueryClient>[] = [];
  function Content() {
    const client = useQueryClient();
    clients.push(client);
    const previous = client.getQueryData<string>(["visitor"]);
    client.setQueryData(["visitor"], "private-render-value");
    return <p>{previous ?? "fresh render"}</p>;
  }
  for (let render = 0; render < 2; render++) {
    expect(
      renderToString(() => (
        <QueryProvider>
          <Content />
        </QueryProvider>
      )),
    ).toContain("fresh render");
  }
  expect(clients[0]).not.toBe(clients[1]);
  expect(clients[0].getDefaultOptions().queries?.staleTime).toBe(60_000);
});
