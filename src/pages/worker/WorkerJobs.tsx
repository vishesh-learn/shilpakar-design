import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import BottomNav from "@/components/BottomNav";
import { SkeletonList } from "@/components/Skeleton";
import { useSimulatedLoading } from "@/hooks/useSimulatedLoading";
import { MapPin, Clock, IndianRupee } from "lucide-react";
import { getWorkerAccess, loadWorkerBillingRecord } from "@/lib/workerBilling";

const jobs = [
  { id: 1, title: "Electrical Wiring", client: "Anil Sharma", location: "Andheri West", wage: "₹800/day", time: "2 hours ago", type: "Electrician" },
  { id: 2, title: "Bathroom Plumbing", client: "Priya Patel", location: "Bandra", wage: "₹700/day", time: "3 hours ago", type: "Plumber" },
  { id: 3, title: "Wall Construction", client: "Raj Builders", location: "Powai", wage: "₹900/day", time: "5 hours ago", type: "Mason" },
  { id: 4, title: "Roof Repair", client: "Suresh Kumar", location: "Dadar", wage: "₹750/day", time: "1 day ago", type: "Carpenter" },
];

const invitations = [
  { id: "invitation-1", title: "Apartment Electrical Repair", client: "Anil Sharma", location: "Andheri West", wage: "₹800/day", time: "20 min ago", type: "Electrician" },
  { id: "invitation-2", title: "Bathroom Pipe Repair", client: "Priya Patel", location: "Bandra", wage: "₹700/day", time: "1 hour ago", type: "Plumber" },
];

const WorkerJobs: React.FC = () => {
  const navigate = useNavigate();
  const loading = useSimulatedLoading();
  const [searchParams, setSearchParams] = useSearchParams();
  const showInvitations = searchParams.get("tab") === "invitations";
  const visibleJobs = showInvitations ? invitations : jobs;
  const overdue = getWorkerAccess(loadWorkerBillingRecord()).overdueBills.length > 0;

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title="Jobs" showBack={false} />
      <div className="px-5 pt-4">
        {overdue && !showInvitations && (
          <button
            type="button"
            onClick={() => navigate("/worker/billing")}
            className="mb-4 w-full border-l-4 border-warning bg-accent px-4 py-3 text-left text-sm text-accent-foreground"
          >
            Monthly bill overdue. Pay to apply for jobs.
          </button>
        )}
        <div className="grid grid-cols-2 rounded-xl bg-muted p-1" role="tablist" aria-label="Job lists">
          <button
            role="tab"
            aria-selected={!showInvitations}
            onClick={() => setSearchParams({})}
            className={`min-h-11 rounded-lg px-3 text-sm font-semibold transition-colors ${!showInvitations ? "bg-card text-primary shadow-sm" : "text-muted-foreground"}`}
          >Available jobs</button>
          <button
            role="tab"
            aria-selected={showInvitations}
            onClick={() => setSearchParams({ tab: "invitations" })}
            className={`min-h-11 rounded-lg px-3 text-sm font-semibold transition-colors ${showInvitations ? "bg-card text-primary shadow-sm" : "text-muted-foreground"}`}
          >Invitations <span className="ml-1">{invitations.length}</span></button>
        </div>
      </div>
      <div className="px-5 py-4 space-y-3 animate-fade-in">
        {loading ? <SkeletonList count={4} /> : visibleJobs.map((job) => (
          <AppCard key={job.id} onClick={() => navigate(`/worker/job/${job.id}`)}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-foreground">{job.title}</h3>
                <p className="text-muted-foreground text-sm">{job.client}</p>
              </div>
              <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                {showInvitations ? "Invited" : job.type}
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
