import { PageShell } from "../components/layout/PageShell";
import { OccasionPageTemplate } from "./OccasionPageTemplate";
import { OCCASION_PAGES } from "../data/occasions";

const page = OCCASION_PAGES.find((p) => p.slug === "nowruz-catering")!;

export function NowruzCateringPage() {
  return (
    <PageShell>
      <OccasionPageTemplate page={page} />
    </PageShell>
  );
}
