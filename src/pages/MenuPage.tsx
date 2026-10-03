import { PageShell } from "../components/layout/PageShell";
import { MenuSection } from "../components/sections/MenuSection";
import { PantrySection } from "../components/sections/PantrySection";

export function MenuPage() {
  return (
    <PageShell>
      <MenuSection />
      <PantrySection />
    </PageShell>
  );
}
