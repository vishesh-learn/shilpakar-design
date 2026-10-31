import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import BottomNav from "@/components/BottomNav";
import { Star, MapPin, Briefcase, Check, X } from "lucide-react";
import { toast } from "sonner";
import { JobApplicationOrInvitationStatus, type ApplicationStatusId } from "@/lib/jobStatus";

const AppStatus = JobApplicationOrInvitationStatus;

interface Applicant {
  id: number;
  name: string;
  skill: string;
  rating: number;
  jobs: number;
  location: string;
  appliedAt: string;
  note: string;
}

const applicantsByJob: Record<string, Applicant[]> = {
  "3": [
    {
      id: 1,
      name: "Deepak Singh",
      skill: "Painter",
      rating: 4.8,
      jobs: 56,
      location: "Powai",
      appliedAt: "Today, 12:10 PM",
      note: "I have 8 years of painting experience. Can start tomorrow.",
    },
    {
      id: 2,
      name: "Manoj Patil",
      skill: "Painter",
      rating: 4.0,
      jobs: 28,
      location: "Dadar",
      appliedAt: "Today, 12:45 PM",
      note: "Available this week. Will bring my own brushes and tools.",
    },
    {
      id: 3,
      name: "Vikas Sharma",
      skill: "Helper",
      rating: 3.8,
      jobs: 15,
      location: "Thane",
      appliedAt: "Today, 1:20 PM",
      note: "Can assist with wall prep and painting.",
    },
  ],
};

const ClientApplications: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState<Applicant[]>(applicantsByJob[id ?? "3"] ?? applicantsByJob["3"]);
  const [decisions, setDecisions] = useState<Record<number, ApplicationStatusId>>({});

  const handleAccept = (a: Applicant) => {
    setDecisions((d) => ({ ...d, [a.id]: AppStatus.accepted.id }));
    toast.success(`${a.name} accepted for this job`, {
      description: "They'll be notified and can start as scheduled.",
    });
  };

  const handleDecline = (a: Applicant) => {
    setDecisions((d) => ({ ...d, [a.id]: AppStatus.declined.id }));
    toast(`${a.name}'s application declined`);
  };

  return (
    <div className="mobile-container bg-background min-h-screen pb-28">
      <ScreenHeader title="Applications" />
      <div className="px-5 py-4 space-y-3 animate-fade-in">
        <p className="text-sm text-muted-foreground">
          {applicants.filter((a) => !decisions[a.id]).length} workers applied for this job
        </p>

        {applicants.map((a) => {
          const decision = decisions[a.id];
          return (
            <AppCard key={a.id} className={decision === AppStatus.declined.id ? "opacity-50" : ""}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-lg">
                    {a.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{a.name}</h3>
                  <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                    {a.skill}
                  </span>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-warning" fill="currentColor" /> {a.rating}
                    </span>
                    <span>{a.jobs} jobs</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {a.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 bg-accent/50 rounded-xl p-3">
                <p className="text-sm text-foreground">{a.note}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Briefcase size={12} /> Applied {a.appliedAt}
                </p>
              </div>

              {decision === AppStatus.accepted.id ? (
                <div className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl bg-success/10 text-success font-semibold">
                  <Check size={18} /> {AppStatus.accepted.label}
                </div>
              ) : decision === AppStatus.declined.id ? (
                <div className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl bg-muted text-muted-foreground font-semibold">
                  <X size={18} /> {AppStatus.declined.label}
                </div>
              ) : (
                <div className="flex gap-2 mt-3">
                  <AppButton variant="outline" size="md" onClick={() => handleDecline(a)}>
                    <X size={16} /> Decline
                  </AppButton>
                  <AppButton size="md" onClick={() => handleAccept(a)}>
                    <Check size={16} /> Accept
                  </AppButton>
                </div>
              )}
            </AppCard>
          );
        })}

        <AppButton variant="outline" onClick={() => navigate(-1)}>
          Back to job
        </AppButton>
      </div>
      <BottomNav type="client" />
    </div>
  );
};

export default ClientApplications;
