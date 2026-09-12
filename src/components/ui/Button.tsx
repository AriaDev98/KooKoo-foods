import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-ui font-bold leading-none rounded-control transition-colors duration-150 ease-standard no-underline";

const sizes: Record<Size, string> = {
  sm: "text-body-sm px-[18px] py-[10px]",
  md: "text-body-md px-[26px] py-[14px]",
  lg: "text-body-lg px-[34px] py-[18px]",
};

const variants: Record<Variant, string> = {
  primary: "bg-amber-500 text-green-800 hover:bg-amber-400",
  secondary: "bg-green-800 text-cream-200 hover:bg-green-700",
  outline: "bg-transparent text-green-800 shadow-[inset_0_0_0_2px_var(--color-green-800)] hover:bg-cream-300",
  ghost: "bg-transparent text-amber-600 hover:bg-amber-200",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  marker?: boolean;
  className?: string;
}

type ButtonProps = CommonProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  marker = false,
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const classes = [
    base,
    sizes[size],
    variants[variant],
    fullWidth ? "w-full" : "",
    marker ? "font-marker font-normal uppercase tracking-marker" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
