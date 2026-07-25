import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import { Star, MapPin, Clock, CheckCircle, ToggleLeft, ToggleRight, ChevronRight, IndianRupee } from "lucide-react";

const activeJob = {
  id: "1",
  title: "Electrical Wiring",
  client: "Anil Sharma",
  location: "Andheri West, Mumbai",
  status: "In Progress",
  progress: "Day 2 of 3",
};

const nearbyJobs = [
  { id: 2, title: "Bathroom Plumbing", client: "Priya Patel", location: "Bandra (1.2 km)", wage: "₹700/day", time: "3 hours ago", type: "Plumber" },
  { id: 3, title: "Wall Construction", client: "Raj Builders", location: "Powai (2.4 km)", wage: "₹900/day", time: "5 hours ago", type: "Mason" },
];

const newJobs = [
  { id: 4, title: "Roof Repair", client: "Suresh Kumar", location: "Dadar", wage: "₹750/day", time: "1 day ago", type: "Carpenter" },
  { id: 5, title: "TV Mounting", client: "Neha Gupta", location: "Malad", wage: "₹500/day", time: "2 days ago", type: "Electrician" },
  { id: 6, title: "Kitchen Tiles", client: "Amit Shah", location: "Borivali", wage: "₹850/day", time: "3 days ago", type: "Mason" },
];

const StarRating = ({ rating, size = 14 }: { rating: number; size?: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.max(0, Math.min(1, rating - (star - 1)));
        return (
          <div key={star} className="relative">
            <Star size={size} className="text-primary-foreground/30" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star size={size} className="fill-warning text-warning" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const WorkerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(true);

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <div className="bg-primary px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/70 text-sm">Welcome back</p>
            <h1 className="text-2xl font-bold text-primary-foreground">Ramesh Kumar</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground">
              <StarRating rating={4.5} size={14} />
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">RK</span>
            </div>
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
        {/* Active Job */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground text-lg">Active Job</h2>
            <button
              onClick={() => navigate("/worker/active-job")}
              className="text-primary text-sm font-semibold flex items-center gap-0.5"
            >
              View details <ChevronRight size={16} />
            </button>
          </div>
          <AppCard onClick={() => navigate("/worker/active-job")} className="border-2 !border-success">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="text-success" size={18} />
              <span className="text-success font-semibold text-sm">{activeJob.status}</span>
            </div>
            <h3 className="font-bold text-foreground">{activeJob.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{activeJob.client}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
              <MapPin size={14} /> {activeJob.location}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Clock size={14} /> {activeJob.progress}
            </div>
          </AppCard>
        </section>

        {/* Nearby Jobs */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground text-lg">Nearby Jobs</h2>
            <button
              onClick={() => navigate("/worker/jobs")}
              className="text-primary text-sm font-semibold flex items-center gap-0.5"
            >
              View more <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {nearbyJobs.map((job) => (
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
        </section>

        {/* New Jobs */}
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
            {newJobs.map((job) => (
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
      </div>

      <BottomNav type="worker" />
    </div>
  );
};

export default WorkerDashboard;
