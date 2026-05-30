import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import AppCard from "@/components/AppCard";
import ScreenHeader from "@/components/ScreenHeader";
import { CheckCircle2, Star } from "lucide-react";

const pastJobs = [
  { id: "1", title: "Electrical Work", worker: "Mahesh Joshi", date: "May 22, 2026", amount: "₹1,200", rating: 5 },
  { id: "2", title: "Deep Cleaning", worker: "Priya Devi", date: "May 18, 2026", amount: "₹800", rating: 4 },
  { id: "3", title: "Garden Maintenance", worker: "Vikas Singh", date: "May 10, 2026", amount: "₹600", rating: 5 },
  { id: "4", title: "Painting", worker: "Arjun Yadav", date: "April 28, 2026", amount: "₹3,500", rating: 4 },
];

const ClientHistory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title="Job History" onBack={() => navigate("/client/dashboard")} />
      <div className="px-5 pt-4 space-y-3 animate-fade-in">
        {pastJobs.map((job) => (
          <AppCard key={job.id} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="text-success" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{job.title}</h3>
                  <p className="text-muted-foreground text-sm">{job.worker}</p>
                </div>
              </div>
              <span className="font-bold text-foreground">{job.amount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{job.date}</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: job.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-warning fill-warning" />
                ))}
              </div>
            </div>
          </AppCard>
        ))}
      </div>
      <BottomNav type="client" />
    </div>
  );
};

export default ClientHistory;
