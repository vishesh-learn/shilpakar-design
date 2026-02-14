import React from "react";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import BottomNav from "@/components/BottomNav";
import { Building2, MapPin, Phone, LogOut } from "lucide-react";

const ClientProfile: React.FC = () => {
  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title="Profile" showBack={false} />
      <div className="px-5 py-6 space-y-4 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mb-3">
            <Building2 className="text-primary" size={40} />
          </div>
          <h2 className="text-xl font-bold text-foreground">Anil Sharma</h2>
          <p className="text-muted-foreground text-sm">Sharma Constructions</p>
        </div>

        <AppCard>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">+91 99887 76655</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">Andheri West, Mumbai</p>
              </div>
            </div>
          </div>
        </AppCard>

        <AppCard>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Jobs Posted</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">4</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </div>
        </AppCard>

        <AppButton variant="outline">Edit Profile</AppButton>
        <AppButton variant="ghost" className="text-destructive">
          <LogOut size={18} /> Logout
        </AppButton>
      </div>
      <BottomNav type="client" />
    </div>
  );
};

export default ClientProfile;
