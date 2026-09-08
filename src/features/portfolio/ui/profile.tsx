import { profile } from "@/features/portfolio/config/profile";

export function ProfileHeader() {
  return (
    <header className="profile">
      <div className="profile-heading">
        <h1>{profile.name}</h1>
        <span className="profile-name">{profile.englishName}</span>
      </div>
      <p className="profile-role">{profile.role}</p>
      <p className="profile-intro">{profile.introduction}</p>
      <nav className="social-links" aria-label="연락처 및 소셜 링크">
        {profile.links.map(({ href, label }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function ProfileFooter() {
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {profile.englishName}
      </span>
      <a href="#top">맨 위로</a>
    </footer>
  );
}
