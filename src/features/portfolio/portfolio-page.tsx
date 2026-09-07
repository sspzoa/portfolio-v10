import { PortfolioContent } from "@/features/portfolio/portfolio-content";
import { ProfileFooter, ProfileHeader } from "@/features/portfolio/ui/profile";
import "./ui/portfolio.css";

export function PortfolioPage() {
  return (
    <div className="page-shell" id="top">
      <ProfileHeader />
      <main id="main-content" tabIndex={-1}>
        <PortfolioContent />
      </main>
      <ProfileFooter />
    </div>
  );
}
