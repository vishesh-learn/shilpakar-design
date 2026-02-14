import React from "react";
import { useNavigate } from "react-router-dom";
import AppCard from "@/components/AppCard";
import { Wrench, Building2 } from "lucide-react";

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container bg-background flex flex-col min-h-screen px-6 py-12">
      <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">Who are you?</h1>
        <p className="text-muted-foreground text-sm mb-10">Select your role to continue</p>

        <div className="w-full space-y-4">
          <AppCard
            onClick={() => navigate("/worker/setup")}
            padding="lg"
            className="flex flex-col items-center gap-4 border-2 hover:border-primary"
          >
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center">
              <Wrench className="text-primary" size={40} />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">Worker</h2>
              <p className="text-muted-foreground text-sm mt-1">Find jobs near you</p>
            </div>
          </AppCard>

          <AppCard
            onClick={() => navigate("/client/setup")}
            padding="lg"
            className="flex flex-col items-center gap-4 border-2 hover:border-primary"
          >
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center">
              <Building2 className="text-primary" size={40} />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">Client</h2>
              <p className="text-muted-foreground text-sm mt-1">Hire skilled workers</p>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
