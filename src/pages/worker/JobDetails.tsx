import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ScreenHeader from "@/components/ScreenHeader";
import AppButton from "@/components/AppButton";
import AppCard from "@/components/AppCard";
import BottomNav from "@/components/BottomNav";
import { useSimulatedAction } from "@/hooks/useSimulatedLoading";
import { MapPin, Calendar, IndianRupee, Clock, User, MailCheck } from "lucide-react";

const JobDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isInvitation = id?.startsWith("invitation-") ?? false;
  const [applied, setApplied] = useState(false);
  const [applying, runApply] = useSimulatedAction(900);
  const [accepting, runAccept] = useSimulatedAction(900);
  const [declining, runDecline] = useSimulatedAction(900);

  const handleApply = () => {
    if (applied || applying) return;
    runApply(() => {
      setApplied(true);
      toast.success("Application sent", { description: "The client can now review your application." });
    });
  };

  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col">
      <ScreenHeader title="Job Details" />
      <div className="flex-1 px-5 py-6 space-y-4 animate-fade-in">
        <div>
          <h2 className="text-xl font-bold text-foreground">{isInvitation ? (id === "invitation-2" ? "Bathroom Pipe Repair" : "Apartment Electrical Repair") : "Electrical Wiring"}</h2>
          <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full mt-2 inline-block">
            Electrician
          </span>
        </div>

        <AppCard>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Client</p>
                <p className="font-semibold text-foreground">{isInvitation && id === "invitation-2" ? "Priya Patel" : "Anil Sharma"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-semibold text-foreground">Andheri West, Mumbai</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IndianRupee className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Daily Wage</p>
                <p className="font-semibold text-foreground">₹800/day</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-semibold text-foreground">3 Days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Timing</p>
                <p className="font-semibold text-foreground">9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </AppCard>

        <AppCard>
          <h3 className="font-bold text-foreground mb-2">Job Description</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Complete rewiring of a 2BHK apartment. Work includes replacing old wiring, installing new switches and sockets, and setting up the electrical panel. Tools will be provided.
          </p>
        </AppCard>
      </div>

      <div className="px-5 pb-24 flex gap-3">
        {isInvitation ? (
          <>
            <AppButton
              variant="outline"
              loading={declining}
              onClick={() => runDecline(() => { toast("Invitation declined"); navigate("/worker/jobs?tab=invitations"); })}
              fullWidth
            >
              {declining ? "Declining" : "Decline"}
            </AppButton>
            <AppButton loading={accepting} onClick={() => runAccept(() => { toast.success("Invitation accepted"); navigate("/worker/active-job"); })} fullWidth>
              {accepting ? "Accepting" : "Accept invitation"}
            </AppButton>
          </>
        ) : (
          <AppButton onClick={handleApply} loading={applying} disabled={applied} fullWidth>
            <MailCheck size={18} /> {applied ? "Application sent" : "Apply for this job"}
          </AppButton>
        )}
      </div>
      <BottomNav type="worker" />
    </div>
  );
};

export default JobDetails;
