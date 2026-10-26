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
  // Matches the id an <Input>/<Textarea> in this field passes to its own
  // aria-describedby, so a screen reader announces this exact message
  // (error, or otherwise the hint) when the control receives focus.
  const messageId = htmlFor ? `${htmlFor}-message` : undefined;
  return (
    <div className="flex flex-col gap-2 min-w-0">
      {label ? (
        <label htmlFor={htmlFor} className="font-ui text-body-sm font-bold text-green-800">
          {label}
          {required ? <span className="text-amber-600"> *</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <span id={messageId} className="font-ui text-caption font-semibold text-clay-700">
          {error}
        </span>
      ) : hint ? (
        <span id={messageId} className="font-ui text-caption text-green-500">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

// min-w-0 matters specifically for the date input: iOS Safari's native
// date-picker control has its own intrinsic rendering width, and inside a
// CSS Grid column that defaults to min-width:auto, that intrinsic size can
// win over width:100% and push the field past its column — not reproducible
// in desktop WebKit (even with a mobile viewport/UA), since the native
// control itself is OS-rendered, but this is the standard, safe fix for
// exactly this failure mode regardless of input type.
export const controlClasses =
  "w-full min-w-0 font-ui text-body-md text-green-800 bg-cream-100 border-2 border-cream-400 rounded-control px-[14px] py-[12px] transition-colors duration-150 ease-standard outline-none focus:border-green-800 focus-visible:shadow-[0_0_0_3px_var(--color-amber-500)]";
