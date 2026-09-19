// Decorative only — the section's own green-800 fill carries the content's
// contrast, this just adds slow, quiet depth on top of it. Keep out of the
// accessibility tree and never let it capture pointer events.
export function LivingBackground() {
  return (
    <div className="living-bg" aria-hidden="true">
      <div className="living-bg-blob living-bg-blob-1" />
      <div className="living-bg-blob living-bg-blob-2" />
      <div className="living-bg-blob living-bg-blob-3" />
    </div>
  );
}
