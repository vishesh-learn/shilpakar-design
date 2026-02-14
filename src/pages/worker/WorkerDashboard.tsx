import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import AppCard from "@/components/AppCard";
import { Briefcase, Star, MapPin, Clock, ToggleLeft, ToggleRight } from "lucide-react";

const WorkerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(true);

  const cards = [
    { icon: Briefcase, label: "New Jobs", count: "5", path: "/worker/jobs", color: "text-primary" },
    { icon: Clock, label: "Active Job", count: "1", path: "/worker/active-job", color: "text-warning" },
    { icon: Star, label: "Rating", count: "4.5", path: "#", color: "text-warning" },
    { icon: MapPin, label: "Nearby", count: "3", path: "/worker/jobs", color: "text-success" },
  ];

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <div className="bg-primary px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/70 text-sm">Welcome back</p>
            <h1 className="text-2xl font-bold text-primary-foreground">Ramesh Kumar</h1>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">RK</span>
          </div>
        </div>

        <AppCard className="flex items-center justify-between !bg-primary-foreground/10 !border-primary-foreground/20">
          <div>
            <p className="text-primary-foreground font-semibold">Availability</p>
            <p className="text-primary-foreground/70 text-sm">
              {available ? "You are visible to clients" : "You are hidden"}
            </p>
          </div>
          <button onClick={() => setAvailable(!available)}>
            {available ? (
              <ToggleRight className="text-success" size={40} />
            ) : (
              <ToggleLeft className="text-primary-foreground/50" size={40} />
            )}
          </button>
        </AppCard>
      </div>

      <div className="px-5 pt-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {cards.map((card) => (
            <AppCard key={card.label} onClick={() => navigate(card.path)} className="flex flex-col items-center gap-2 py-6">
              <card.icon className={card.color} size={32} />
              <span className="text-2xl font-bold text-foreground">{card.count}</span>
              <span className="text-muted-foreground text-sm">{card.label}</span>
            </AppCard>
          ))}
        </div>
      </div>

      <BottomNav type="worker" />
    </div>
  );
};

export default WorkerDashboard;
