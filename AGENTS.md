Job invitations and client applications are presented as separate role-specific flows within the existing job navigation, keeping each action close to its related job.
Job and application/invitation statuses come from the shared constants in src/lib/jobStatus.ts (mirrors the backend status model); screens reference status ids and derive labels from them instead of hardcoded strings.
Form and OTP errors use the shared pattern from src/components/FieldError.tsx: buttons stay enabled, validation runs on submit, errors show inline under the field with a red border and one-shot animate-shake (shake never sits on the same element as animate-fade-in), and errors clear as the user fixes the field.
Login/OTP demo verification code is 1234 (DEMO_OTP in LoginScreen.tsx) — replace with real backend verification when connected.
Data screens (dashboards, lists, profiles, earnings) show skeleton placeholders from src/components/Skeleton.tsx driven by useSimulatedLoading() from src/hooks/useSimulatedLoading.ts; mock data loads instantly, so the hook's short delay simulates the wait — swap the hook for real loading state when a backend is connected.
Submit/save actions (send OTP, verify, post job, save profile, rate, apply/invite/accept/decline, start job, log day) show a loading state via the `loading` prop on AppButton (inline spinner, button disabled, aria-busy) driven by useSimulatedAction() from src/hooks/useSimulatedLoading.ts; keep validation before `run(...)` so errors never spin — swap the simulated delay for the real API call when a backend is connected.



