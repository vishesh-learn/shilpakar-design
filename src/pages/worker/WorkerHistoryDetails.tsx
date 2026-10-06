import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import { pastJobs } from "./WorkerHistory";
import { CheckCircle2, MapPin, Calendar, Clock, Star, User } from "lucide-react";

const WorkerHistoryDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = pastJobs.find((j) => j.id === id) ?? pastJobs[0];

  const gross = Number(job.amount.replace(/[₹,]/g, ""));
  const fee = Math.round(gross * 0.05);
  const net = gross - fee;
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className="mobile-container bg-background min-h-screen pb-10">
      <ScreenHeader title="Job Details" />
      <div className="px-5 pt-4 space-y-4 animate-fade-in">
        <AppCard className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-success" size={18} />
            <span className="text-success font-semibold text-sm">Completed</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">{job.title}</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><User size={14} /> {job.client}</p>
            <p className="flex items-center gap-2"><MapPin size={14} /> {job.location}</p>
            <p className="flex items-center gap-2"><Calendar size={14} /> {job.date}</p>
            <p className="flex items-center gap-2"><Clock size={14} /> {job.duration}</p>
          </div>
        </AppCard>

        <AppCard>
          <h3 className="font-bold text-foreground mb-2">Description</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{job.description}</p>
        </AppCard>

        <AppCard>
          <p className="text-xs text-muted-foreground mb-2">Client Rating</p>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                className={i < job.rating ? "text-warning fill-warning" : "text-muted-foreground/30"}
              />
            ))}
            <span className="ml-2 font-semibold text-foreground">{job.rating}.0</span>
          </div>
        </AppCard>

        <AppCard className="space-y-2">
          <h3 className="font-bold text-foreground mb-1">Payment</h3>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Job amount</span>
            <span className="text-foreground">{inr(gross)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Platform fee (5%)</span>
            <span className="text-foreground">-{inr(fee)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border font-bold">
            <span className="text-foreground">You received</span>
            <span className="text-success">{inr(net)}</span>
          </div>
        </AppCard>

        <button
          onClick={() => navigate("/worker/history")}
          className="w-full text-primary text-sm font-semibold py-2"
        >
          Back to Work History
        </button>
      </div>
    </div>
  );
};

export default WorkerHistoryDetails;
