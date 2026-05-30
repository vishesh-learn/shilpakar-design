import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navigation, X, ChevronDown, ChevronUp } from "lucide-react";

const screens: { group: string; items: { label: string; path: string }[] }[] = [
  {
    group: "Onboarding",
    items: [
      { label: "Splash", path: "/" },
      { label: "Language", path: "/language" },
      { label: "Login", path: "/login" },
      { label: "Role Selection", path: "/role" },
    ],
  },
  {
    group: "Worker",
    items: [
      { label: "Setup", path: "/worker/setup" },
      { label: "Dashboard", path: "/worker/dashboard" },
      { label: "Jobs", path: "/worker/jobs" },
      { label: "Job Details", path: "/worker/job/1" },
      { label: "Active Job", path: "/worker/active-job" },
      { label: "Earnings", path: "/worker/earnings" },
      { label: "Profile", path: "/worker/profile" },
    ],
  },
  {
    group: "Client",
    items: [
      { label: "Setup", path: "/client/setup" },
      { label: "Dashboard", path: "/client/dashboard" },
      { label: "Post Job", path: "/client/post-job" },
      { label: "Workers", path: "/client/workers" },
      { label: "Worker Profile", path: "/client/worker/1" },
      { label: "Rate Worker", path: "/client/rate-worker" },
      { label: "Profile", path: "/client/profile" },
    ],
  },
  {
    group: "Admin",
    items: [
      { label: "Dashboard", path: "/admin" },
      { label: "Workers", path: "/admin/workers" },
      { label: "Clients", path: "/admin/clients" },
      { label: "Jobs", path: "/admin/jobs" },
      { label: "Revenue", path: "/admin/revenue" },
      { label: "Reports", path: "/admin/reports" },
    ],
  },
];

const ScreenNavigator: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-4 z-[100] w-12 h-12 rounded-full bg-foreground text-background shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        title="Screen Navigator (Dev)"
      >
        {open ? <X size={20} /> : <Navigation size={20} />}
      </button>

      {open && (
        <div className="fixed bottom-40 right-4 z-[100] w-72 max-h-[70vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl p-3 animate-fade-in">
          <div className="px-2 pb-2 mb-2 border-b border-border">
            <p className="text-xs font-bold text-muted-foreground uppercase">Dev · Screen Navigator</p>
            <p className="text-xs text-muted-foreground truncate">{location.pathname}</p>
          </div>
          {screens.map((g) => {
            const isCollapsed = collapsed[g.group];
            return (
              <div key={g.group} className="mb-2">
                <button
                  onClick={() => setCollapsed({ ...collapsed, [g.group]: !isCollapsed })}
                  className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-foreground uppercase tracking-wide"
                >
                  {g.group}
                  {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </button>
                {!isCollapsed && (
                  <div className="space-y-1 mt-1">
                    {g.items.map((it) => {
                      const active = location.pathname === it.path;
                      return (
                        <button
                          key={it.path}
                          onClick={() => go(it.path)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            active
                              ? "bg-primary text-primary-foreground font-semibold"
                              : "text-foreground hover:bg-accent"
                          }`}
                        >
                          {it.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ScreenNavigator;
