// Job and application/invitation statuses — mirrors the backend constants.
export const JobStatus = {
  awaitingWorker: {
    id: "awaiting-worker",
    label: "Awaiting Worker",
    description: "Newly created job without any worker.",
  },
  workerAssigned: {
    id: "worker-assigned",
    label: "Worker Assigned",
    description: "A worker has been assigned to the job.",
  },
  inProgress: {
    id: "in-progress",
    label: "In Progress",
    description: "Worker has started working on the job.",
  },
  completed: {
    id: "completed",
    label: "Completed",
    description: "Worker has completed the job.",
  },
  onHold: {
    id: "on-hold",
    label: "On Hold",
    description: "The job is on hold.",
  },
  cancelled: {
    id: "cancelled",
    label: "Cancelled",
    description: "The job has been cancelled.",
  },
} as const;

export type JobStatusId = (typeof JobStatus)[keyof typeof JobStatus]["id"];

export const JobApplicationOrInvitationStatus = {
  pending: {
    id: "pending",
    label: "Pending",
    description: "Job application is pending.",
  },
  accepted: {
    id: "accepted",
    label: "Accepted",
    description: "Job application is accepted.",
  },
  declined: {
    id: "declined",
    label: "Declined",
    description: "Job application is declined.",
  },
} as const;

export type ApplicationStatusId =
  (typeof JobApplicationOrInvitationStatus)[keyof typeof JobApplicationOrInvitationStatus]["id"];

export const getJobStatusLabel = (id: JobStatusId): string => {
  const status = Object.values(JobStatus).find((s) => s.id === id);
  return status?.label ?? id;
};
