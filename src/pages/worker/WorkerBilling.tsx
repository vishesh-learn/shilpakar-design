import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CalendarDays, CheckCircle, Clock, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import ScreenHeader from "@/components/ScreenHeader";
import AppButton from "@/components/AppButton";
import AppCard from "@/components/AppCard";
import BottomNav from "@/components/BottomNav";
import { useSimulatedAction } from "@/hooks/useSimulatedLoading";
import {
  formatBillingMonth,
  getWorkerAccess,
  getWorkerBills,
  loadWorkerBillingRecord,
  markWorkerBillPaid,
  WORKER_BILLING_STORAGE_KEY,
  WORKER_MONTHLY_FEE,
  type WorkerBillingRecord,
} from "@/lib/workerBilling";

const WorkerBilling: React.FC = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState<WorkerBillingRecord>(() => loadWorkerBillingRecord());
  const [payingMonth, setPayingMonth] = useState<string | null>(null);
  const [paying, runPayment] = useSimulatedAction();
  const bills = getWorkerBills(record);
  const unpaidBills = bills.filter((bill) => !bill.paid);
  const access = getWorkerAccess(record);

  const payBill = (month: string) => {
    if (paying) return;
    setPayingMonth(month);
    runPayment(() => {
      const updatedRecord = markWorkerBillPaid(record, month);
      try {
        localStorage.setItem(WORKER_BILLING_STORAGE_KEY, JSON.stringify(updatedRecord));
      } catch {
        toast.error("Payment status could not be saved on this device.");
        setPayingMonth(null);
        return;
      }
      setRecord(updatedRecord);
      setPayingMonth(null);
      toast.success("Demo payment recorded", { description: "No real money was charged." });
    });
  };

  return (
    <div className="mobile-container min-h-screen bg-background pb-24">
      <ScreenHeader title="Monthly bill" />
      <main className="space-y-5 px-5 py-6">
        <section className="border-b border-border pb-5">
          <p className="text-sm text-muted-foreground">Worker subscription</p>
          <h2 className="mt-1 text-3xl font-bold text-foreground">₹{WORKER_MONTHLY_FEE}<span className="text-base font-medium text-muted-foreground"> / assigned month</span></h2>
          <p className="mt-2 text-sm text-muted-foreground">A bill is added for each calendar month you are assigned at least one job.</p>
        </section>

        <section aria-labelledby="access-status-title" className="space-y-3">
          <h3 id="access-status-title" className="font-bold text-foreground">Paid services</h3>
          <div className="flex items-start gap-3 border-l-4 border-primary bg-accent p-4">
            <CheckCircle className="mt-0.5 shrink-0 text-primary" size={19} />
            <p className="text-sm leading-relaxed text-accent-foreground">
              Job applications and public client listings are {access.canApplyForJobs ? "available" : "paused until overdue bills are paid"}. Invitations and accepting invitations remain available.
            </p>
          </div>
          <div className="flex items-start gap-3 border-l-4 border-border bg-muted p-4">
            <Clock className="mt-0.5 shrink-0 text-muted-foreground" size={19} />
            <p className="text-sm leading-relaxed text-muted-foreground">Each bill has a seven-day grace period in the following month. Assigned work is not paused.</p>
          </div>
        </section>

        <section className="space-y-3" aria-labelledby="bill-history-title">
          <h3 id="bill-history-title" className="font-bold text-foreground">Bills</h3>
          {bills.length === 0 ? (
            <p className="py-5 text-sm text-muted-foreground">No monthly bills yet. A bill is created after a month in which you are assigned work.</p>
          ) : bills.slice().reverse().map((bill) => (
            <AppCard key={bill.month}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground">{formatBillingMonth(bill.month)}</h4>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarDays size={15} />
                    {bill.paid ? "Paid" : bill.overdue ? "Due" : "Grace period"} · {bill.dueDate.toLocaleDateString()}
                  </p>
                </div>
                <span className="shrink-0 font-bold text-foreground">₹{WORKER_MONTHLY_FEE}</span>
              </div>
              {bill.paid ? (
                <div className="mt-3 flex items-center gap-2 text-sm font-medium text-success">
                  <CheckCircle size={16} /> Paid
                </div>
              ) : (
                <div className="mt-3 space-y-3">
                  {bill.overdue && (
                    <p className="flex items-center gap-2 text-sm text-destructive">
                      <AlertCircle size={16} /> Applications and public listing are paused.
                    </p>
                  )}
                  <AppButton
                    size="md"
                    onClick={() => payBill(bill.month)}
                    loading={paying && payingMonth === bill.month}
                    disabled={paying}
                  >
                    <IndianRupee size={17} /> Pay ₹{WORKER_MONTHLY_FEE}
                  </AppButton>
                </div>
              )}
            </AppCard>
          ))}
        </section>

        {unpaidBills.length > 0 && (
          <p className="text-center text-xs text-muted-foreground">Mock payment only. This will not charge real money.</p>
        )}
        {unpaidBills.length === 0 && bills.length > 0 && (
          <div className="border-l-4 border-success bg-accent p-4 text-sm text-accent-foreground" role="status">
            Your outstanding bills are paid. Job applications and public listing are available.
          </div>
        )}
        <AppButton variant="outline" onClick={() => navigate("/worker/jobs?tab=invitations")}>View invitations</AppButton>
      </main>
      <BottomNav type="worker" />
    </div>
  );
};

export default WorkerBilling;