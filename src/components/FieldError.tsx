import React from "react";
import { CircleAlert } from "lucide-react";

interface FieldErrorProps {
  message?: string | null;
  className?: string;
}

/**
 * Inline error message rendered under a field.
 * Returns null when there is no message so it can be rendered unconditionally.
 */
const FieldError: React.FC<FieldErrorProps> = ({ message, className }) => {
  if (!message) return null;
  return (
    <p
      role="alert"
      className={`flex items-center gap-1.5 text-xs font-medium text-destructive mt-1.5 animate-fade-in ${
        className ?? ""
      }`}
    >
      <CircleAlert size={14} className="flex-shrink-0" />
      {message}
    </p>
  );
};

export default FieldError;

/** Trigger a one-shot shake animation on a field/section. */
export const triggerShake = (setter: (v: boolean) => void) => {
  setter(true);
  window.setTimeout(() => setter(false), 450);
};
