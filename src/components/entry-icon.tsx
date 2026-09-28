export function EntryIcon(props: { src: string }) {
  return (
    <div class="media-tile size-10 p-1">
      <img
        src={props.src}
        alt=""
        width={30}
        height={30}
        loading="lazy"
        decoding="async"
        draggable={false}
        class="size-full rounded-ui object-contain"
      />
    </div>
  );
}
