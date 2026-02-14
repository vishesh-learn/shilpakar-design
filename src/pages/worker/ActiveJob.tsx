import React from "react";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import BottomNav from "@/components/BottomNav";
import { MapPin, Phone, Clock, CheckCircle } from "lucide-react";

const ActiveJob: React.FC = () => {
  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title="Active Job" />
      <div className="px-5 py-6 space-y-4 animate-fade-in">
        <AppCard className="border-2 !border-success">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="text-success" size={20} />
            <span className="text-success font-semibold text-sm">In Progress</span>
          </div>
          <h2 className="text-lg font-bold text-foreground">Electrical Wiring</h2>
          <p className="text-muted-foreground text-sm mt-1">Anil Sharma</p>
        </AppCard>

        <AppCard>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} />
              <p className="text-foreground text-sm">Andheri West, Mumbai</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-primary" size={20} />
              <p className="text-foreground text-sm">Day 2 of 3</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-primary" size={20} />
              <p className="text-primary text-sm font-medium">Call Client</p>
            </div>
          </div>
        </AppCard>

        <AppCard>
          <h3 className="font-bold text-foreground mb-3">Daily Log</h3>
          <div className="space-y-2">
            {["Day 1 - Removed old wiring", "Day 2 - Installing new cables"].map((log, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle className="text-success" size={16} />
                <span className="text-foreground">{log}</span>
              </div>
            ))}
          </div>
        </AppCard>

        <AppButton variant="success">Mark Day Complete</AppButton>
      </div>
      <BottomNav type="worker" />
    </div>
  );
};

export default ActiveJob;
