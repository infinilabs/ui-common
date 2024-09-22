import { useEffect, useRef, useCallback } from "react";

const useAsyncInterval = (fn, milliseconds) => {
  const timeoutId = useRef(null);
  const isStopped = useRef(false);
  const pendingFn = useRef(() => {});

  const setAsyncInterval = useCallback(async () => {
    if (!isStopped.current) {
      timeoutId.current = window.setTimeout(async () => {
        pendingFn.current = await fn();
        setAsyncInterval();
      }, milliseconds);
    }
  }, [fn, milliseconds]);

  const stop = useCallback(() => {
    isStopped.current = true;
    if (timeoutId.current !== null) {
      window.clearTimeout(timeoutId.current);
    }
  }, []);

  useEffect(() => {
    isStopped.current = false;
    setAsyncInterval();

    return () => stop();
  }, [setAsyncInterval, stop]);

  return { stop, pendingFn: pendingFn.current };
};

export default useAsyncInterval;
