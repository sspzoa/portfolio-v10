import { For } from "solid-js";
import { RecordEntry } from "~/components/entries/record-entry";
import type { Award } from "~/lib/portfolio/schemas";
export function AwardsContent(props: { data: Award[] }) {
  return (
    <ul class="flex flex-col gap-5">
      <For each={props.data}>
        {(award) => <RecordEntry title={award.name} subtitle={award.tier} period={award.date} />}
      </For>
    </ul>
  );
}
