import type { Certificate } from "@/features/portfolio/model/schemas";
import { RecordEntry } from "../entries/record-entry";

export function CertificatesContent({ data }: { data: Certificate[] }) {
  return (
    <ul className="record-list">
      {data.map((certificate) => (
        <RecordEntry
          key={certificate.id}
          title={certificate.name}
          subtitle={[certificate.kind, certificate.institution].filter(Boolean).join(" · ")}
          period={certificate.date}
        />
      ))}
    </ul>
  );
}
