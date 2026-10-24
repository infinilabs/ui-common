/* ©INFINI, All Rights Reserved. */

// Local UI primitives so the package has ZERO product aliases (`@/...`).
// Native elements carrying the same tailwind class names the reference
// consumer (logpilot, shadcn) uses: tailwind products get styled controls
// for free; non-tailwind products (coco/antd) get functional plain ones
// and own the shell styling.

import { forwardRef, type InputHTMLAttributes, type LabelHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

/** shadcn-compatible prop surface (variant/size map to classes) so
 * components migrated from shadcn consumers compile unchanged */
export type ButtonVariant = "default" | "outline" | "ghost" | "destructive" | "secondary";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

const VARIANT_CLS: Record<ButtonVariant, string> = {
  default: "border-transparent bg-gray-900 text-white hover:bg-gray-700",
  outline: "border-gray-200 bg-white hover:bg-gray-50",
  ghost: "border-transparent bg-transparent hover:bg-gray-100",
  destructive: "border-transparent bg-red-600 text-white hover:bg-red-500",
  secondary: "border-gray-200 bg-gray-100 hover:bg-gray-200"
};
const SIZE_CLS: Record<ButtonSize, string> = {
  default: "px-2.5 py-1 text-xs",
  sm: "px-2 py-0.5 text-[11px]",
  lg: "px-3 py-1.5 text-sm",
  icon: "h-6 w-6 p-0"
};

// forwardRef: the canvas anchors its processor-library popover on the
// "add processor" button via ref.
export const Button = forwardRef<HTMLButtonElement, {
  className?: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function Button({ className, children, variant = "outline", size = "default", ...rest }, ref) {
    return (
      <button
        ref={ref}
        className={
          "inline-flex items-center justify-center gap-1 rounded-md border " +
          VARIANT_CLS[variant] + " " + SIZE_CLS[size] + " " +
          "disabled:opacity-50 " +
          (className ?? "")
        }
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export function Badge({ className, children, variant }: {
  className?: string; children?: ReactNode; variant?: string;
}) {
  return (
    <span
      data-variant={variant}
      className={
        "inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium " +
        (className ?? "")
      }
    >
      {children}
    </span>
  );
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={
        "w-full rounded-md border border-gray-200 bg-transparent px-2 py-1 text-xs outline-none focus:border-gray-400 " +
        (className ?? "")
      }
      {...rest}
    />
  );
}

export function Label({ className, ...rest }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={"block text-xs font-medium " + (className ?? "")} {...rest} />;
}

export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={
        "w-full rounded-md border border-gray-200 bg-transparent px-2 py-1 text-xs outline-none focus:border-gray-400 " +
        (className ?? "")
      }
      {...rest}
    >
      {children}
    </select>
  );
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={
        "w-full rounded-md border border-gray-200 bg-transparent px-2 py-1 text-xs font-mono outline-none focus:border-gray-400 " +
        (className ?? "")
      }
      {...rest}
    />
  );
}
