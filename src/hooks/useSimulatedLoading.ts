import { useEffect, useRef, useState } from "react";

/**
 * Simulates data arriving shortly after a screen renders, so skeleton
 * placeholders are visible. Local mock data is instant, so screens call
 * this to drive their loading state until a real backend is connected.
 */
export const useSimulatedLoading = (delay = 700) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return loading;
};

/**
 * Simulates a short submit/save action (e.g. sending an OTP, posting a job)
 * so the triggering button can show a loading spinner. Local actions are
 * instant, so the short delay stands in for the network wait until a real
 * backend is connected — swap `run(...)` for the actual API call then.
 */
export const useSimulatedAction = (delay = 900) => {
  const [pending, setPending] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const run = (action: () => void) => {
    if (pending) return;
    setPending(true);
    timer.current = setTimeout(() => {
      action();
      setPending(false);
    }, delay);
  };

  return [pending, run] as const;
};
