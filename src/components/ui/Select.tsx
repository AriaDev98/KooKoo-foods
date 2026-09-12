import type { SelectHTMLAttributes } from "react";
import { controlClasses } from "./Field";

export function Select({
  options,
  invalid = false,
  className = "",
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; invalid?: boolean }) {
  return (
    <select
      className={`${controlClasses} appearance-none cursor-pointer pr-10 bg-no-repeat ${
        invalid ? "border-clay-700" : ""
      } ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(45deg,transparent 50%,var(--color-green-700) 50%),linear-gradient(135deg,var(--color-green-700) 50%,transparent 50%)",
        backgroundPosition: "calc(100% - 22px) calc(50% + 2px), calc(100% - 16px) calc(50% + 2px)",
        backgroundSize: "6px 6px, 6px 6px",
      }}
      {...rest}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
