import { useEffect, useState } from "react";

export const useTimer = (duration: number) => {
  const [progress, setProgress] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => setProgress(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      const interval = 100;
      const step = (100 / duration) * interval;

      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev + step >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + step;
        });
      }, interval);
    }

    return () => clearInterval(timer);
  }, [isRunning, duration]);

  return { start, stop, reset, progress };
};
