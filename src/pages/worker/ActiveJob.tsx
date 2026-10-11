import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScreenHeader from "@/components/ScreenHeader";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import BottomNav from "@/components/BottomNav";
import { MapPin, Phone, Clock, CheckCircle, Pencil, Lock, X, CalendarDays, Play } from "lucide-react";
import { toast } from "sonner";

type LogEntry = {
  id: string;
  day: number;
  note: string;
  time: string;
  locked: boolean;
};

type JobData = {
  id: string;
  title: string;
  client: string;
  location: string;
  description: string;
  totalDays: number;
  startsAt: string;
  initialLog: LogEntry[];
};

const jobs: Record<string, JobData> = {
  "1": {
    id: "1",
    title: "Electrical Wiring",
    client: "Anil Sharma",
    location: "Andheri West, Mumbai",
    description:
      "Complete rewiring of a 2BHK apartment. Work includes replacing old wiring, installing new switches and sockets, and setting up the electrical panel. Tools will be provided.",
    totalDays: 3,
    startsAt: "Started yesterday, 9:30 AM",
    initialLog: [
      { id: "1", day: 1, note: "Removed old wiring", time: "Yesterday, 5:40 PM", locked: true },
      { id: "2", day: 2, note: "Installing new cables", time: "Today, 11:15 AM", locked: false },
    ],
  },
  new: {
    id: "new",
    title: "Kitchen Tile Work",
    client: "Meena Joshi",
    location: "Powai, Mumbai",
    description:
      "Tile the kitchen walls and floor of a 1BHK flat. Old tiles to be removed, the surface levelled, and new tiles laid with grouting. Adhesive and grout will be provided.",
    totalDays: 2,
    startsAt: "Today, 4:00 PM",
    initialLog: [],
  },
};

const ActiveJob: React.FC = () => {
  const { id } = useParams();
  const job = jobs[id ?? "1"] ?? jobs["1"];

  const [log, setLog] = useState<LogEntry[]>(job.initialLog);
  const [started, setStarted] = useState(job.initialLog.length > 0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    setLog(job.initialLog);
    setStarted(job.initialLog.length > 0);
    setSheetOpen(false);
    setNote("");
    setEditingId(null);
  }, [job]);

  const currentDay = log.length;
  const latestId = log[log.length - 1]?.id;
  const dayShown = started ? Math.max(1, currentDay) : 0;
  const jobFinished = started && currentDay >= job.totalDays;

  const nowLabel = () =>
    `Today, ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;

  const startJob = () => {
    setStarted(true);
    toast.success("Job started", {
      description: "Day 1 has begun. Log your work when the day is done.",
    });
  };

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

  return (
    <div className="mobile-container bg-background min-h-screen pb-24">
      <ScreenHeader title="Active Job" />
      <div className="px-5 py-6 space-y-4 animate-fade-in">
        <AppCard className={started ? "border-2 !border-success" : "border-2 !border-primary"}>
          <div className="flex items-center gap-2 mb-3">
            {started ? (
              <CheckCircle className="text-success" size={20} />
            ) : (
              <CalendarDays className="text-primary" size={20} />
            )}
            <span className={started ? "text-success font-semibold text-sm" : "text-primary font-semibold text-sm"}>
              {started ? "In Progress" : "Assigned"}
            </span>
          </div>
          <h2 className="text-lg font-bold text-foreground">{job.title}</h2>
          <p className="text-muted-foreground text-sm mt-1">{job.client}</p>
        </AppCard>

        <AppCard>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} />
              <p className="text-foreground text-sm">{job.location}</p>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays className="text-primary" size={20} />
              <p className="text-foreground text-sm">
                {started ? job.startsAt : `Starts ${job.startsAt}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-primary" size={20} />
              <p className="text-foreground text-sm">
                {started ? `Day ${Math.min(dayShown, job.totalDays)} of ${job.totalDays}` : "Not started yet"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-primary" size={20} />
              <p className="text-primary text-sm font-medium">Call Client</p>
            </div>
          </div>
        </AppCard>

        <AppCard>
          <h3 className="font-bold text-foreground mb-2">Description</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{job.description}</p>
        </AppCard>

        <AppCard>
          <h3 className="font-bold text-foreground mb-3">Daily Log</h3>
          {log.length === 0 ? (
            <p className="text-sm text-muted-foreground leading-relaxed">
              No work logged yet. Start the job, then log what you finish at the end of each day.
            </p>
          ) : (
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
              <p className="text-xs text-muted-foreground mt-3">
                Only today's entry can be corrected. Earlier days are locked.
              </p>
            </div>
          )}
        </AppCard>

        {!started ? (
          <AppButton onClick={startJob}>
            <Play size={18} /> Start job
          </AppButton>
        ) : (
          <AppButton variant="success" onClick={openNew} disabled={jobFinished}>
            {jobFinished ? "All days completed" : `Mark Day ${currentDay + 1} Complete`}
          </AppButton>
        )}
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
