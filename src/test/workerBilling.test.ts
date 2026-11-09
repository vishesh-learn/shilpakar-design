import { describe, expect, it } from "vitest";
import {
  canShowWorkerInClientDirectory,
  getWorkerAccess,
  getWorkerBills,
  WORKER_GRACE_PERIOD_DAYS,
  WORKER_MONTHLY_FEE,
  type WorkerBillingRecord,
} from "@/lib/workerBilling";

const record: WorkerBillingRecord = {
  assignedMonths: ["2026-01"],
  paidMonths: [],
};

describe("worker postpaid billing rules", () => {
  it("charges ₹49 for a month with an assigned job", () => {
    expect(WORKER_MONTHLY_FEE).toBe(49);
    expect(getWorkerBills(record, new Date(2026, 1, 1)).map((bill) => bill.month)).toEqual(["2026-01"]);
  });

  it("allows the seven-day grace period, then pauses paid services", () => {
    expect(WORKER_GRACE_PERIOD_DAYS).toBe(7);
    const graceAccess = getWorkerAccess(record, new Date(2026, 1, 7, 23, 59, 59));
    expect(graceAccess.canApplyForJobs).toBe(true);
    const overdueAccess = getWorkerAccess(record, new Date(2026, 1, 8, 0, 0, 0));
    expect(overdueAccess.canApplyForJobs).toBe(false);
    expect(overdueAccess.canBeListed).toBe(false);
  });

  it("permits exact phone/email discovery and the invitation picker while overdue", () => {
    const access = getWorkerAccess(record, new Date(2026, 1, 8));
    const worker = { name: "Ramesh Kumar", email: "ramesh@example.com", phone: "+91 98765 43210" };
    const directoryOptions = { ...worker, inviteMode: false };
    expect(canShowWorkerInClientDirectory(access, { ...directoryOptions, query: "ramesh@example.com" })).toBe(true);
    expect(canShowWorkerInClientDirectory(access, { ...directoryOptions, query: "9876543210" })).toBe(true);
    expect(canShowWorkerInClientDirectory(access, { ...directoryOptions, query: "Ramesh" })).toBe(false);
    expect(canShowWorkerInClientDirectory(access, { ...directoryOptions, inviteMode: true, query: "" })).toBe(true);
    expect(access.canReceiveInvitations).toBe(true);
    expect(access.canAcceptInvitations).toBe(true);
  });

  it("does not create an amount due when the assigned month is still current", () => {
    expect(getWorkerBills(record, new Date(2026, 0, 31))).toEqual([]);
  });
});