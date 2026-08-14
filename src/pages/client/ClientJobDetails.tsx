import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import BottomNav from "@/components/BottomNav";
import { Briefcase, MapPin, Clock, Phone, MessageCircle, CheckCircle2, User, IndianRupee, CalendarDays } from "lucide-react";

const activeJobs: Record<string, any> = {
  "1": {
    id: "1",
    title: "House Cleaning",
    worker: "Ramesh Kumar",
    workerPhone: "+91 98765 43210",
    rating: 4.8,
    location: "Andheri West, Mumbai",
    fullAddress: "Flat 402, Sunshine Apartments, Andheri West, Mumbai 400058",
    status: "In Progress",
    time: "Started 2h ago",
    startedAt: "10:30 AM, Today",
    estimatedCompletion: "2:00 PM, Today",
    amount: "₹600",
    progress: 60,
    updates: [
      { time: "10:30 AM", text: "Worker arrived at location" },
      { time: "10:45 AM", text: "Started cleaning living room" },
      { time: "12:15 PM", text: "Kitchen cleaning in progress" },
    ],
  },
  "2": {
    id: "2",
    title: "Plumbing Repair",
    worker: "Suresh Patil",
    workerPhone: "+91 98765 11122",
    rating: 4.6,
    location: "Bandra East, Mumbai",
    fullAddress: "Shop 12, Linking Road, Bandra East, Mumbai 400051",
    status: "On the way",
    time: "Arriving in 20 min",
    startedAt: "Scheduled 1:00 PM, Today",
    estimatedCompletion: "3:30 PM, Today",
    amount: "₹450",
    progress: 15,
    updates: [
      { time: "12:30 PM", text: "Job accepted by worker" },
      { time: "12:40 PM", text: "Worker on the way to your location" },
    ],
  },
  "3": {
    id: "3",
    title: "Wall Painting",
    stage: "unassigned",
    location: "Andheri West, Mumbai",
    fullAddress: "Flat 402, Sunshine Apartments, Andheri West, Mumbai 400058",
    status: "Awaiting worker",
    startedAt: "Posted today, 11:30 AM",
    estimatedCompletion: "Flexible",
    amount: "₹1,500",
    progress: 0,
    updates: [{ time: "11:30 AM", text: "Job posted. Waiting for a worker to accept." }],
  },
  "4": {
    id: "4",
    title: "Furniture Repair",
    stage: "invited",
    worker: "Vikas Singh",
    workerPhone: "+91 98765 44455",
    rating: 4.7,
    location: "Powai, Mumbai",
    fullAddress: "Villa 7, Hiranandani Gardens, Powai, Mumbai 400076",
    status: "Invite sent",
    startedAt: "Proposed tomorrow, 10:00 AM",
    estimatedCompletion: "Pending acceptance",
    amount: "₹1,000",
    progress: 0,
    updates: [{ time: "12:05 PM", text: "Hire request sent to Vikas Singh" }],
  },
};


const ClientJobDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = activeJobs[id ?? "1"] ?? activeJobs["1"];

  return (
    <div className="mobile-container bg-background min-h-screen pb-28">
      <ScreenHeader title="Job Details" />
      <div className="px-5 py-4 space-y-4 animate-fade-in">
        <AppCard className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
                <Briefcase className="text-primary" size={24} />
              </div>
              <div>
                <h2 className="font-bold text-foreground text-lg">{job.title}</h2>
                <p className="text-muted-foreground text-sm">{job.amount}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-warning bg-warning/10 px-2 py-1 rounded-full">
              {job.status}
            </span>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{job.progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${job.progress}%` }}
              />
            </div>
          </div>
        </AppCard>

        <AppCard className="space-y-3">
          <h3 className="font-bold text-foreground">Worker</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <User className="text-primary" size={22} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{job.worker}</p>
              <p className="text-xs text-muted-foreground">★ {job.rating} · {job.workerPhone}</p>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <AppButton variant="outline" size="md" onClick={() => window.open(`tel:${job.workerPhone}`)}>
              <Phone size={16} /> Call
            </AppButton>
            <AppButton variant="outline" size="md">
              <MessageCircle size={16} /> Chat
            </AppButton>
          </div>
        </AppCard>

        <AppCard className="space-y-3">
          <h3 className="font-bold text-foreground">Details</h3>
          <div className="flex items-start gap-3 text-sm">
            <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-foreground font-medium">{job.location}</p>
              <p className="text-muted-foreground text-xs">{job.fullAddress}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CalendarDays className="text-primary" size={18} />
            <p className="text-foreground">{job.startedAt}</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="text-primary" size={18} />
            <p className="text-foreground">Est. completion: {job.estimatedCompletion}</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <IndianRupee className="text-primary" size={18} />
            <p className="text-foreground">{job.amount}</p>
          </div>
        </AppCard>

        <AppCard className="space-y-3">
          <h3 className="font-bold text-foreground">Live Updates</h3>
          <div className="space-y-3">
            {job.updates.map((u: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="text-success shrink-0 mt-0.5" size={18} />
                <div className="flex-1">
                  <p className="text-foreground text-sm">{u.text}</p>
                  <p className="text-muted-foreground text-xs">{u.time}</p>
                </div>
              </div>
            ))}
          </div>
        </AppCard>

        <div className="flex gap-2">
          <AppButton variant="outline" onClick={() => navigate(-1)}>Back</AppButton>
          <AppButton variant="destructive">Cancel Job</AppButton>
        </div>
      </div>
      <BottomNav type="client" />
    </div>
  );
};

export default ClientJobDetails;
