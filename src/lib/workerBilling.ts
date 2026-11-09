export const WORKER_MONTHLY_FEE = 49;
export const WORKER_GRACE_PERIOD_DAYS = 7;
export const WORKER_BILLING_STORAGE_KEY = "shilpakar-worker-billing";

export interface WorkerBillingRecord {
  assignedMonths: string[];
  paidMonths: string[];
}

export interface WorkerBill {
  month: string;
  dueDate: Date;
  paid: boolean;
  overdue: boolean;
}

export interface WorkerAccess {
  canBeListed: boolean;
  canApplyForJobs: boolean;
  canReceiveInvitations: true;
  canAcceptInvitations: true;
  overdueBills: WorkerBill[];
  graceBills: WorkerBill[];
}

export const getMonthKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

const defaultBillingRecord = (now: Date): WorkerBillingRecord => {
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return { assignedMonths: [getMonthKey(previousMonth)], paidMonths: [] };
};

export const loadWorkerBillingRecord = (now = new Date()): WorkerBillingRecord => {
  try {
    const saved = localStorage.getItem(WORKER_BILLING_STORAGE_KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (
        typeof parsed === "object" && parsed !== null &&
        "assignedMonths" in parsed && Array.isArray(parsed.assignedMonths) &&
        "paidMonths" in parsed && Array.isArray(parsed.paidMonths)
      ) {
        return {
          assignedMonths: parsed.assignedMonths.filter((month): month is string => typeof month === "string"),
          paidMonths: parsed.paidMonths.filter((month): month is string => typeof month === "string"),
        };
      }
    }
  } catch {
    // Fall through to the demo billing record if stored data is unavailable.
  }

  const initial = defaultBillingRecord(now);
  try {
    localStorage.setItem(WORKER_BILLING_STORAGE_KEY, JSON.stringify(initial));
  } catch {
    // Billing rules still work for this visit if browser storage is unavailable.
  }
  return initial;
};

export const getWorkerBills = (record: WorkerBillingRecord, now = new Date()): WorkerBill[] => {
  const currentMonth = getMonthKey(now);

  return [...new Set(record.assignedMonths)]
    .filter((month) => month < currentMonth)
    .sort()
    .map((month) => {
      const [year, monthNumber] = month.split("-").map(Number);
      const dueDate = new Date(year, monthNumber, WORKER_GRACE_PERIOD_DAYS, 23, 59, 59, 999);
      const paid = record.paidMonths.includes(month);
      return { month, dueDate, paid, overdue: !paid && now.getTime() > dueDate.getTime() };
    });
};

export const getWorkerAccess = (record: WorkerBillingRecord, now = new Date()): WorkerAccess => {
  const bills = getWorkerBills(record, now);
  const overdueBills = bills.filter((bill) => bill.overdue);
  const graceBills = bills.filter((bill) => !bill.paid && !bill.overdue);
  const paidServicesAvailable = overdueBills.length === 0;

  return {
    canBeListed: paidServicesAvailable,
    canApplyForJobs: paidServicesAvailable,
    canReceiveInvitations: true,
    canAcceptInvitations: true,
    overdueBills,
    graceBills,
  };
};

export const canShowWorkerInClientDirectory = (
  access: WorkerAccess,
  options: { query: string; email: string; phone: string; inviteMode: boolean },
): boolean => {
  if (options.inviteMode || access.canBeListed) return true;

  const query = options.query.trim().toLowerCase();
  const normalizedPhoneQuery = query.replace(/\D/g, "");
  const matchesEmail = options.email.trim().toLowerCase() === query;
  const matchesPhone = normalizedPhoneQuery.length > 0 &&
    options.phone.replace(/\D/g, "") === normalizedPhoneQuery;
  return matchesEmail || matchesPhone;
};

export const markWorkerBillPaid = (record: WorkerBillingRecord, month: string): WorkerBillingRecord => ({
  ...record,
  paidMonths: [...new Set([...record.paidMonths, month])],
});

export const formatBillingMonth = (month: string): string => {
  const [year, monthNumber] = month.split("-").map(Number);
  return new Date(year, monthNumber - 1, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
};