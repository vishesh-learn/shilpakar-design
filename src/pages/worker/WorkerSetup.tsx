import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppButton from "@/components/AppButton";
import { User, MapPin, Hammer } from "lucide-react";

const skills = ["Carpenter", "Electrician", "Plumber", "Mason", "Helper", "Painter", "Welder"];

const WorkerSetup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col">
      <ScreenHeader title="Worker Profile Setup" />
      <div className="flex-1 px-5 py-6 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mb-3">
            <User className="text-primary" size={40} />
          </div>
          <button className="text-primary text-sm font-medium">Add Photo</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
            <div className="flex items-center gap-3 border-2 border-border rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors">
              <User className="text-muted-foreground" size={20} />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
            <div className="flex items-center gap-3 border-2 border-border rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors">
              <MapPin className="text-muted-foreground" size={20} />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your area"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              <Hammer className="inline mr-2 text-primary" size={16} />
              Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSkills.includes(skill)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-8">
        <AppButton
          onClick={() => { localStorage.setItem("userRole", "worker"); navigate("/worker/dashboard"); }}
          disabled={!name || !location || selectedSkills.length === 0}
        >
          Complete Setup
        </AppButton>
      </div>
    </div>
  );
};

export default WorkerSetup;
