import React from "react";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import BottomNav from "@/components/BottomNav";
import { IndianRupee, TrendingUp, Calendar } from "lucide-react";

const EarningsScreen: React.FC = () => {
  const earnings = [
    { job: "Electrical Wiring", client: "Anil Sharma", amount: "₹2,400", days: "3 days", date: "Feb 10" },
    { job: "Fan Installation", client: "Priya Patel", amount: "₹800", days: "1 day", date: "Feb 8" },
    { job: "Socket Repair", client: "Raj Kumar", amount: "₹500", days: "1 day", date: "Feb 5" },
  ];

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title="Earnings" showBack={false} />
      <div className="px-5 py-6 space-y-4 animate-fade-in">
        <AppCard className="bg-primary !text-primary-foreground !border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/70 text-sm">Total Earnings</p>
              <h2 className="text-3xl font-bold text-primary-foreground">₹12,500</h2>
            </div>
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <TrendingUp className="text-primary-foreground" size={28} />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex-1 bg-primary-foreground/10 rounded-xl p-3 text-center">
              <p className="text-primary-foreground/70 text-xs">This Week</p>
              <p className="text-primary-foreground font-bold">₹3,200</p>
            </div>
            <div className="flex-1 bg-primary-foreground/10 rounded-xl p-3 text-center">
              <p className="text-primary-foreground/70 text-xs">This Month</p>
              <p className="text-primary-foreground font-bold">₹12,500</p>
            </div>
          </div>
        </AppCard>

        <h3 className="font-bold text-foreground">Recent Payments</h3>
        {earnings.map((e, i) => (
          <AppCard key={i}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground">{e.job}</h4>
                <p className="text-muted-foreground text-sm">{e.client}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Calendar size={12} /> {e.date} · {e.days}
                </div>
              </div>
              <span className="text-success font-bold text-lg">{e.amount}</span>
            </div>
          </AppCard>
        ))}
      </div>
      <BottomNav type="worker" />
    </div>
  );
};

export default EarningsScreen;
