import React from "react";
import { useNavigate } from "react-router-dom";


import BottomNav from "@/components/BottomNav";
import AppCard from "@/components/AppCard";
import ScreenHeader from "@/components/ScreenHeader";
import { Briefcase, MapPin, Clock } from "lucide-react";

const activeJobs = [
  {
    id: "1",
    title: "House Cleaning",
    worker: "Ramesh Kumar",
    location: "Andheri West, Mumbai",
    status: "In Progress",
    time: "Started 2h ago",
  },
  {
    id: "2",
    title: "Plumbing Repair",
    worker: "Suresh Patil",
    location: "Bandra East, Mumbai",
    status: "On the way",
    time: "Arriving in 20 min",
  },
  {
    id: "3",
    title: "Wall Painting",
    worker: "No worker yet",
    location: "Andheri West, Mumbai",
    status: "Awaiting worker",
    time: "Posted 30 min ago",
  },
  {
    id: "4",
    title: "Furniture Repair",
    worker: "Invited: Vikas Singh",
    location: "Powai, Mumbai",
    status: "Invite sent",
    time: "Sent 10 min ago",
  },
];


const ClientActiveJobs: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title="Active Jobs" />
      <div className="px-5 pt-4 space-y-3 animate-fade-in">
        {activeJobs.map((job) => (
          <AppCard key={job.id} onClick={() => navigate(`/client/active-job/${job.id}`)} className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
                  <Briefcase className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{job.title}</h3>
                  <p className="text-muted-foreground text-sm">{job.worker}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-warning bg-warning/10 px-2 py-1 rounded-full">
                {job.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={14} />
              <span>{job.time}</span>
            </div>
          </AppCard>
        ))}
      </div>
      <BottomNav type="client" />
    </div>
  );
};

export default ClientActiveJobs;
