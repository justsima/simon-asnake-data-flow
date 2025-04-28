
import { useCallback } from 'react';

export const useNavigationDelay = (delayMs: number = 150) => {
  const delayedNavigate = useCallback((callback: () => void) => {
    setTimeout(() => {
      callback();
    }, delayMs);
  }, [delayMs]);

  return { delayedNavigate };
};
