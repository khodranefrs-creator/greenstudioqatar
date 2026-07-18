import type { ReactNode, ComponentProps } from "react";
import type { ButtonVariant, ButtonSize } from "@/types";
import Link from "next/link";

type ButtonAsButton = {
  as?: "button";
  href?: never;
} & ComponentProps<"button">;

type ButtonAsLink = {
  as: "link";
  href: string;
} & ComponentProps<"a">;

type ButtonProps = (ButtonAsButton | ButtonAsLink) & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
  className?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-offwhite hover:bg-accent-light",
  secondary: "border border-border text-charcoal hover:bg-charcoal hover:text-offwhite",
  ghost: "text-charcoal hover:bg-charcoal/5",
  link: "text-charcoal underline-offset-4 hover:underline p-0 h-auto",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  as = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none";

  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (as === "link" && "href" in props && props.href) {
    const { href: linkHref, ...rest } = props;
    return (
      <Link href={linkHref} className={classes} {...rest}>
        {loading && <Spinner />}
        {children}
      </Link>
    );
  }

  const { ...buttonProps } = props as ComponentProps<"button">;
  return (
    <button className={classes} disabled={loading || buttonProps.disabled} {...buttonProps}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
