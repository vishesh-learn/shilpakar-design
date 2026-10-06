import React, { useState } from "react";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import BottomNav from "@/components/BottomNav";
import { MapPin, Phone, Clock, CheckCircle, Pencil, Lock, X } from "lucide-react";
import { toast } from "sonner";

type LogEntry = {
  id: string;
  day: number;
  note: string;
  time: string;
  locked: boolean;
};

const totalDays = 3;

const initialLog: LogEntry[] = [
  { id: "1", day: 1, note: "Removed old wiring", time: "Yesterday, 5:40 PM", locked: true },
  { id: "2", day: 2, note: "Installing new cables", time: "Today, 11:15 AM", locked: false },
];

const ActiveJob: React.FC = () => {
  const [log, setLog] = useState<LogEntry[]>(initialLog);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const currentDay = log.length;
  const latestId = log[log.length - 1]?.id;

  const nowLabel = () =>
    `Today, ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;

  const openNew = () => {
    setEditingId(null);
    setNote("");
    setSheetOpen(true);
  };

  const openEdit = (entry: LogEntry) => {
    setEditingId(entry.id);
    setNote(entry.note);
    setSheetOpen(true);
  };

  const save = () => {
    const text = note.trim();
    if (!text) return;

    if (editingId) {
      setLog((prev) => prev.map((e) => (e.id === editingId ? { ...e, note: text, time: nowLabel() } : e)));
      toast.success("Log entry updated");
    } else {
      setLog((prev) => [
        // lock all previous days once a new day is logged
        ...prev.map((e) => ({ ...e, locked: true })),
        { id: String(Date.now()), day: prev.length + 1, note: text, time: nowLabel(), locked: false },
      ]);
      toast.success(`Day ${log.length + 1} marked complete`);
    }
    setSheetOpen(false);
    setNote("");
    setEditingId(null);
  };

  const jobFinished = currentDay >= totalDays;

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title="Active Job" />
      <div className="px-5 py-6 space-y-4 animate-fade-in">
        <AppCard className="border-2 !border-success">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="text-success" size={20} />
            <span className="text-success font-semibold text-sm">In Progress</span>
          </div>
          <h2 className="text-lg font-bold text-foreground">Electrical Wiring</h2>
          <p className="text-muted-foreground text-sm mt-1">Anil Sharma</p>
        </AppCard>

        <AppCard>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} />
              <p className="text-foreground text-sm">Andheri West, Mumbai</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-primary" size={20} />
              <p className="text-foreground text-sm">Day {Math.min(currentDay, totalDays)} of {totalDays}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-primary" size={20} />
              <p className="text-primary text-sm font-medium">Call Client</p>
            </div>
          </div>
        </AppCard>

        <AppCard>
          <h3 className="font-bold text-foreground mb-2">Description</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Complete rewiring of a 2BHK apartment. Work includes replacing old wiring, installing new switches and sockets, and setting up the electrical panel. Tools will be provided.
          </p>
        </AppCard>

        <AppCard>
          <h3 className="font-bold text-foreground mb-3">Daily Log</h3>
          <div className="space-y-3">
            {log.map((entry) => (
              <div key={entry.id} className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-success shrink-0 mt-0.5" size={16} />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground">Day {entry.day} - {entry.note}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{entry.time}</p>
                </div>
                {entry.id === latestId && !entry.locked ? (
                  <button
                    onClick={() => openEdit(entry)}
                    className="text-primary flex items-center gap-1 text-xs font-semibold shrink-0"
                    aria-label="Edit today's log entry"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                ) : (
                  <Lock size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Only today's entry can be corrected. Earlier days are locked.
          </p>
        </AppCard>

        <AppButton variant="success" onClick={openNew} disabled={jobFinished}>
          {jobFinished ? "All days completed" : `Mark Day ${currentDay + 1} Complete`}
        </AppButton>
      </div>

      {sheetOpen && (
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 md:left-[calc(50%+120px)] w-full max-w-[390px] z-50 flex items-end justify-center bg-foreground/40">
          <div className="w-full bg-card rounded-t-3xl p-5 pb-8 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground">
                {editingId ? `Correct Day ${currentDay} log` : `Day ${currentDay + 1} work done`}
              </h3>
              <button onClick={() => setSheetOpen(false)} aria-label="Close">
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              autoFocus
              placeholder="What did you complete today?"
              className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
            />
            <AppButton variant="success" onClick={save} disabled={!note.trim()}>
              {editingId ? "Save correction" : "Mark day complete"}
            </AppButton>
          </div>
        </div>
      )}

      <BottomNav type="worker" />
    </div>
  );
};

export default ActiveJob;
