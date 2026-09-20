import { createMemo, For, Show } from "solid-js";
import { RecordEntry } from "~/components/entries";
import type { Certificate } from "~/lib/portfolio/schemas";

function CertificateList(props: { data: Certificate[] }) {
  return (
    <ul class="flex flex-col gap-5">
      <For each={props.data}>
        {(item) => (
          <RecordEntry
            title={item.name}
            subtitle={[item.kind, item.institution].filter(Boolean).join(" · ")}
            period={item.date}
          />
        )}
      </For>
    </ul>
  );
}

export function CertificatesContent(props: { data: Certificate[] }) {
  const main = createMemo(() => props.data.filter((item) => item.isMain));
  const other = createMemo(() => props.data.filter((item) => !item.isMain));
  return (
    <>
      <Show when={main().length}>
        <CertificateList data={main()} />
      </Show>
      <Show when={other().length}>
        <details class="mt-8 border-line border-t pt-5 [&[open]>summary::before]:[transform:translateY(-2px)_rotate(45deg)] [&[open]>summary]:mb-6 [&[open]>summary]:text-ink">
          <summary class="disclosure-summary min-h-10 py-2">
            <span>기타 자격증</span>
            <span class="text-muted tabular-nums">{other().length}개</span>
          </summary>
          <CertificateList data={other()} />
        </details>
      </Show>
    </>
  );
}
