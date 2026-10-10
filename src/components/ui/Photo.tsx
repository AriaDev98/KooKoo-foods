export function Photo({
  src,
  alt,
  ratio = "4 / 3",
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  /** For the one above-the-fold photo that's the page's LCP candidate —
   * every other Photo on the site should stay lazy. */
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className={`w-full h-full object-cover block ${className}`}
      style={{ aspectRatio: ratio }}
    />
  );
}
