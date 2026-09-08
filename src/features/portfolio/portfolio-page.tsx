import { PortfolioContent } from "@/features/portfolio/portfolio-content";
import { ProfileFooter, ProfileHeader } from "@/features/portfolio/ui/profile";

export function PortfolioPage() {
  return (
    <div
      className="mx-auto w-full max-w-reading px-6 pt-24 pb-10 max-[40rem]:px-5 max-[40rem]:pt-12 print:p-0"
      id="top">
      <ProfileHeader />
      <main id="main-content" tabIndex={-1}>
        <PortfolioContent />
      </main>
      <ProfileFooter />
    </div>
  );
}
