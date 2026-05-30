import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on admin routes (they have their own sidebar)
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-60 bg-card border-r border-border z-[100] flex-col overflow-y-auto">
      <div className="px-4 py-3 border-b border-border sticky top-0 bg-card">
        <p className="text-xs font-bold text-foreground uppercase tracking-wide">Dev Navigator</p>
        <p className="text-[10px] text-muted-foreground truncate mt-0.5">{location.pathname}</p>
      </div>
      <div className="p-2">
        {screens.map((g) => (
          <div key={g.group} className="mb-3">
            <p className="px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              {g.group}
            </p>
            <div className="space-y-0.5">
              {g.items.map((it) => {
                const active = location.pathname === it.path;
                return (
                  <button
                    key={it.path}
                    onClick={() => navigate(it.path)}
                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
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
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ScreenNavigator;
