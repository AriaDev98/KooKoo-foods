import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { ROUTES, getRouteByPath } from './routes'
import { PathContext } from './context/PathContext'

// Re-exported so scripts/prerender.mjs can read the route list from this
// already-compiled SSR bundle, instead of importing raw src/routes.tsx
// directly in a plain Node script (which can't execute JSX/TS syntax).
export { ROUTES }

// Called at build time only (see scripts/prerender.mjs), once per route,
// never at request time — the site is fully static.
export function render(path: string) {
  const { Component } = getRouteByPath(path)
  return renderToString(
    <StrictMode>
      <PathContext.Provider value={path}>
        <Component />
      </PathContext.Provider>
    </StrictMode>,
  )
}
