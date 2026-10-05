import { createMemo, Show } from "solid-js";
import { GroupDisclosure } from "~/components/group-disclosure";
import { RecordEntries } from "~/components/record-entries";
import type { Certificate } from "~/lib/portfolio/schemas";

function CertificateList(props: { items: Certificate[] }) {
  return (
    <RecordEntries
      items={props.items}
      subtitle={(item) => [item.kind, item.institution].filter(Boolean).join(" · ")}
      period={(item) => item.date}
    />
  );
}

export function CertificatesContent(props: { items: Certificate[] }) {
  const main = createMemo(() => props.items.filter((item) => item.isMain));
  const other = createMemo(() => props.items.filter((item) => !item.isMain));
  return (
    <>
      <Show when={main().length}>
        <CertificateList items={main()} />
      </Show>
      <Show when={other().length}>
        <GroupDisclosure label="기타 자격증" count={other().length}>
          <CertificateList items={other()} />
        </GroupDisclosure>
      </Show>
    </>
  );
}
