import { PageShell } from "../components/layout/PageShell";
import { HeroSection } from "../components/sections/HeroSection";
import { IntroSection } from "../components/sections/IntroSection";
import { WhosComingSection } from "../components/sections/WhosComingSection";
import { SignatureDishesTeaser } from "../components/sections/SignatureDishesTeaser";
import { HowItWorksSection } from "../components/sections/HowItWorksSection";
import { StoryTeaser } from "../components/sections/StoryTeaser";
import { PantryTeaser } from "../components/sections/PantryTeaser";
import { FaqTeaser } from "../components/sections/FaqTeaser";
import { ClosingBanner } from "../components/sections/ClosingBanner";

export function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <IntroSection />
      <WhosComingSection />
      <SignatureDishesTeaser />
      <HowItWorksSection />
      <StoryTeaser />
      <PantryTeaser />
      <FaqTeaser />
      <ClosingBanner />
    </PageShell>
  );
}
