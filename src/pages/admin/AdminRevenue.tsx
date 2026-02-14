import React from "react";
import { IndianRupee, TrendingUp, ArrowUpRight, Wallet, CreditCard } from "lucide-react";

const monthlyData = [
  { month: "Sep", revenue: 180000 },
  { month: "Oct", revenue: 220000 },
  { month: "Nov", revenue: 310000 },
  { month: "Dec", revenue: 280000 },
  { month: "Jan", revenue: 350000 },
  { month: "Feb", revenue: 420000 },
];

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

const transactions = [
  { id: "TXN-501", job: "Plumbing Work", from: "Anil Sharma", amount: "₹1,200", date: "14 Feb", type: "Credit" },
  { id: "TXN-500", job: "Electrical Wiring", from: "Priya Desai", amount: "₹2,500", date: "13 Feb", type: "Credit" },
  { id: "TXN-499", job: "Platform Fee", from: "System", amount: "₹350", date: "13 Feb", type: "Commission" },
  { id: "TXN-498", job: "Wall Painting", from: "Vikram Singh", amount: "₹3,000", date: "12 Feb", type: "Credit" },
  { id: "TXN-497", job: "Worker Payout", from: "Raju Patil", amount: "₹1,080", date: "12 Feb", type: "Debit" },
];

const AdminRevenue: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Revenue</h1>
        <p className="text-sm text-muted-foreground">Platform earnings & financial overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <IndianRupee size={18} className="text-primary-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
          </div>
          <p className="text-2xl font-bold text-foreground">₹17.6L</p>
          <div className="flex items-center gap-1 text-xs font-medium text-success mt-1">
            <ArrowUpRight size={14} /> +23% from last quarter
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-success flex items-center justify-center">
              <Wallet size={18} className="text-primary-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Commission Earned</p>
          </div>
          <p className="text-2xl font-bold text-foreground">₹1.76L</p>
          <p className="text-xs text-muted-foreground mt-1">10% platform fee</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-warning flex items-center justify-center">
              <CreditCard size={18} className="text-primary-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Pending Payouts</p>
          </div>
          <p className="text-2xl font-bold text-foreground">₹42K</p>
          <p className="text-xs text-muted-foreground mt-1">8 workers pending</p>
        </div>
      </div>

      {/* Simple bar chart */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Monthly Revenue</h3>
        <div className="flex items-end gap-3 h-40">
          {monthlyData.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-foreground">₹{(d.revenue / 1000).toFixed(0)}K</span>
              <div
                className="w-full bg-primary rounded-t-md transition-all"
                style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
              />
              <span className="text-xs text-muted-foreground">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-card rounded-xl border border-border">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-foreground">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">ID</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Description</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">From</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Type</th>
                <th className="text-right p-4 text-xs font-medium text-muted-foreground">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="p-4 font-mono text-xs text-muted-foreground">{t.id}</td>
                  <td className="p-4 font-medium text-foreground">{t.job}</td>
                  <td className="p-4 text-muted-foreground hidden sm:table-cell">{t.from}</td>
                  <td className="p-4 text-muted-foreground hidden sm:table-cell">{t.date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      t.type === "Credit" ? "bg-success/10 text-success" :
                      t.type === "Commission" ? "bg-primary/10 text-primary" :
                      "bg-destructive/10 text-destructive"
                    }`}>{t.type}</span>
                  </td>
                  <td className="p-4 text-right font-semibold text-foreground">{t.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenue;
