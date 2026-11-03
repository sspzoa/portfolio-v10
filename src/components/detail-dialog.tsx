import { type JSX, Show } from "solid-js";
import { EntryIcon } from "~/components/entry";

export function DetailDialog(props: {
  id: string;
  title: string;
  metadata: string | null;
  icon?: string | null;
  ref: HTMLDialogElement | ((element: HTMLDialogElement) => void);
  children: JSX.Element;
}) {
  return (
    <dialog
      ref={props.ref}
      id={props.id}
      aria-labelledby={`${props.id}-title`}
      closedby="any"
      onPointerDown={(event) => {
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        event.currentTarget.close();
      }}
      class="m-auto max-h-[calc(100dvh-4rem)] w-[min(100%-2.5rem,44rem)] max-w-none overflow-y-auto overscroll-contain rounded-tile border border-line bg-canvas text-ink max-sm:max-h-[calc(100dvh-2rem)] max-sm:w-[calc(100%-2rem)] [&::backdrop]:bg-black/60 motion-safe:[&[open]::backdrop]:animate-fade-in motion-safe:[&[open]]:animate-dialog-in">
      <div>
        <div class="sticky top-0 z-1 flex items-center gap-3 bg-canvas px-6 pt-6 pb-4 max-sm:px-5 max-sm:pt-5">
          <Show when={props.icon !== undefined}>
            <EntryIcon src={props.icon ?? null} label={props.title} />
          </Show>
          <div class="flex min-w-0 flex-1 flex-col gap-0.5">
            <h3
              id={`${props.id}-title`}
              class="break-anywhere break-keep font-semibold text-ink text-section tracking-[-0.02em]">
              {props.title}
            </h3>
            <Show when={props.metadata}>{(metadata) => <p class="text-caption text-secondary">{metadata()}</p>}</Show>
          </div>
          <button
            type="button"
            commandfor={props.id}
            command="close"
            onClick={(event) => event.currentTarget.closest("dialog")?.close()}
            aria-label="닫기"
            class="-mr-2 grid size-9 shrink-0 cursor-pointer place-items-center self-start rounded-full text-secondary [transition:color_var(--duration-fast),background-color_var(--duration-fast)] hover:bg-surface hover:text-ink focus-visible:rounded-full">
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" class="size-4">
              <path d="M3 3l10 10M13 3 3 13" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="flex flex-col gap-6 px-6 pb-8 max-sm:px-5 max-sm:pb-6">{props.children}</div>
      </div>
    </dialog>
  );
}
