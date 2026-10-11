import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import { Star, MapPin, Clock, CheckCircle, ChevronRight, IndianRupee, CalendarDays } from "lucide-react";
import { JobStatus, type JobStatusId } from "@/lib/jobStatus";

const activeJobs: { id: string; title: string; client: string; location: string; status: JobStatusId; progress: string; path: string }[] = [
  { id: "1", title: "Electrical Wiring", client: "Anil Sharma", location: "Andheri West, Mumbai", status: JobStatus.inProgress.id, progress: "Day 2 of 3", path: "/worker/active-job" },
  { id: "new", title: "Kitchen Tile Work", client: "Meena Joshi", location: "Powai, Mumbai", status: JobStatus.workerAssigned.id, progress: "Starts today, 4:00 PM", path: "/worker/active-job/new" },
];


const invitations = [
  { id: "invitation-1", title: "Apartment Electrical Repair", client: "Anil Sharma", location: "Andheri West", wage: "₹800/day", time: "Invited 20 min ago", type: "Electrician" },
  { id: "invitation-2", title: "Bathroom Pipe Repair", client: "Priya Patel", location: "Bandra", wage: "₹700/day", time: "Invited 1 hour ago", type: "Plumber" },
];

const nearbyJobs = [
  { id: 2, title: "Bathroom Plumbing", client: "Priya Patel", location: "Bandra (1.2 km)", wage: "₹700/day", time: "3 hours ago", type: "Plumber" },
  { id: 3, title: "Wall Construction", client: "Raj Builders", location: "Powai (2.4 km)", wage: "₹900/day", time: "5 hours ago", type: "Mason" },
];

const newJobs = [
  { id: 4, title: "Roof Repair", client: "Suresh Kumar", location: "Dadar", wage: "₹750/day", time: "1 day ago", type: "Carpenter" },
  { id: 5, title: "TV Mounting", client: "Neha Gupta", location: "Malad", wage: "₹500/day", time: "2 days ago", type: "Electrician" },
  { id: 6, title: "Kitchen Tiles", client: "Amit Shah", location: "Borivali", wage: "₹850/day", time: "3 days ago", type: "Mason" },
];

const StarRating = ({ rating, size = 14 }: { rating: number; size?: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.max(0, Math.min(1, rating - (star - 1)));
        return (
          <div key={star} className="relative">
            <Star size={size} className="text-primary-foreground/30" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star size={size} className="fill-warning text-warning" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const WorkerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(true);

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <div className="bg-primary px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-primary-foreground/70 text-sm">Welcome back</p>
            <h1 className="text-2xl font-bold text-primary-foreground mt-0.5">Ramesh Kumar</h1>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={4.5} size={16} />
              <span className="text-primary-foreground/90 text-sm font-medium">4.5</span>
              <span className="text-primary-foreground/60 text-sm">(23 reviews)</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-xl">RK</span>
          </div>
        </div>

        <AppCard className="flex items-center justify-between !bg-primary-foreground/10 !border-primary-foreground/20">
          <div>
            <p className="text-primary-foreground font-semibold">Availability</p>
            <p className="text-primary-foreground/70 text-sm">
              {available ? "You are visible to clients" : "You are hidden"}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer select-none group focus-within:outline-none">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={available}
              onChange={() => setAvailable(!available)}
            />
            <div className="w-16 h-9 bg-primary-foreground/30 rounded-full transition-all duration-300 ease-in-out peer-checked:bg-success shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)] group-hover:opacity-90"></div>
            <div className="absolute left-1 top-1 w-7 h-7 bg-primary-foreground rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_2px_10px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.05)] peer-checked:translate-x-7 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full transition-all duration-300 bg-primary-foreground/40 peer-checked:bg-success-foreground/50"></div>
            </div>
            <div className="absolute -inset-1.5 rounded-full border-2 border-transparent peer-focus-visible:border-success/30 transition-all"></div>
          </label>
        </AppCard>
      </div>

      <div className="px-5 pt-6 space-y-6">
        {/* Active Jobs */}
        <section>
          <h2 className="font-bold text-foreground text-lg mb-3">Active Jobs</h2>
          <div className="space-y-3">
            {activeJobs.map((job) => (
              <AppCard
                key={job.id}
                onClick={() => navigate(job.path)}
                className={job.status === "In Progress" ? "border-2 !border-success" : "border-2 !border-primary"}
              >
                <div className="flex items-center gap-2 mb-3">
                  {job.status === "In Progress" ? (
                    <CheckCircle className="text-success" size={18} />
                  ) : (
                    <CalendarDays className="text-primary" size={18} />
                  )}
                  <span
                    className={
                      job.status === "In Progress"
                        ? "text-success font-semibold text-sm"
                        : "text-primary font-semibold text-sm"
                    }
                  >
                    {job.status}
                  </span>
                </div>
                <h3 className="font-bold text-foreground">{job.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{job.client}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
                  <MapPin size={14} /> {job.location}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Clock size={14} /> {job.progress}
                </div>
              </AppCard>
            ))}
          </div>
        </section>


        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground text-lg">Job invitations</h2>
            <button
              onClick={() => navigate("/worker/jobs?tab=invitations")}
              className="text-primary text-sm font-semibold flex items-center gap-0.5"
            >
              View more <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {invitations.map((job) => (
              <AppCard key={job.id} onClick={() => navigate(`/worker/job/${job.id}`)}>
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div>
                    <h3 className="font-bold text-foreground">{job.title}</h3>
                    <p className="text-muted-foreground text-sm">{job.client}</p>
                  </div>
                  <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">Invitation</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                  <span className="flex items-center gap-1"><IndianRupee size={14} /> {job.wage}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2"><Clock size={12} /> {job.time}</div>
              </AppCard>
            ))}
          </div>
        </section>

        {/* Nearby Jobs */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground text-lg">Nearby Jobs</h2>
            <button
              onClick={() => navigate("/worker/jobs")}
              className="text-primary text-sm font-semibold flex items-center gap-0.5"
            >
              View more <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {nearbyJobs.map((job) => (
              <AppCard key={job.id} onClick={() => navigate(`/worker/job/${job.id}`)}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-foreground">{job.title}</h3>
                    <p className="text-muted-foreground text-sm">{job.client}</p>
                  </div>
                  <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                  <span className="flex items-center gap-1"><IndianRupee size={14} /> {job.wage}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                  <Clock size={12} /> {job.time}
                </div>
              </AppCard>
            ))}
          </div>
        </section>

        {/* New Jobs */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground text-lg">New Jobs</h2>
            <button
              onClick={() => navigate("/worker/jobs")}
              className="text-primary text-sm font-semibold flex items-center gap-0.5"
            >
              View more <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {newJobs.map((job) => (
              <AppCard key={job.id} onClick={() => navigate(`/worker/job/${job.id}`)}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-foreground">{job.title}</h3>
                    <p className="text-muted-foreground text-sm">{job.client}</p>
                  </div>
                  <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                  <span className="flex items-center gap-1"><IndianRupee size={14} /> {job.wage}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                  <Clock size={12} /> {job.time}
                </div>
              </AppCard>
            ))}
          </div>
          <AppButton
            variant="outline"
            size="md"
            className="mt-3"
            onClick={() => navigate("/worker/jobs")}
          >
            View all jobs <ChevronRight size={16} />
          </AppButton>
        </section>
      </div>

      <BottomNav type="worker" />
    </div>
  );
};

export default WorkerDashboard;
