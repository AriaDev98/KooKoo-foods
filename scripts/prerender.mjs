// Runs after both the client and SSR builds. Renders each route once (the
// site is fully static — no per-request data) and bakes the resulting HTML
// into its own dist/*.html, so the browser has real visible content
// immediately instead of an empty <div id="root"> that waits for JS to fill
// it in. dist/server/ (the SSR bundle) is deleted afterward — it's a
// build-time tool, not something that needs to be deployed.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const ssrEntryPath = path.join(root, "dist/server/entry-server.js");

const { render, ROUTES } = await import(ssrEntryPath);

let totalChars = 0;

for (const route of ROUTES) {
  const templatePath = path.join(root, "dist", route.htmlFile);
  const template = readFileSync(templatePath, "utf-8");
  const appHtml = render(route.path);

  if (!appHtml || appHtml.length < 300) {
    throw new Error(
      `Prerender produced suspiciously little HTML for ${route.path} (${appHtml?.length ?? 0} chars) — aborting build.`,
    );
  }

  const finalHtml = template.replace("<!--app-html-->", appHtml);
  writeFileSync(templatePath, finalHtml);
  totalChars += appHtml.length;
  console.log(`  ${route.path} -> ${route.htmlFile} (${appHtml.length.toLocaleString()} chars)`);
}

rmSync(path.join(root, "dist/server"), { recursive: true, force: true });

console.log(`Prerendered ${ROUTES.length} routes, ${totalChars.toLocaleString()} chars total.`);
