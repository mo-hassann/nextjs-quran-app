import useSetReadingTime from "@/client/statistics/api/use-set-reading-time";
import { useCallback, useEffect, useState } from "react";

const useSessionTracker = () => {
  const [sessionStart, setSessionStart] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const readingTimeMutation = useSetReadingTime();

  // Update stored time and reset the last update time
  const updateStoredTime = useCallback(
    (elapsed: number) => {
      readingTimeMutation.mutate({ time: elapsed });
      setSessionStart(Date.now());
    },
    [readingTimeMutation]
  );

  useEffect(() => {
    setSessionStart(Date.now());
    setIsActive(true);
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      setSessionStart(Date.now());

      setIsActive(true);
    };

    const handleBlur = () => {
      setIsActive(false);
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [sessionStart, updateStoredTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive && sessionStart) {
        const now = Date.now();
        const elapsed = now - sessionStart;
        updateStoredTime(elapsed);
      }
    }, 60 * 1000); // Update every minute

    return () => clearInterval(interval);
  }, [isActive, sessionStart, updateStoredTime]);
};

export default useSessionTracker;
