import type { InputHTMLAttributes } from "react";
import { controlClasses } from "./Field";

export function Input({
  invalid = false,
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      className={`${controlClasses} ${invalid ? "border-clay-700" : ""} ${className}`}
      {...rest}
    />
  );
}
