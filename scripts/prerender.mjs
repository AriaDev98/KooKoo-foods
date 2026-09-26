// Runs after both the client and SSR builds. Renders the app once (the site
// is fully static — one page, no routes, no per-request data) and bakes the
// resulting HTML into dist/index.html, so the browser has real visible
// content immediately instead of an empty <div id="root"> that waits for
// JS to fill it in. dist/server/ (the SSR bundle) is deleted afterward —
// it's a build-time tool, not something that needs to be deployed.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const templatePath = path.join(root, "dist/index.html");
const ssrEntryPath = path.join(root, "dist/server/entry-server.js");

const template = readFileSync(templatePath, "utf-8");
const { render } = await import(ssrEntryPath);
const appHtml = render();

if (!appHtml || appHtml.length < 500) {
  throw new Error(`Prerender produced suspiciously little HTML (${appHtml?.length ?? 0} chars) — aborting build.`);
}

const finalHtml = template.replace("<!--app-html-->", appHtml);
writeFileSync(templatePath, finalHtml);

rmSync(path.join(root, "dist/server"), { recursive: true, force: true });

console.log(`Prerendered ${appHtml.length.toLocaleString()} chars of HTML into dist/index.html`);
