import React from "react";
import { cn } from "@/lib/utils";

interface AppCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: "sm" | "md" | "lg";
}

const AppCard: React.FC<AppCardProps> = ({ children, className, onClick, padding = "md" }) => {
  const paddings = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-card rounded-2xl border border-border shadow-sm transition-all duration-200",
        onClick && "cursor-pointer hover:shadow-md active:scale-[0.98]",
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export default AppCard;
