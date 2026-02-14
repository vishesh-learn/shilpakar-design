import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import { Star, User } from "lucide-react";

const RateWorker: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col">
      <ScreenHeader title="Rate Worker" />
      <div className="flex-1 px-5 py-6 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-3">
            <User className="text-primary" size={36} />
          </div>
          <h2 className="text-lg font-bold text-foreground">Ramesh Kumar</h2>
          <p className="text-muted-foreground text-sm">Electrician</p>
        </div>

        <AppCard className="flex flex-col items-center gap-4">
          <p className="font-semibold text-foreground">How was the work?</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setRating(s)} className="p-1">
                <Star
                  size={36}
                  className={s <= rating ? "text-warning" : "text-border"}
                  fill={s <= rating ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            {rating === 0 ? "Tap to rate" : rating <= 2 ? "Poor" : rating <= 3 ? "Average" : rating === 4 ? "Good" : "Excellent!"}
          </p>
        </AppCard>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Write a review (optional)</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
            rows={4}
            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-card text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
          />
        </div>
      </div>

      <div className="px-5 pb-8">
        <AppButton onClick={() => navigate("/client/dashboard")} disabled={rating === 0}>
          Submit Review
        </AppButton>
      </div>
    </div>
  );
};

export default RateWorker;
