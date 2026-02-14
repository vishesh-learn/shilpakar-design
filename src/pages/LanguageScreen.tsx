import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "@/components/AppButton";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "mr", label: "Marathi", native: "मराठी" },
];

const LanguageScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mobile-container bg-background flex flex-col min-h-screen px-6 py-12">
      <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6">
          <Globe className="text-primary" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Choose Language</h1>
        <p className="text-muted-foreground text-sm mb-10">Select your preferred language</p>

        <div className="w-full space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className={`w-full py-4 px-6 rounded-2xl border-2 text-left transition-all ${
                selected === lang.code
                  ? "border-primary bg-accent"
                  : "border-border bg-card"
              }`}
            >
              <span className="text-lg font-semibold text-foreground">{lang.native}</span>
              <span className="text-muted-foreground text-sm ml-2">({lang.label})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <AppButton onClick={() => selected && navigate("/login")} disabled={!selected}>
          Continue
        </AppButton>
      </div>
    </div>
  );
};

export default LanguageScreen;
