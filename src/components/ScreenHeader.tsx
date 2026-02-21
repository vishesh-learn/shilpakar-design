import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  showLanguage?: boolean;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, showBack = true, rightAction, showLanguage = true }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-5 py-4 bg-card border-b border-border sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-foreground">
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="text-lg font-bold text-foreground">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {showLanguage && <LanguageSwitcher />}
        {rightAction}
      </div>
    </div>
  );
};

export default ScreenHeader;
