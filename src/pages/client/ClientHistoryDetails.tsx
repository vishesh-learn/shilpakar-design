import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import BottomNav from "@/components/BottomNav";
import { CheckCircle2, MapPin, CalendarDays, Clock, IndianRupee, User, Phone, Star, Receipt, RotateCcw } from "lucide-react";

const historyJobs: Record<string, any> = {
  "5": {
    id: "5",
    title: "AC Servicing",
    worker: "Ramesh Kumar",
    workerPhone: "+91 98765 11122",
    rating: 0,
    review: "",
    location: "Andheri West, Mumbai",
    fullAddress: "Flat 402, Sunshine Apartments, Andheri West, Mumbai 400058",
    date: "May 28, 2026",
    duration: "1h 10m",
    startedAt: "11:00 AM",
    completedAt: "12:10 PM",
    amount: "\u20b9900",
    breakdown: [
      { label: "Service Charge", value: "\u20b9800" },
      { label: "Materials", value: "\u20b950" },
      { label: "Platform Fee", value: "\u20b950" },
    ],
    paymentMethod: "UPI \u00b7 Paid",
  },
  "1": {
    id: "1",
    title: "Electrical Work",
    worker: "Mahesh Joshi",
    workerPhone: "+91 98765 22233",
    rating: 5,
    review: "Very professional and quick. Fixed all issues neatly.",
    location: "Andheri West, Mumbai",
    fullAddress: "Flat 402, Sunshine Apartments, Andheri West, Mumbai 400058",
    date: "May 22, 2026",
    duration: "2h 15m",
    startedAt: "10:00 AM",
    completedAt: "12:15 PM",
    amount: "₹1,200",
    breakdown: [
      { label: "Service Charge", value: "₹1,000" },
      { label: "Materials", value: "₹150" },
      { label: "Platform Fee", value: "₹50" },
    ],
    paymentMethod: "UPI · Paid",
  },
  "2": {
    id: "2",
    title: "Deep Cleaning",
    worker: "Priya Devi",
    workerPhone: "+91 98765 33344",
    rating: 4,
    review: "Good work, took a little longer than expected.",
    location: "Bandra East, Mumbai",
    fullAddress: "Shop 12, Linking Road, Bandra East, Mumbai 400051",
    date: "May 18, 2026",
    duration: "3h",
    startedAt: "9:00 AM",
    completedAt: "12:00 PM",
    amount: "₹800",
    breakdown: [
      { label: "Service Charge", value: "₹750" },
      { label: "Platform Fee", value: "₹50" },
    ],
    paymentMethod: "Cash · Paid",
  },
  "3": {
    id: "3",
    title: "Garden Maintenance",
    worker: "Vikas Singh",
    workerPhone: "+91 98765 44455",
    rating: 5,
    review: "Excellent job. Garden looks amazing.",
    location: "Powai, Mumbai",
    fullAddress: "Villa 7, Hiranandani Gardens, Powai, Mumbai 400076",
    date: "May 10, 2026",
    duration: "1h 30m",
    startedAt: "8:30 AM",
    completedAt: "10:00 AM",
    amount: "₹600",
    breakdown: [
      { label: "Service Charge", value: "₹550" },
      { label: "Platform Fee", value: "₹50" },
    ],
    paymentMethod: "UPI · Paid",
  },
  "4": {
    id: "4",
    title: "Painting",
    worker: "Arjun Yadav",
    workerPhone: "+91 98765 55566",
    rating: 4,
    review: "Neat finish. Would hire again.",
    location: "Juhu, Mumbai",
    fullAddress: "Flat 15A, Sea View, Juhu, Mumbai 400049",
    date: "April 28, 2026",
    duration: "6h",
    startedAt: "9:00 AM",
    completedAt: "3:00 PM",
    amount: "₹3,500",
    breakdown: [
      { label: "Service Charge", value: "₹2,800" },
      { label: "Materials", value: "₹600" },
      { label: "Platform Fee", value: "₹100" },
    ],
    paymentMethod: "Card · Paid",
  },
};

const ClientHistoryDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = historyJobs[id ?? "1"] ?? historyJobs["1"];

  return (
    <div className="mobile-container bg-background min-h-screen pb-28">
      <ScreenHeader title="Job Details" />
      <div className="px-5 py-4 space-y-4 animate-fade-in">
        <AppCard className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="text-success" size={24} />
              </div>
              <div>
                <h2 className="font-bold text-foreground text-lg">{job.title}</h2>
                <p className="text-muted-foreground text-sm">{job.date}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded-full">
              Completed
            </span>
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
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {Array.from({ length: job.rating }).map((_, i) => (
                  <Star key={i} size={12} className="text-warning fill-warning" />
                ))}
                <span className="ml-1">· {job.workerPhone}</span>
              </div>
            </div>
          </div>
          <AppButton variant="outline" size="md" onClick={() => window.open(`tel:${job.workerPhone}`)}>
            <Phone size={16} /> Call
          </AppButton>
        </AppCard>

        <AppCard className="space-y-3">
          <h3 className="font-bold text-foreground">Your Rating</h3>
          {job.rating > 0 ? (
            <>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={22}
                      className={s <= job.rating ? "text-warning" : "text-border"}
                      fill={s <= job.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">{job.rating}.0</span>
              </div>
              {job.review && <p className="text-sm text-foreground italic">"{job.review}"</p>}
              <AppButton
                variant="outline"
                size="md"
                onClick={() =>
                  navigate("/client/rate-job", {
                    state: {
                      title: job.title,
                      worker: job.worker,
                      date: job.date,
                      rating: job.rating,
                      review: job.review,
                    },
                  })
                }
              >
                <Star size={16} /> Update rating
              </AppButton>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                You haven't rated this job yet. Your rating helps calculate the worker's overall rating.
              </p>
              <AppButton
                onClick={() =>
                  navigate("/client/rate-job", {
                    state: { title: job.title, worker: job.worker, date: job.date },
                  })
                }
              >
                <Star size={16} /> Rate this job
              </AppButton>
            </>
          )}
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
            <p className="text-foreground">{job.date} · {job.startedAt} – {job.completedAt}</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="text-primary" size={18} />
            <p className="text-foreground">Duration: {job.duration}</p>
          </div>
        </AppCard>

        <AppCard className="space-y-3">
          <div className="flex items-center gap-2">
            <Receipt className="text-primary" size={18} />
            <h3 className="font-bold text-foreground">Payment</h3>
          </div>
          <div className="space-y-2">
            {job.breakdown.map((b: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{b.label}</span>
                <span className="text-foreground">{b.value}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 flex items-center justify-between">
              <span className="font-bold text-foreground flex items-center gap-1">
                <IndianRupee size={14} /> Total
              </span>
              <span className="font-bold text-foreground">{job.amount}</span>
            </div>
            <p className="text-xs text-muted-foreground">{job.paymentMethod}</p>
          </div>
        </AppCard>

        <div className="flex gap-2">
          <AppButton variant="outline" onClick={() => navigate(-1)}>Back</AppButton>
          <AppButton onClick={() => navigate("/client/post-job")}>
            <RotateCcw size={16} /> Book Again
          </AppButton>
        </div>
      </div>
      <BottomNav type="client" />
    </div>
  );
};

export default ClientHistoryDetails;
