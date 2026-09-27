import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The production build (scripts/prerender.mjs) fills #root with real
// rendered HTML before this ever runs, so hydrateRoot adopts it. The Vite
// dev server never runs that step — #root is just the <!--app-html-->
// placeholder — so hydrating against it has nothing real to reconcile with
// and always mismatches. Fall back to a normal client render in that case.
if (root.hasChildNodes() && root.firstChild?.nodeType !== Node.COMMENT_NODE) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
