import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import FieldError, { triggerShake } from "@/components/FieldError";
import { useSimulatedAction } from "@/hooks/useSimulatedLoading";
import { Star, Briefcase, Info } from "lucide-react";

const RateJob: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job =
    (location.state as { title?: string; worker?: string; date?: string; rating?: number; review?: string } | null) ??
    {};
  const title = job.title ?? "Electrical Work";
  const worker = job.worker ?? "Mahesh Joshi";
  const date = job.date ?? "May 22, 2026";
  const isUpdate = (job.rating ?? 0) > 0;
  const [rating, setRating] = useState(job.rating ?? 0);
  const [review, setReview] = useState(job.review ?? "");
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [submitting, runSubmit] = useSimulatedAction();


  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col">
      <ScreenHeader title={isUpdate ? "Update Rating" : "Rate Job"} />
      <div className="flex-1 px-5 py-6 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center mb-3">
            <Briefcase className="text-primary" size={36} />
          </div>
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground text-sm">{worker} · Completed {date}</p>
        </div>

        <AppCard className="flex flex-col items-center gap-4">
          <p className="font-semibold text-foreground">How was this job done?</p>
          <div className={`flex gap-2 ${shake ? "animate-shake" : ""}`}>
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setRating(s);
                  if (error) setError(null);
                }}
                className="p-1"
                aria-label={`${s} star`}
              >
                <Star
                  size={36}
                  className={s <= rating ? "text-warning" : "text-border"}
                  fill={s <= rating ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
          <FieldError message={error} className="justify-center mt-0" />
          <p className="text-muted-foreground text-sm">
            {rating === 0 ? "Tap to rate" : rating <= 2 ? "Poor" : rating <= 3 ? "Average" : rating === 4 ? "Good" : "Excellent!"}
          </p>
        </AppCard>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Write a review (optional)</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this job..."
            rows={4}
            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-card text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-accent/50 rounded-xl p-3">
          <Info size={14} className="shrink-0 mt-0.5 text-primary" />
          <p>Job ratings are averaged to calculate the worker's overall rating.</p>
        </div>
      </div>

      <div className="px-5 pb-8">
        <AppButton
          loading={submitting}
          onClick={() => {
            if (rating === 0) {
              setError("Tap the stars to rate this job");
              triggerShake(setShake);
              return;
            }
            runSubmit(() => navigate("/client/dashboard"));
          }}
        >
          {submitting ? "Submitting" : isUpdate ? "Update Rating" : "Submit Rating"}
        </AppButton>
      </div>
    </div>
  );
};

export default RateJob;
