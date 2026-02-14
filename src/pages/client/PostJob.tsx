import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppButton from "@/components/AppButton";
import { Briefcase, MapPin, IndianRupee, Calendar, FileText } from "lucide-react";

const jobTypes = ["Carpenter", "Electrician", "Plumber", "Mason", "Helper", "Painter"];

const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [wage, setWage] = useState("");
  const [days, setDays] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState("");

  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col">
      <ScreenHeader title="Post a Job" />
      <div className="flex-1 px-5 py-6 space-y-4 animate-fade-in overflow-y-auto">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Job Title</label>
          <div className="flex items-center gap-3 border-2 border-border rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors">
            <Briefcase className="text-muted-foreground" size={20} />
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Kitchen Renovation"
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Worker Type</label>
          <div className="flex flex-wrap gap-2">
            {jobTypes.map((type) => (
              <button key={type} onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedType === type ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}>{type}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
          <div className="flex items-center gap-3 border-2 border-border rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors">
            <MapPin className="text-muted-foreground" size={20} />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Job location"
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Daily Wage</label>
            <div className="flex items-center gap-2 border-2 border-border rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors">
              <IndianRupee className="text-muted-foreground" size={18} />
              <input value={wage} onChange={(e) => setWage(e.target.value)} placeholder="₹ Amount"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Duration</label>
            <div className="flex items-center gap-2 border-2 border-border rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors">
              <Calendar className="text-muted-foreground" size={18} />
              <input value={days} onChange={(e) => setDays(e.target.value)} placeholder="Days"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
          <div className="border-2 border-border rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors">
            <div className="flex items-start gap-3">
              <FileText className="text-muted-foreground mt-1" size={20} />
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the work..." rows={3}
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground resize-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-8">
        <AppButton onClick={() => navigate("/client/workers")}
          disabled={!title || !location || !wage || !selectedType}>
          Post Job
        </AppButton>
      </div>
    </div>
  );
};

export default PostJob;
