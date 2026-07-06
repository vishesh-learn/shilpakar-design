import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppButton from "@/components/AppButton";
import { User, MapPin, Building2, Phone } from "lucide-react";

const ClientEditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("Anil Sharma");
  const [company, setCompany] = useState("Sharma Constructions");
  const [phone, setPhone] = useState("+91 99887 76655");
  const [location, setLocation] = useState("Andheri West, Mumbai");

  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col">
      <ScreenHeader title="Edit Profile" />
      <div className="flex-1 px-5 py-6 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mb-3">
            <Building2 className="text-primary" size={40} />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
            <div className="flex items-center gap-3 border-2 border-border rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors">
              <User className="text-muted-foreground" size={20} />
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Company (Optional)</label>
            <div className="flex items-center gap-3 border-2 border-border rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors">
              <Building2 className="text-muted-foreground" size={20} />
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>
            <div className="flex items-center gap-3 border-2 border-border rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors">
              <Phone className="text-muted-foreground" size={20} />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
            <div className="flex items-center gap-3 border-2 border-border rounded-xl px-4 py-3 bg-card focus-within:border-primary transition-colors">
              <MapPin className="text-muted-foreground" size={20} />
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Your area"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-8">
        <AppButton onClick={() => navigate("/client/profile")} disabled={!name || !phone || !location}>
          Save Changes
        </AppButton>
      </div>
    </div>
  );
};

export default ClientEditProfile;
