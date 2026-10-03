import type { ReactNode } from "react";
import { SiteHeader } from "../navigation/SiteHeader";
import { StickyBar } from "../navigation/StickyBar";
import { BackToTop } from "../navigation/BackToTop";
import { SiteFooter } from "../navigation/SiteFooter";
import { TableProvider } from "../../context/TableContext";
import { TableTray } from "../navigation/TableTray";
import { StructuredData } from "../seo/StructuredData";

export function PageShell({
  children,
  includeFaqSchema = false,
}: {
  children: ReactNode;
  includeFaqSchema?: boolean;
}) {
  return (
    <TableProvider>
      <div className="bg-cream-200 font-ui overflow-x-clip">
        <StructuredData includeFaq={includeFaqSchema} />
        <SiteHeader />
        <StickyBar />
        <BackToTop />
        <TableTray />

        {children}

        <SiteFooter />
      </div>
    </TableProvider>
  );
}
