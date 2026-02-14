import React from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import BottomNav from "@/components/BottomNav";
import { MapPin, Clock, IndianRupee } from "lucide-react";

const jobs = [
  { id: 1, title: "Electrical Wiring", client: "Anil Sharma", location: "Andheri West", wage: "₹800/day", time: "2 hours ago", type: "Electrician" },
  { id: 2, title: "Bathroom Plumbing", client: "Priya Patel", location: "Bandra", wage: "₹700/day", time: "3 hours ago", type: "Plumber" },
  { id: 3, title: "Wall Construction", client: "Raj Builders", location: "Powai", wage: "₹900/day", time: "5 hours ago", type: "Mason" },
  { id: 4, title: "Roof Repair", client: "Suresh Kumar", location: "Dadar", wage: "₹750/day", time: "1 day ago", type: "Carpenter" },
];

const WorkerJobs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title="Available Jobs" showBack={false} />
      <div className="px-5 py-4 space-y-3 animate-fade-in">
        {jobs.map((job) => (
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
      <BottomNav type="worker" />
    </div>
  );
};

export default WorkerJobs;
