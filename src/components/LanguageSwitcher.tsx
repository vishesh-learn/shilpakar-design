import React, { useState } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", label: "English", native: "EN" },
  { code: "hi", label: "Hindi", native: "हि" },
  { code: "mr", label: "Marathi", native: "म" },
];

const LanguageSwitcher: React.FC = () => {
  const [selected, setSelected] = useState(
    () => localStorage.getItem("language") || "en"
  );

  const handleSelect = (code: string) => {
    setSelected(code);
    localStorage.setItem("language", code);
  };

  const current = languages.find((l) => l.code === selected);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium text-primary hover:bg-accent transition-colors">
          <Globe size={16} />
          <span>{current?.native}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={selected === lang.code ? "bg-accent font-semibold" : ""}
          >
            <span>{lang.native}</span>
            <span className="ml-2 text-muted-foreground text-xs">({lang.label})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
