import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import AppCard from "@/components/AppCard";
import { PlusCircle, Users, Briefcase, Clock } from "lucide-react";

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    { icon: PlusCircle, label: "Post Job", desc: "Create a new job", path: "/client/post-job", color: "text-primary" },
    { icon: Users, label: "Find Workers", desc: "Browse workers", path: "/client/workers", color: "text-success" },
    { icon: Briefcase, label: "Active Jobs", desc: "2 in progress", path: "#", color: "text-warning" },
    { icon: Clock, label: "History", desc: "Past jobs", path: "#", color: "text-muted-foreground" },
  ];

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <div className="bg-primary px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/70 text-sm">Welcome back</p>
            <h1 className="text-2xl font-bold text-primary-foreground">Anil Sharma</h1>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">AS</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-3 animate-fade-in">
        {cards.map((card) => (
          <AppCard key={card.label} onClick={() => navigate(card.path)} className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0">
              <card.icon className={card.color} size={28} />
            </div>
            <div>
              <h3 className="font-bold text-foreground">{card.label}</h3>
              <p className="text-muted-foreground text-sm">{card.desc}</p>
            </div>
          </AppCard>
        ))}
      </div>
      <BottomNav type="client" />
    </div>
  );
};

export default ClientDashboard;
