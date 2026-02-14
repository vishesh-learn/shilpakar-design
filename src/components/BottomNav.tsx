import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Briefcase, Wallet, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  type: "worker" | "client";
}

const BottomNav: React.FC<BottomNavProps> = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const workerTabs = [
    { icon: Home, label: "Home", path: "/worker/dashboard" },
    { icon: Briefcase, label: "Jobs", path: "/worker/jobs" },
    { icon: Wallet, label: "Earnings", path: "/worker/earnings" },
    { icon: User, label: "Profile", path: "/worker/profile" },
  ];

  const clientTabs = [
    { icon: Home, label: "Home", path: "/client/dashboard" },
    { icon: Briefcase, label: "Post Job", path: "/client/post-job" },
    { icon: User, label: "Profile", path: "/client/profile" },
  ];

  const tabs = type === "worker" ? workerTabs : clientTabs;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-card border-t border-border">
      <div className="flex items-center justify-around py-2 pb-6">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <tab.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
