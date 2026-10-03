import { PageShell } from "../components/layout/PageShell";
import { StorySection } from "../components/sections/StorySection";
import { ProcessSection } from "../components/sections/ProcessSection";

export function OurStoryPage() {
  return (
    <PageShell>
      <StorySection />
      <ProcessSection />
    </PageShell>
  );
}
