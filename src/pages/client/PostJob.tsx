import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import ScreenHeader from "@/components/ScreenHeader";
import AppButton from "@/components/AppButton";
import FieldError, { triggerShake } from "@/components/FieldError";
import { Briefcase, MapPin, IndianRupee, Calendar, FileText, UserCheck, X } from "lucide-react";

const jobTypes = ["Carpenter", "Electrician", "Plumber", "Mason", "Helper", "Painter"];

interface Errors {
  title?: string;
  selectedType?: string;
  location?: string;
  wage?: string;
  days?: string;
}

const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const invited = (routerLocation.state as { inviteWorker?: { name: string; skill: string } } | null)
    ?.inviteWorker;
  const [invitee, setInvitee] = useState(invited ?? null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [wage, setWage] = useState("");
  const [days, setDays] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState(invited?.skill ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    const next: Errors = {};
    if (!title.trim()) next.title = "Enter a job title";
    if (!selectedType) next.selectedType = "Pick a worker type";
    if (!location.trim()) next.location = "Enter the job location";
    if (!wage.trim() || !/^\d+$/.test(wage.trim()) || Number(wage) <= 0) {
      next.wage = "Enter a valid amount in ₹";
    }
    if (days.trim() && !/^\d+$/.test(days.trim())) {
      next.days = "Enter duration in digits, e.g. 3";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      triggerShake(setShake);
      return;
    }
    if (invitee) {
      toast.success(`Hire request sent to ${invitee.name}`, {
        description: "You'll be notified once they accept.",
      });
      navigate("/client/dashboard");
    } else {
      toast.success("Job posted successfully");
      navigate("/client/workers");
    }
  };

  const wageInput = (
    <div className={`flex items-center gap-2 border-2 rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors ${
      errors.wage ? "border-destructive" : "border-border"
    }`}>
      <IndianRupee className="text-muted-foreground" size={18} />
      <input
        value={wage}
        onChange={(e) => {
          setWage(e.target.value);
          if (errors.wage) setErrors((er) => ({ ...er, wage: undefined }));
        }}
        placeholder="₹ Amount"
        inputMode="numeric"
        className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
      />
    </div>
  );

  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col">
      <ScreenHeader title={invitee ? "Hire Worker" : "Post a Job"} />
      <div className="flex-1 px-5 py-6 animate-fade-in overflow-y-auto">
        {invitee && (
          <div className="flex items-center gap-3 rounded-xl border-2 border-primary/30 bg-accent px-4 py-3 mb-4">
            <UserCheck className="text-primary flex-shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Inviting {invitee.name}</p>
              <p className="text-xs text-muted-foreground">{invitee.skill}</p>
            </div>
            <button
              aria-label="Remove invited worker"
              onClick={() => setInvitee(null)}
              className="text-muted-foreground"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className={`space-y-4 ${shake ? "animate-shake" : ""}`}>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Job Title</label>
            <div className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors ${
              errors.title ? "border-destructive" : "border-border"
            }`}>
              <Briefcase className="text-muted-foreground" size={20} />
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((er) => ({ ...er, title: undefined }));
                }}
                placeholder="e.g. Kitchen Renovation"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <FieldError message={errors.title} />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Worker Type</label>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    if (errors.selectedType) setErrors((er) => ({ ...er, selectedType: undefined }));
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === type ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}>{type}</button>
              ))}
            </div>
            <FieldError message={errors.selectedType} />
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
                placeholder="Job location"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <FieldError message={errors.location} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Daily Wage</label>
              {wageInput}
              <FieldError message={errors.wage} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Duration</label>
              <div className={`flex items-center gap-2 border-2 rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors ${
                errors.days ? "border-destructive" : "border-border"
              }`}>
                <Calendar className="text-muted-foreground" size={18} />
                <input
                  value={days}
                  onChange={(e) => {
                    setDays(e.target.value);
                    if (errors.days) setErrors((er) => ({ ...er, days: undefined }));
                  }}
                  placeholder="Days"
                  inputMode="numeric"
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <FieldError message={errors.days} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
            <div className="border-2 border-border rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors">
              <div className="flex items-start gap-3">
                <FileText className="text-muted-foreground mt-1" size={20} />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the work..." rows={3}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-8">
        <AppButton onClick={handleSubmit}>
          {invitee ? "Send hire request" : "Post Job"}
        </AppButton>
      </div>
    </div>
  );
};

export default PostJob;
