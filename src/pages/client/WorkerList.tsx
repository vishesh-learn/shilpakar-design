import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import BottomNav from "@/components/BottomNav";
import { SkeletonList } from "@/components/Skeleton";
import { useSimulatedLoading } from "@/hooks/useSimulatedLoading";
import { Star, MapPin, Plus, Check, Briefcase, Loader2, Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  canShowWorkerInClientDirectory,
  getWorkerAccess,
  loadWorkerBillingRecord,
} from "@/lib/workerBilling";

const workers = [
  { id: 1, name: "Ramesh Kumar", skill: "Electrician", rating: 4.5, jobs: 47, location: "Andheri", email: "ramesh.kumar@example.com", phone: "+91 98765 43210" },
  { id: 2, name: "Sunil Yadav", skill: "Plumber", rating: 4.2, jobs: 32, location: "Bandra", email: "sunil.yadav@example.com", phone: "+91 98765 43211" },
  { id: 3, name: "Deepak Singh", skill: "Carpenter", rating: 4.8, jobs: 56, location: "Powai", email: "deepak.singh@example.com", phone: "+91 98765 43212" },
  { id: 4, name: "Manoj Patil", skill: "Mason", rating: 4.0, jobs: 28, location: "Dadar", email: "manoj.patil@example.com", phone: "+91 98765 43213" },
  { id: 5, name: "Vikas Sharma", skill: "Helper", rating: 3.8, jobs: 15, location: "Thane", email: "vikas.sharma@example.com", phone: "+91 98765 43214" },
];

const inviteJobs: Record<string, { title: string; amount: string; location: string }> = {
  "1": { title: "House Cleaning", amount: "₹600", location: "Andheri West, Mumbai" },
  "2": { title: "Plumbing Repair", amount: "₹450", location: "Bandra East, Mumbai" },
  "3": { title: "Wall Painting", amount: "₹1,500", location: "Andheri West, Mumbai" },
  "4": { title: "Furniture Repair", amount: "₹1,000", location: "Powai, Mumbai" },
};

const WorkerList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteJobId = searchParams.get("invite");
  const inviteJob = inviteJobId ? inviteJobs[inviteJobId] : undefined;
  const [query, setQuery] = useState("");
  const [invited, setInvited] = useState<number[]>([]);
  const [invitingId, setInvitingId] = useState<number | null>(null);
  const loading = useSimulatedLoading();
  const overdueWorkerAccess = getWorkerAccess(loadWorkerBillingRecord());
  const visibleWorkers = useMemo(
    () => workers.filter((worker) => {
      const access = worker.id === 1
        ? overdueWorkerAccess
        : { ...overdueWorkerAccess, canBeListed: true };
      return canShowWorkerInClientDirectory(access, {
        query,
        name: worker.name,
        email: worker.email,
        phone: worker.phone,
        inviteMode: Boolean(inviteJob),
      });
    }),
    [inviteJob, overdueWorkerAccess, query],
  );

  const handleInvite = (e: React.MouseEvent, workerId: number, workerName: string) => {
    e.stopPropagation();
    if (invited.includes(workerId) || invitingId !== null) return;
    setInvitingId(workerId);
    window.setTimeout(() => {
      setInvitingId(null);
      setInvited((prev) => [...prev, workerId]);
      toast.success(`Invite sent to ${workerName}`, {
        description: inviteJob ? `For "${inviteJob.title}"` : undefined,
      });
    }, 700);
  };

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title={inviteJob ? "Invite a Worker" : "Workers Nearby"} showBack={!!inviteJob} />

      {inviteJob && (
        <div className="sticky top-[65px] z-20 w-full bg-primary text-primary-foreground border-b border-primary/40 shadow-md">
          <div className="flex items-center gap-3 px-5 py-3">
            <div className="w-9 h-9 rounded-lg bg-primary-foreground/15 flex items-center justify-center shrink-0">
              <Briefcase className="text-primary-foreground" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground/70">Inviting for</p>
              <h3 className="font-bold leading-tight truncate">{inviteJob.title}</h3>
              <p className="text-[11px] text-primary-foreground/70 truncate">{inviteJob.location}</p>
            </div>
            <p className="font-bold leading-tight shrink-0">{inviteJob.amount}</p>
          </div>
        </div>
      )}

      {!inviteJob && (
        <div className="px-5 pt-4 space-y-3">
          <label className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 focus-within:border-primary">
            <Search className="text-muted-foreground shrink-0" size={18} />
            <input
              aria-label="Search workers by name, phone, or email"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search workers by name, phone, or email"
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
            />
          </label>
          {!overdueWorkerAccess.canBeListed && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground" role="status">
              <AlertCircle size={17} className="text-warning shrink-0 mt-0.5" />
              <p>One worker has paused public listing. Search using their exact phone number or email to find them.</p>
            </div>
          )}
        </div>
      )}

      <div className="px-5 py-4 space-y-3 animate-fade-in">
        {loading ? <SkeletonList count={5} /> : visibleWorkers.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No workers match this search.</p>
        ) : visibleWorkers.map((w) => {
          const isInvited = invited.includes(w.id);
          return (
            <AppCard key={w.id} onClick={() => navigate(`/client/worker/${w.id}`)}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-lg">{w.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground">{w.name}</h3>
                  <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-0.5 rounded-full">{w.skill}</span>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Star size={12} className="text-warning" fill="currentColor" /> {w.rating}</span>
                    <span>{w.jobs} jobs</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {w.location}</span>
                  </div>
                </div>
                {inviteJob && (
                  <button
                    onClick={(e) => handleInvite(e, w.id, w.name)}
                    disabled={isInvited || invitingId === w.id}
                    aria-busy={invitingId === w.id || undefined}
                    aria-label={isInvited ? `Invited ${w.name}` : `Invite ${w.name}`}
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isInvited
                        ? "bg-success text-success-foreground"
                        : "bg-primary text-primary-foreground hover:opacity-90 active:scale-90"
                    }`}
                  >
                    {isInvited ? (
                      <Check size={20} />
                    ) : invitingId === w.id ? (
                      <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                    ) : (
                      <Plus size={20} />
                    )}
                  </button>
                )}
              </div>
            </AppCard>
          );
        })}
      </div>
      {!inviteJob && <BottomNav type="client" />}
    </div>
  );
};

export default WorkerList;
