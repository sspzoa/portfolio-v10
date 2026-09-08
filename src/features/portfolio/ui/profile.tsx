import { profile } from "@/features/portfolio/config/profile";

export function ProfileHeader() {
  return (
    <header className="pb-16 max-[40rem]:pb-12">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h1 className="font-bold text-profile leading-[1.35] tracking-[-0.025em]">{profile.name}</h1>
        <span className="text-caption text-muted">{profile.englishName}</span>
      </div>
      <p className="mt-2 text-secondary">{profile.role}</p>
      <p className="wrap-anywhere mt-6 break-keep text-secondary">{profile.introduction}</p>
      <nav className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-caption" aria-label="연락처 및 소셜 링크">
        {profile.links.map(({ href, label }) => (
          <a
            className="inline-flex min-h-9 items-center py-1"
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer">
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function ProfileFooter() {
  return (
    <footer className="mt-8 flex flex-wrap justify-between gap-3 border-line border-t pt-6 text-caption text-muted print:hidden">
      <span>
        © {new Date().getFullYear()} {profile.englishName}
      </span>
      <a className="text-inherit" href="#top">
        맨 위로
      </a>
    </footer>
  );
}
