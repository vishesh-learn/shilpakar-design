import React from "react";
import { Search, Filter } from "lucide-react";

const jobs = [
  { id: "JOB-1024", title: "Plumbing Work", client: "Anil Sharma", worker: "Raju Patil", date: "14 Feb 2026", status: "Active", amount: "₹1,200" },
  { id: "JOB-1023", title: "Electrical Wiring", client: "Priya Desai", worker: "Suresh Kumar", date: "13 Feb 2026", status: "Completed", amount: "₹2,500" },
  { id: "JOB-1022", title: "Wall Painting", client: "Vikram Singh", worker: "Mohan Das", date: "12 Feb 2026", status: "Active", amount: "₹3,000" },
  { id: "JOB-1021", title: "Carpentry", client: "Neha Gupta", worker: "Ramesh Yadav", date: "11 Feb 2026", status: "Pending", amount: "₹1,800" },
  { id: "JOB-1020", title: "Mason Work", client: "Anil Sharma", worker: "Pappu Mistri", date: "10 Feb 2026", status: "Completed", amount: "₹5,500" },
  { id: "JOB-1019", title: "Tile Fitting", client: "Rajesh Patel", worker: "Unassigned", date: "10 Feb 2026", status: "Pending", amount: "₹4,000" },
  { id: "JOB-1018", title: "AC Installation", client: "Priya Desai", worker: "Suresh Kumar", date: "09 Feb 2026", status: "Completed", amount: "₹3,200" },
];

const statusColor: Record<string, string> = {
  Active: "bg-success/10 text-success",
  Completed: "bg-primary/10 text-primary",
  Pending: "bg-warning/10 text-warning",
};

const AdminJobs: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Jobs</h1>
          <p className="text-sm text-muted-foreground">All job postings and assignments</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <p className="text-2xl font-bold text-success">3</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <p className="text-2xl font-bold text-warning">2</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <p className="text-2xl font-bold text-primary">3</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Search jobs..." />
        </div>
        <button className="px-3 py-2.5 bg-card border border-border rounded-lg hover:bg-secondary transition-colors">
          <Filter size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-xs font-medium text-muted-foreground">ID</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground">Job Title</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Client</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Worker</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">Date</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-right p-4 text-xs font-medium text-muted-foreground">Amount</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="p-4 font-mono text-xs text-muted-foreground">{job.id}</td>
                <td className="p-4 font-medium text-foreground">{job.title}</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">{job.client}</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">{job.worker}</td>
                <td className="p-4 text-muted-foreground hidden sm:table-cell">{job.date}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[job.status]}`}>{job.status}</span>
                </td>
                <td className="p-4 text-right font-semibold text-foreground">{job.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobs;
