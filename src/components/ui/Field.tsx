import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  children,
}: {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label htmlFor={htmlFor} className="font-ui text-body-sm font-bold text-green-800">
          {label}
          {required ? <span className="text-amber-600"> *</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <span className="font-ui text-caption font-semibold text-clay-700">{error}</span>
      ) : hint ? (
        <span className="font-ui text-caption text-green-500">{hint}</span>
      ) : null}
    </div>
  );
}

export const controlClasses =
  "w-full font-ui text-body-md text-green-800 bg-cream-100 border-2 border-cream-400 rounded-control px-[14px] py-[12px] transition-colors duration-150 ease-standard outline-none focus:border-green-800 focus-visible:shadow-[0_0_0_3px_var(--color-amber-500)]";
