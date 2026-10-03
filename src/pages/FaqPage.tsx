import { PageShell } from "../components/layout/PageShell";
import { FaqSection } from "../components/sections/FaqSection";

export function FaqPage() {
  return (
    <PageShell includeFaqSchema>
      <FaqSection />
    </PageShell>
  );
}
