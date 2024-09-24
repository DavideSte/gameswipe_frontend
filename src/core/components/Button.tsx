import { LoaderCircle } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "medium",
      loading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    let cn = "bg-color3 text-white text-base font-semibold rounded-md whitespace-nowrap px-4 py-2";

    if (size === "small") {
      cn = twMerge(cn, "px-2 py-1 text-xs font-medium");
    } else if (size === "large") {
      cn = twMerge(cn, "px-6 py-3 text-lg");
    }

    if (variant === "secondary") cn = twMerge(cn, "bg-neptune-200  text-neptune-500");

    if (disabled) cn = twMerge(cn, "cursor-not-allowed opacity-70");

    if (loading) cn = twMerge(cn, "animate-pulse cursor-wait");

    cn = twMerge(cn, className);

    return (
      <button className={cn} ref={ref} {...props}>
        {/* only change visibility to hidden */}
        <div className={loading ? "hidden" : ""}>{props.children}</div>
        {loading && <LoaderCircle className="animate-spin mx-auto" />}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
