import { For, Show } from "solid-js";
import { DetailDialog } from "~/components/detail-dialog";
import { DateLabel, EntryList, EntrySubtitle } from "~/components/entry";
import type { Award } from "~/lib/portfolio/schemas";

function AwardEntry(props: { award: Award }) {
  let dialog!: HTMLDialogElement;
  const id = () => `award-${props.award.id}-dialog`;
  return (
    <li class="break-anywhere reveal border-line border-t py-4 first:border-t-0 first:pt-0 last:pb-0 print:break-inside-avoid">
      <div class="flex items-baseline justify-between gap-x-6 gap-y-1 max-sm:flex-col">
        <div class="flex min-w-0 flex-col gap-0.5">
          <h3 class="entry-title">
            <Show when={props.award.photos.length} fallback={props.award.name}>
              <button
                type="button"
                commandfor={id()}
                command="show-modal"
                onClick={() => {
                  if (!dialog.open) dialog.showModal();
                }}
                aria-haspopup="dialog"
                class="group cursor-pointer text-left underline decoration-2 decoration-transparent underline-offset-4 hover:decoration-accent">
                {props.award.name}
                {"\u00a0"}
                <span
                  aria-hidden="true"
                  class="inline-block text-muted [transition:transform_var(--duration-fast),color_var(--duration-fast)] group-hover:translate-x-0.5 group-hover:text-ink group-focus-visible:text-ink">
                  ›
                </span>
              </button>
            </Show>
          </h3>
          <EntrySubtitle value={props.award.tier} />
        </div>
        <DateLabel value={props.award.date} />
      </div>
      <Show when={props.award.photos.length}>
        <DetailDialog
          ref={dialog}
          id={id()}
          title={props.award.name}
          metadata={[props.award.tier, props.award.date].filter(Boolean).join(" / ")}>
          <For each={props.award.photos}>
            {(photo, index) => (
              <img
                src={photo}
                alt={`${props.award.name} 수상 사진 ${index() + 1}`}
                loading="lazy"
                decoding="async"
                class="h-auto w-full rounded-tile border border-line bg-white object-contain"
              />
            )}
          </For>
        </DetailDialog>
      </Show>
    </li>
  );
}

export function AwardsContent(props: { items: Award[] }) {
  return (
    <EntryList items={props.items} spacing="ruled">
      {(award) => <AwardEntry award={award} />}
    </EntryList>
  );
}
