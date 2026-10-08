import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import BottomNav from "@/components/BottomNav";
import { Star, MapPin, Plus, Check, Briefcase } from "lucide-react";
import { toast } from "sonner";

const workers = [
  { id: 1, name: "Ramesh Kumar", skill: "Electrician", rating: 4.5, jobs: 47, location: "Andheri" },
  { id: 2, name: "Sunil Yadav", skill: "Plumber", rating: 4.2, jobs: 32, location: "Bandra" },
  { id: 3, name: "Deepak Singh", skill: "Carpenter", rating: 4.8, jobs: 56, location: "Powai" },
  { id: 4, name: "Manoj Patil", skill: "Mason", rating: 4.0, jobs: 28, location: "Dadar" },
  { id: 5, name: "Vikas Sharma", skill: "Helper", rating: 3.8, jobs: 15, location: "Thane" },
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
  const [invited, setInvited] = useState<number[]>([]);

  const handleInvite = (e: React.MouseEvent, workerId: number, workerName: string) => {
    e.stopPropagation();
    if (invited.includes(workerId)) return;
    setInvited((prev) => [...prev, workerId]);
    toast.success(`Invite sent to ${workerName}`, {
      description: inviteJob ? `For "${inviteJob.title}"` : undefined,
    });
  };

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title={inviteJob ? "Invite a Worker" : "Workers Nearby"} showBack={!!inviteJob} />

      <div className="px-5 py-4 space-y-3 animate-fade-in">
        {inviteJob && (
          <AppCard className="border-2 border-primary bg-accent/40 sticky top-16 z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <Briefcase className="text-primary-foreground" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wide">Inviting for</p>
                <h3 className="font-bold text-foreground truncate">{inviteJob.title}</h3>
                <p className="text-xs text-muted-foreground">{inviteJob.amount} · {inviteJob.location}</p>
              </div>
            </div>
          </AppCard>
        )}

        {workers.map((w) => {
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
                    disabled={isInvited}
                    aria-label={isInvited ? `Invited ${w.name}` : `Invite ${w.name}`}
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isInvited
                        ? "bg-success text-success-foreground"
                        : "bg-primary text-primary-foreground hover:opacity-90 active:scale-90"
                    }`}
                  >
                    {isInvited ? <Check size={20} /> : <Plus size={20} />}
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
