import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { SiteHeader } from "./components/navigation/SiteHeader";
import { StickyBar } from "./components/navigation/StickyBar";
import { BackToTop } from "./components/navigation/BackToTop";
import { SiteFooter } from "./components/navigation/SiteFooter";
import { HeroSection } from "./components/sections/HeroSection";
import { IntroSection } from "./components/sections/IntroSection";
import { MenuSection } from "./components/sections/MenuSection";
import { HowItWorksSection } from "./components/sections/HowItWorksSection";
import { PantrySection } from "./components/sections/PantrySection";
import { OccasionsSection } from "./components/sections/OccasionsSection";
import { StorySection } from "./components/sections/StorySection";
import { ProcessSection } from "./components/sections/ProcessSection";
import { FaqSection } from "./components/sections/FaqSection";
import { ReviewsSection } from "./components/sections/ReviewsSection";
import { EnquireSection } from "./components/sections/EnquireSection";
import { TableProvider } from "./context/TableContext";
import { TableTray } from "./components/navigation/TableTray";
import { StructuredData } from "./components/seo/StructuredData";

function App() {
  return (
    <TableProvider>
      <div id="top" className="bg-cream-200 font-ui overflow-x-clip">
        <StructuredData />
        <Analytics />
        <SpeedInsights />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <StickyBar />
        <BackToTop />
        <TableTray />

        {/* tabIndex={-1}: focusable by the skip link's jump, but not part of
            the normal tab order — without this, activating the skip link
            scrolls here but leaves focus on <body>, so the very next Tab
            press would jump back to the header instead of continuing
            through the content, defeating the point of the link. */}
        <main id="main-content" tabIndex={-1} className="outline-none">
          <HeroSection />
          <HeroSection />
          <IntroSection />
          <MenuSection />
          <HowItWorksSection />
          <PantrySection />
          <OccasionsSection />
          <StorySection />
          <ProcessSection />
          <FaqSection />
          <ReviewsSection />
          <EnquireSection />
        </main>

        <SiteFooter />
      </div>
    </TableProvider>
  );
}

export default App;
