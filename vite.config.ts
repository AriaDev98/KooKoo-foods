import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const resolve = (p: string) => fileURLToPath(new URL(p, import.meta.url))

// Multi-page build: one real HTML entry per route. Deliberately not derived
// by importing src/routes.tsx here — that file pulls in the full React page
// tree, which isn't safe to load in vite.config.ts's plain Node context.
// Keep this list in sync with the htmlFile values in src/routes.tsx.
const PAGES = [
  'index',
  'menu',
  'our-story',
  'faq',
  'contact',
  'wedding-catering',
  'corporate-catering',
  'nowruz-catering',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(PAGES.map((page) => [page, resolve(`${page}.html`)])),
    },
  },
})
