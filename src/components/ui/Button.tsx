import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary-teal text-white hover:bg-secondary-teal hover:-translate-y-1 hover:shadow-enhanced dark:bg-dark-primary dark:hover:bg-dark-primary/90",
        destructive: "bg-alert-coral text-white hover:bg-alert-coral/90 hover:-translate-y-1 hover:shadow-enhanced dark:bg-dark-alert dark:hover:bg-dark-alert/90",
        outline: "border border-support-gray bg-surface hover:bg-muted hover:text-primary-teal hover:-translate-y-1 hover:shadow-enhanced dark:border-dark-support dark:bg-dark-surface dark:hover:bg-dark-support/80 dark:hover:text-dark-primary",
        secondary: "bg-secondary-teal text-white hover:bg-secondary-teal/90 hover:-translate-y-1 hover:shadow-enhanced dark:bg-dark-primary dark:hover:bg-dark-primary/80",
        ghost: "hover:bg-muted hover:text-primary-teal hover:-translate-y-1 dark:hover:bg-dark-support dark:hover:text-dark-primary",
        link: "underline-offset-4 hover:underline text-primary-teal dark:text-dark-primary",
        success: "bg-success-green text-white hover:bg-success-green/90 hover:-translate-y-1 hover:shadow-enhanced dark:bg-dark-success dark:hover:bg-dark-success/90",
        warning: "bg-alert-coral text-white hover:bg-alert-coral/90 hover:-translate-y-1 hover:shadow-enhanced dark:bg-dark-alert dark:hover:bg-dark-alert/90",
        premium: "bg-premium-gold text-gray-900 hover:bg-premium-gold/90 hover:-translate-y-1 hover:shadow-enhanced dark:bg-dark-premium dark:hover:bg-dark-premium/90"
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };