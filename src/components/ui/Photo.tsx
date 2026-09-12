export function Photo({
  src,
  alt,
  ratio = "4 / 3",
  className = "",
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`w-full h-full object-cover block ${className}`}
      style={{ aspectRatio: ratio }}
    />
  );
}
