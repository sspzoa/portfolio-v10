import { expect, test } from "bun:test";
import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import { atom, useAtomValue, useStore } from "jotai";
import { renderToStaticMarkup } from "react-dom/server";
import { AppProviders } from "./app-providers";

test("isolates atom state and query data between server renders", () => {
  const valueAtom = atom("initial");
  const stores: ReturnType<typeof useStore>[] = [];
  const clients: QueryClient[] = [];

  function Consumer() {
    stores.push(useStore());
    clients.push(useQueryClient());
    return <p>{useAtomValue(valueAtom)}</p>;
  }

  const render = () =>
    renderToStaticMarkup(
      <AppProviders>
        <Consumer />
      </AppProviders>,
    );

  expect(render()).toBe("<p>initial</p>");
  stores[0].set(valueAtom, "previous request");
  clients[0].setQueryData(["private"], "previous request");

  expect(render()).toBe("<p>initial</p>");
  expect(stores[1]).not.toBe(stores[0]);
  expect(clients[1]).not.toBe(clients[0]);
  expect(clients[1].getQueryData(["private"])).toBeUndefined();
});

test("preserves complete server HTML inside a closed disclosure", () => {
  const html = renderToStaticMarkup(
    <AppProviders>
      <details>
        <summary>사이드 프로젝트</summary>
        <p>서버에서 렌더링한 프로젝트</p>
      </details>
    </AppProviders>,
  );

  expect(html).toBe("<details><summary>사이드 프로젝트</summary><p>서버에서 렌더링한 프로젝트</p></details>");
});
