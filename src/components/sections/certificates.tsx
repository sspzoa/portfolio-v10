import { For } from "solid-js";
import { RecordEntry } from "~/components/entries/record-entry";
import type { Certificate } from "~/lib/portfolio/schemas";
export function CertificatesContent(props: { data: Certificate[] }) {
  return (
    <ul class="flex flex-col gap-5">
      <For each={props.data}>
        {(certificate) => (
          <RecordEntry
            title={certificate.name}
            subtitle={[certificate.kind, certificate.institution].filter(Boolean).join(" · ")}
            period={certificate.date}
          />
        )}
      </For>
    </ul>
  );
}
