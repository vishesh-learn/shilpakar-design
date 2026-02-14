import React from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppButton from "@/components/AppButton";
import AppCard from "@/components/AppCard";
import { MapPin, Calendar, IndianRupee, Clock, User } from "lucide-react";

const JobDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col">
      <ScreenHeader title="Job Details" />
      <div className="flex-1 px-5 py-6 space-y-4 animate-fade-in">
        <div>
          <h2 className="text-xl font-bold text-foreground">Electrical Wiring</h2>
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
                <p className="font-semibold text-foreground">Anil Sharma</p>
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

      <div className="px-5 pb-8 flex gap-3">
        <AppButton variant="outline" onClick={() => navigate(-1)} fullWidth>
          Reject
        </AppButton>
        <AppButton onClick={() => navigate("/worker/active-job")} fullWidth>
          Accept
        </AppButton>
      </div>
    </div>
  );
};

export default JobDetails;
