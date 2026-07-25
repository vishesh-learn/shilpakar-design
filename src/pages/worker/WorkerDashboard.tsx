import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import { Star, MapPin, Clock, ToggleLeft, ToggleRight, ChevronRight, IndianRupee } from "lucide-react";

const jobsPreview = [
  { id: 1, title: "Electrical Wiring", client: "Anil Sharma", location: "Andheri West", wage: "₹800/day", time: "2 hours ago", type: "Electrician" },
  { id: 2, title: "Bathroom Plumbing", client: "Priya Patel", location: "Bandra", wage: "₹700/day", time: "3 hours ago", type: "Plumber" },
  { id: 3, title: "Wall Construction", client: "Raj Builders", location: "Powai", wage: "₹900/day", time: "5 hours ago", type: "Mason" },
];

const WorkerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(true);

  const cards = [
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

      <div className="px-5 pt-6 space-y-6">
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground text-lg">New Jobs</h2>
            <button
              onClick={() => navigate("/worker/jobs")}
              className="text-primary text-sm font-semibold flex items-center gap-0.5"
            >
              View more <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {jobsPreview.map((job) => (
              <AppCard key={job.id} onClick={() => navigate(`/worker/job/${job.id}`)}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-foreground">{job.title}</h3>
                    <p className="text-muted-foreground text-sm">{job.client}</p>
                  </div>
                  <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                  <span className="flex items-center gap-1"><IndianRupee size={14} /> {job.wage}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                  <Clock size={12} /> {job.time}
                </div>
              </AppCard>
            ))}
          </div>
          <AppButton
            variant="outline"
            size="md"
            className="mt-3"
            onClick={() => navigate("/worker/jobs")}
          >
            View all jobs <ChevronRight size={16} />
          </AppButton>
        </section>

        <section>
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
        </section>
      </div>

      <BottomNav type="worker" />
    </div>
  );
};

export default WorkerDashboard;
