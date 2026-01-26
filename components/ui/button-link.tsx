import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonLinkVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-border bg-background px-6 py-3 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-sm",
        lg: "px-8 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof buttonLinkVariants> {}

const ButtonLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  ButtonLinkProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      className={cn(buttonLinkVariants({ variant, size, className }))}
      {...props}
    />
  );
});

ButtonLink.displayName = "ButtonLink";

export { ButtonLink, buttonLinkVariants };
