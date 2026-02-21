import React from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import BottomNav from "@/components/BottomNav";
import { User, MapPin, Star, Hammer, Phone, LogOut } from "lucide-react";

const WorkerProfile: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };
  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title="Profile" showBack={false} />
      <div className="px-5 py-6 space-y-4 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mb-3">
            <User className="text-primary" size={40} />
          </div>
          <h2 className="text-xl font-bold text-foreground">Ramesh Kumar</h2>
          <div className="flex items-center gap-1 text-warning mt-1">
            <Star size={16} fill="currentColor" />
            <span className="font-semibold">4.5</span>
            <span className="text-muted-foreground text-sm">(23 reviews)</span>
          </div>
        </div>

        <AppCard>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">Andheri, Mumbai</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Hammer className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Skills</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {["Electrician", "Plumber"].map((s) => (
                    <span key={s} className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AppCard>

        <AppCard>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">47</p>
              <p className="text-xs text-muted-foreground">Jobs Done</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">4.5</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">₹45K</p>
              <p className="text-xs text-muted-foreground">Earned</p>
            </div>
          </div>
        </AppCard>

        <AppButton variant="outline">Edit Profile</AppButton>
        <AppButton variant="ghost" className="text-destructive" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </AppButton>
      </div>
      <BottomNav type="worker" />
    </div>
  );
};

export default WorkerProfile;
