import React from "react";
import { Users, Briefcase, IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  { label: "Total Workers", value: "1,248", change: "+12%", up: true, icon: Users, color: "bg-primary" },
  { label: "Active Jobs", value: "342", change: "+8%", up: true, icon: Briefcase, color: "bg-success" },
  { label: "Revenue", value: "₹4.2L", change: "+23%", up: true, icon: IndianRupee, color: "bg-warning" },
  { label: "Growth", value: "18%", change: "-2%", up: false, icon: TrendingUp, color: "bg-destructive" },
];

const recentJobs = [
  { id: "JOB-1024", title: "Plumbing Work", client: "Anil Sharma", worker: "Raju Patil", status: "Active", amount: "₹1,200" },
  { id: "JOB-1023", title: "Electrical Wiring", client: "Priya Desai", worker: "Suresh Kumar", status: "Completed", amount: "₹2,500" },
  { id: "JOB-1022", title: "Wall Painting", client: "Vikram Singh", worker: "Mohan Das", status: "Active", amount: "₹3,000" },
  { id: "JOB-1021", title: "Carpentry", client: "Neha Gupta", worker: "Ramesh Yadav", status: "Pending", amount: "₹1,800" },
  { id: "JOB-1020", title: "Mason Work", client: "Anil Sharma", worker: "Pappu Mistri", status: "Completed", amount: "₹5,500" },
];

const topWorkers = [
  { name: "Raju Patil", skill: "Plumber", rating: 4.8, jobs: 56 },
  { name: "Suresh Kumar", skill: "Electrician", rating: 4.7, jobs: 48 },
  { name: "Mohan Das", skill: "Painter", rating: 4.6, jobs: 42 },
  { name: "Ramesh Yadav", skill: "Carpenter", rating: 4.5, jobs: 38 },
];

const statusColor: Record<string, string> = {
  Active: "bg-success/10 text-success",
  Completed: "bg-primary/10 text-primary",
  Pending: "bg-warning/10 text-warning",
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your labour hiring platform</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl border border-border p-5 flex items-start gap-4">
            <div className={`${stat.color} w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0`}>
              <stat.icon size={20} className="text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? "text-success" : "text-destructive"}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change} this month
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs Table */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Recent Jobs</h3>
            <button className="text-xs text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Job Title</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Client</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Worker</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((job) => (
                  <tr key={job.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                    <td className="p-4 font-mono text-xs text-muted-foreground">{job.id}</td>
                    <td className="p-4 font-medium text-foreground">{job.title}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{job.client}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{job.worker}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[job.status]}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-semibold text-foreground">{job.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Workers */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Top Workers</h3>
          </div>
          <div className="p-3 space-y-1">
            {topWorkers.map((worker, i) => (
              <div key={worker.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-accent-foreground">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{worker.name}</p>
                  <p className="text-xs text-muted-foreground">{worker.skill} · ⭐ {worker.rating}</p>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{worker.jobs} jobs</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
