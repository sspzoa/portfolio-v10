import { profile } from "~/lib/profile";

export function ProfileHeading() {
  return (
    <>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h1 class="font-bold text-profile leading-[1.35] tracking-[-0.025em] [view-transition-name:profile-name]">
          {profile.name}
        </h1>
        <span class="text-caption text-muted">{profile.englishName}</span>
      </div>
      <p class="mt-2 text-secondary">{profile.role}</p>
    </>
  );
}
