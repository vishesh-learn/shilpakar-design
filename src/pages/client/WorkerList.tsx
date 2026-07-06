import React from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import BottomNav from "@/components/BottomNav";
import { Star, MapPin } from "lucide-react";

const workers = [
  { id: 1, name: "Ramesh Kumar", skill: "Electrician", rating: 4.5, jobs: 47, location: "Andheri" },
  { id: 2, name: "Sunil Yadav", skill: "Plumber", rating: 4.2, jobs: 32, location: "Bandra" },
  { id: 3, name: "Deepak Singh", skill: "Carpenter", rating: 4.8, jobs: 56, location: "Powai" },
  { id: 4, name: "Manoj Patil", skill: "Mason", rating: 4.0, jobs: 28, location: "Dadar" },
  { id: 5, name: "Vikas Sharma", skill: "Helper", rating: 3.8, jobs: 15, location: "Thane" },
];

const WorkerList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title="Workers Nearby" />
      <div className="px-5 py-4 space-y-3 animate-fade-in">
        {workers.map((w) => (
          <AppCard key={w.id} onClick={() => navigate(`/client/worker/${w.id}`)}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-lg">{w.name.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{w.name}</h3>
                <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-0.5 rounded-full">{w.skill}</span>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star size={12} className="text-warning" fill="currentColor" /> {w.rating}</span>
                  <span>{w.jobs} jobs</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {w.location}</span>
                </div>
              </div>
            </div>
          </AppCard>
        ))}
      </div>
    </div>
  );
};

export default WorkerList;
