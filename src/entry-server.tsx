import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

// Called at build time only (see scripts/prerender.mjs), never at request
// time — the site is fully static, so this just needs to run once per build.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
