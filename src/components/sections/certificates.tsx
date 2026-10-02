import { createMemo, Show } from "solid-js";
import { RecordEntries } from "~/components/record-entries";
import type { Certificate } from "~/lib/portfolio/schemas";

function CertificateList(props: { data: Certificate[] }) {
  return (
    <RecordEntries
      items={props.data}
      subtitle={(item) => [item.kind, item.institution].filter(Boolean).join(" · ")}
      period={(item) => item.date}
    />
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
        <details class="disclosure mt-8 border-line border-t pt-5 [&[open]>summary]:mb-6">
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
