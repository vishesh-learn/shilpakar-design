import React from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import BottomNav from "@/components/BottomNav";
import { CheckCircle2, Star } from "lucide-react";

export const pastJobs = [
  { id: "1", title: "Electrical Wiring", client: "Anil Sharma", location: "Andheri West, Mumbai", date: "Feb 10, 2026", duration: "3 days", amount: "₹2,400", rating: 5 },
  { id: "2", title: "Fan Installation", client: "Priya Patel", location: "Bandra, Mumbai", date: "Feb 8, 2026", duration: "1 day", amount: "₹800", rating: 4 },
  { id: "3", title: "Socket Repair", client: "Raj Kumar", location: "Powai, Mumbai", date: "Feb 5, 2026", duration: "1 day", amount: "₹500", rating: 5 },
  { id: "4", title: "Kitchen Rewiring", client: "Neha Gupta", location: "Malad, Mumbai", date: "Jan 28, 2026", duration: "2 days", amount: "₹1,600", rating: 4 },
];

const WorkerHistory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title="Work History" />
      <div className="px-5 pt-4 space-y-3 animate-fade-in">
        {pastJobs.map((job) => (
          <AppCard key={job.id} onClick={() => navigate(`/worker/history/${job.id}`)} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="text-success" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{job.title}</h3>
                  <p className="text-muted-foreground text-sm">{job.client}</p>
                </div>
              </div>
              <span className="font-bold text-success">{job.amount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{job.date} · {job.duration}</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: job.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-warning fill-warning" />
                ))}
              </div>
            </div>
          </AppCard>
        ))}
      </div>
      <BottomNav type="worker" />
    </div>
  );
};

export default WorkerHistory;
