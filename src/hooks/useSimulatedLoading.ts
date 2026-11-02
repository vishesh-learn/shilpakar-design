import { useEffect, useState } from "react";

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
