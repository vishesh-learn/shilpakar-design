import React from "react";
import { Search, Filter, MoreVertical } from "lucide-react";

const workers = [
  { name: "Raju Patil", skill: "Plumber", phone: "+91 98765 43210", location: "Andheri", status: "Available", rating: 4.8, jobs: 56 },
  { name: "Suresh Kumar", skill: "Electrician", phone: "+91 98765 43211", location: "Bandra", status: "On Job", rating: 4.7, jobs: 48 },
  { name: "Mohan Das", skill: "Painter", phone: "+91 98765 43212", location: "Dadar", status: "Available", rating: 4.6, jobs: 42 },
  { name: "Ramesh Yadav", skill: "Carpenter", phone: "+91 98765 43213", location: "Thane", status: "Inactive", rating: 4.5, jobs: 38 },
  { name: "Pappu Mistri", skill: "Mason", phone: "+91 98765 43214", location: "Kurla", status: "Available", rating: 4.4, jobs: 35 },
  { name: "Dinesh Jha", skill: "Helper", phone: "+91 98765 43215", location: "Borivali", status: "On Job", rating: 4.2, jobs: 28 },
];

const statusColor: Record<string, string> = {
  Available: "bg-success/10 text-success",
  "On Job": "bg-primary/10 text-primary",
  Inactive: "bg-muted text-muted-foreground",
};

const AdminWorkers: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Workers</h1>
          <p className="text-sm text-muted-foreground">Manage registered workers</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          + Add Worker
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Search workers..." />
        </div>
        <button className="px-3 py-2.5 bg-card border border-border rounded-lg hover:bg-secondary transition-colors">
          <Filter size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-xs font-medium text-muted-foreground">Worker</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Phone</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Location</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">Rating</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">Jobs</th>
              <th className="text-right p-4 text-xs font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {workers.map((w) => (
              <tr key={w.name} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-accent-foreground">{w.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{w.name}</p>
                      <p className="text-xs text-muted-foreground">{w.skill}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">{w.phone}</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">{w.location}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[w.status]}`}>{w.status}</span>
                </td>
                <td className="p-4 text-foreground hidden sm:table-cell">⭐ {w.rating}</td>
                <td className="p-4 text-muted-foreground hidden sm:table-cell">{w.jobs}</td>
                <td className="p-4 text-right">
                  <button className="p-1.5 rounded-md hover:bg-secondary transition-colors">
                    <MoreVertical size={16} className="text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminWorkers;
