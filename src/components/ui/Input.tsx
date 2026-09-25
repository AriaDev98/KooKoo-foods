import type { InputHTMLAttributes } from "react";
import { controlClasses } from "./Field";

export function Input({
  invalid = false,
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={`${controlClasses} ${invalid ? "border-clay-700! bg-[rgba(76,33,24,0.04)]!" : ""} ${className}`}
      {...rest}
    />
  );
}
