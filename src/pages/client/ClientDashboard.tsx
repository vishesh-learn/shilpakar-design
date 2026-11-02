import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import AppCard from "@/components/AppCard";
import { Briefcase, MapPin, Clock, CheckCircle2, Star, ChevronRight } from "lucide-react";
import { SkeletonList } from "@/components/Skeleton";
import { useSimulatedLoading } from "@/hooks/useSimulatedLoading";
import { JobStatus, getJobStatusLabel, type JobStatusId } from "@/lib/jobStatus";

const activeJobsPreview: { id: string; title: string; worker: string; location: string; status: JobStatusId; statusLabel?: string; time: string }[] = [
  { id: "1", title: "House Cleaning", worker: "Ramesh Kumar", location: "Andheri West", status: JobStatus.inProgress.id, time: "Started 2h ago" },
  { id: "2", title: "Plumbing Repair", worker: "Suresh Patil", location: "Bandra East", status: JobStatus.workerAssigned.id, time: "Arriving 20 min" },
  { id: "3", title: "Wall Painting", worker: "No worker yet", location: "Andheri West", status: JobStatus.awaitingWorker.id, time: "Posted 30 min ago" },
  { id: "4", title: "Furniture Repair", worker: "Invited: Vikas Singh", location: "Powai", status: JobStatus.awaitingWorker.id, statusLabel: "Invite sent", time: "Sent 10 min ago" },
];


const historyPreview = [
  { id: "5", title: "AC Servicing", worker: "Ramesh Kumar", date: "May 28", amount: "₹900", rating: 0 },
  { id: "1", title: "Electrical Work", worker: "Mahesh Joshi", date: "May 22", amount: "₹1,200", rating: 5 },
  { id: "2", title: "Deep Cleaning", worker: "Priya Devi", date: "May 18", amount: "₹800", rating: 4 },
];

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const loading = useSimulatedLoading();

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

      <div className="px-5 pt-6 space-y-6 animate-fade-in">
        {/* Active Jobs */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground text-lg">Active Jobs</h2>
            <button
              onClick={() => navigate("/client/active-jobs")}
              className="text-primary text-sm font-semibold flex items-center gap-0.5"
            >
              View more <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {loading ? <SkeletonList count={4} /> : activeJobsPreview.map((job) => (
              <AppCard key={job.id} onClick={() => navigate(`/client/active-job/${job.id}`)} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-accent flex items-center justify-center">
                      <Briefcase className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">{job.title}</h3>
                      <p className="text-muted-foreground text-xs">{job.worker}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-warning bg-warning/10 px-2 py-1 rounded-full">{job.statusLabel ?? getJobStatusLabel(job.status)}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{job.time}</span>
                </div>
              </AppCard>
            ))}
          </div>
        </section>

        {/* History */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground text-lg">History</h2>
            <button
              onClick={() => navigate("/client/history")}
              className="text-primary text-sm font-semibold flex items-center gap-0.5"
            >
              View more <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {loading ? <SkeletonList count={3} /> : historyPreview.map((job) => (
              <AppCard key={job.id} onClick={() => navigate(`/client/history/${job.id}`)} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="text-success" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">{job.title}</h3>
                      <p className="text-muted-foreground text-xs">{job.worker}</p>
                    </div>
                  </div>
                  <span className="font-bold text-foreground text-sm">{job.amount}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{job.date}</span>
                  {job.rating > 0 ? (
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: job.rating }).map((_, i) => (
                        <Star key={i} size={12} className="text-warning fill-warning" />
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/client/rate-job", {
                          state: { title: job.title, worker: job.worker, date: job.date },
                        });
                      }}
                      className="text-primary font-semibold flex items-center gap-1"
                    >
                      <Star size={12} /> Rate this job
                    </button>
                  )}
                </div>
              </AppCard>
            ))}
          </div>
        </section>
      </div>
      <BottomNav type="client" />
    </div>
  );
};

export default ClientDashboard;
