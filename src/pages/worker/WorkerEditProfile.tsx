import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppButton from "@/components/AppButton";
import FieldError, { triggerShake } from "@/components/FieldError";
import { User, MapPin, Phone, Hammer } from "lucide-react";

const skillOptions = ["Carpenter", "Electrician", "Plumber", "Mason", "Helper", "Painter", "Welder"];

interface Errors {
  name?: string;
  phone?: string;
  location?: string;
  skills?: string;
}

const WorkerEditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("Ramesh Kumar");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [location, setLocation] = useState("Andheri, Mumbai");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Electrician", "Plumber"]);
  const [errors, setErrors] = useState<Errors>({});
  const [shake, setShake] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
    if (errors.skills) setErrors((e) => ({ ...e, skills: undefined }));
  };

  const handleSubmit = () => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please enter your full name";
    if (phone.replace(/\D/g, "").length !== 10) next.phone = "Enter a valid 10-digit phone number";
    if (!location.trim()) next.location = "Please enter your location";
    if (selectedSkills.length === 0) next.skills = "Select at least one skill";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      triggerShake(setShake);
      return;
    }
    navigate("/worker/profile");
  };

  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col">
      <ScreenHeader title="Edit Profile" />
      <div className="flex-1 px-5 py-6 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mb-3">
            <User className="text-primary" size={40} />
          </div>
          <button className="text-primary text-sm font-medium">Change Photo</button>
        </div>

        <div className={`space-y-4 ${shake ? "animate-shake" : ""}`}>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
            <div className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors ${
              errors.name ? "border-destructive" : "border-border"
            }`}>
              <User className="text-muted-foreground" size={20} />
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((er) => ({ ...er, name: undefined }));
                }}
                placeholder="Your name"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <FieldError message={errors.name} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>
            <div className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors ${
              errors.phone ? "border-destructive" : "border-border"
            }`}>
              <Phone className="text-muted-foreground" size={20} />
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((er) => ({ ...er, phone: undefined }));
                }}
                placeholder="Phone number"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <FieldError message={errors.phone} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
            <div className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors ${
              errors.location ? "border-destructive" : "border-border"
            }`}>
              <MapPin className="text-muted-foreground" size={20} />
              <input
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors((er) => ({ ...er, location: undefined }));
                }}
                placeholder="Your area"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <FieldError message={errors.location} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              <Hammer className="inline mr-2 text-primary" size={16} />
              Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
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
            <FieldError message={errors.skills} />
          </div>
        </div>
      </div>

      <div className="px-5 pb-8">
        <AppButton onClick={handleSubmit}>
          Save Changes
        </AppButton>
      </div>
    </div>
  );
};

export default WorkerEditProfile;
