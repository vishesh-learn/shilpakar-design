import React from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import { User, MapPin, Star, Hammer, Phone, Briefcase } from "lucide-react";

const WorkerProfileView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col">
      <ScreenHeader title="Worker Profile" />
      <div className="flex-1 px-5 py-6 space-y-4 animate-fade-in">
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
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} />
              <p className="text-foreground text-sm">Andheri, Mumbai</p>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="text-primary" size={20} />
              <p className="text-foreground text-sm">47 jobs completed</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-primary" size={20} />
              <p className="text-primary text-sm font-medium">+91 98765 43210</p>
            </div>
          </div>
        </AppCard>

        <AppCard>
          <h3 className="font-bold text-foreground mb-3">Recent Reviews</h3>
          {[
            { name: "Priya P.", text: "Very professional work. Completed on time.", rating: 5 },
            { name: "Raj K.", text: "Good electrician. Will hire again.", rating: 4 },
          ].map((r, i) => (
            <div key={i} className="py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground text-sm">{r.name}</span>
                <div className="flex">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={12} className="text-warning" fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm mt-1">{r.text}</p>
            </div>
          ))}
        </AppCard>
      </div>

      <div className="px-5 pb-8 flex gap-3">
        <AppButton variant="outline" onClick={() => navigate("/client/rate-worker")} fullWidth>
          Rate Worker
        </AppButton>
        <AppButton fullWidth>Hire Now</AppButton>
      </div>
    </div>
  );
};

export default WorkerProfileView;
