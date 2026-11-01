Job invitations and client applications are presented as separate role-specific flows within the existing job navigation, keeping each action close to its related job.
Job and application/invitation statuses come from the shared constants in src/lib/jobStatus.ts (mirrors the backend status model); screens reference status ids and derive labels from them instead of hardcoded strings.
Form and OTP errors use the shared pattern from src/components/FieldError.tsx: buttons stay enabled, validation runs on submit, errors show inline under the field with a red border and one-shot animate-shake (shake never sits on the same element as animate-fade-in), and errors clear as the user fixes the field.
Login/OTP demo verification code is 1234 (DEMO_OTP in LoginScreen.tsx) — replace with real backend verification when connected.

