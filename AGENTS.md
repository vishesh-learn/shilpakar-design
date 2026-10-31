Job invitations and client applications are presented as separate role-specific flows within the existing job navigation, keeping each action close to its related job.
Job and application/invitation statuses come from the shared constants in src/lib/jobStatus.ts (mirrors the backend status model); screens reference status ids and derive labels from them instead of hardcoded strings.
