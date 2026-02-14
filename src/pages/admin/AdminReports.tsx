import React from "react";
import { FileBarChart, Download, Users, Briefcase, IndianRupee, TrendingUp } from "lucide-react";

const reports = [
  { title: "Monthly Worker Report", description: "Worker registrations, activity & ratings", icon: Users, date: "Feb 2026", type: "Workers" },
  { title: "Job Completion Report", description: "Job stats, success rate & turnaround time", icon: Briefcase, date: "Feb 2026", type: "Jobs" },
  { title: "Revenue Summary", description: "Earnings, commissions & payout details", icon: IndianRupee, date: "Feb 2026", type: "Finance" },
  { title: "Growth Analytics", description: "User acquisition, retention & platform growth", icon: TrendingUp, date: "Q4 2025", type: "Growth" },
];

const kpis = [
  { label: "Avg. Job Completion Time", value: "2.4 days" },
  { label: "Worker Utilization Rate", value: "72%" },
  { label: "Client Retention", value: "85%" },
  { label: "Platform Rating", value: "4.6 ⭐" },
];

const AdminReports: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground">Analytics & downloadable reports</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-xl font-bold text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <div key={report.title} className="bg-card rounded-xl border border-border p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
              <report.icon size={20} className="text-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">{report.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{report.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">{report.date}</span>
                <button className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReports;
