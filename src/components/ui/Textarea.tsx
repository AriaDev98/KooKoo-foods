import type { TextareaHTMLAttributes } from "react";
import { controlClasses } from "./Field";

export function Textarea({
  invalid = false,
  rows = 4,
  className = "",
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      rows={rows}
      className={`${controlClasses} font-body leading-normal resize-y ${
        invalid ? "border-clay-700" : ""
      } ${className}`}
      {...rest}
    />
  );
}
