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
import { GallerySection } from "./components/sections/GallerySection";
import { EnquireSection } from "./components/sections/EnquireSection";

function App() {
  return (
    <div id="top" className="bg-cream-200 font-ui overflow-x-hidden">
      <SiteHeader />
      <StickyBar />
      <BackToTop />

      <HeroSection />
      <IntroSection />
      <MenuSection />
      <HowItWorksSection />
      <PantrySection />
      <OccasionsSection />
      <StorySection />
      <ProcessSection />
      <GallerySection />
      <EnquireSection />

      <SiteFooter />
    </div>
  );
}

export default App;
