import { useCallback } from 'react';

export const useInitializeIronSession = () => {
  return useCallback(
    async (sessionId: string) =>
      fetch('/api/sessions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionId),
      }),
    [],
  );
};
