import React from "react";
import { cn } from "@/lib/utils";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "success" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ variant = "primary", size = "lg", fullWidth = true, className, children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:opacity-90 active:opacity-80",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border-2 border-primary text-primary bg-transparent hover:bg-accent",
      ghost: "text-primary hover:bg-accent",
      success: "bg-success text-success-foreground hover:opacity-90",
      destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
    };
    const sizes = {
      sm: "py-2 px-4 text-sm rounded-lg",
      md: "py-3 px-5 text-base rounded-xl",
      lg: "py-4 px-6 text-lg rounded-xl",
      xl: "py-5 px-8 text-xl rounded-2xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "font-semibold transition-all duration-200 flex items-center justify-center gap-2",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

AppButton.displayName = "AppButton";
export default AppButton;
