import React from "react";
import { Search, Filter, MoreVertical } from "lucide-react";

const clients = [
  { name: "Anil Sharma", company: "Sharma Constructions", phone: "+91 99887 76655", jobs: 12, spent: "₹1.2L", status: "Active" },
  { name: "Priya Desai", company: "Desai Interiors", phone: "+91 99887 76656", jobs: 8, spent: "₹85K", status: "Active" },
  { name: "Vikram Singh", company: "Singh Builders", phone: "+91 99887 76657", jobs: 15, spent: "₹2.1L", status: "Active" },
  { name: "Neha Gupta", company: "Personal", phone: "+91 99887 76658", jobs: 3, spent: "₹25K", status: "Inactive" },
  { name: "Rajesh Patel", company: "Patel & Sons", phone: "+91 99887 76659", jobs: 20, spent: "₹3.5L", status: "Active" },
];

const AdminClients: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <p className="text-sm text-muted-foreground">Manage registered clients & contractors</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          + Add Client
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Search clients..." />
        </div>
        <button className="px-3 py-2.5 bg-card border border-border rounded-lg hover:bg-secondary transition-colors">
          <Filter size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-xs font-medium text-muted-foreground">Client</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Phone</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">Jobs</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground">Total Spent</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">Status</th>
              <th className="text-right p-4 text-xs font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.name} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">{c.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.company}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">{c.phone}</td>
                <td className="p-4 text-foreground hidden sm:table-cell">{c.jobs}</td>
                <td className="p-4 font-semibold text-foreground">{c.spent}</td>
                <td className="p-4 hidden sm:table-cell">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${c.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    {c.status}
                  </span>
                </td>
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

export default AdminClients;
