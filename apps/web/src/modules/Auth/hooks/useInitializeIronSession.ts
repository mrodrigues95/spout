export const useInitializeIronSession = () => async (sessionId: string) => {
  fetch('/api/sessions/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sessionId),
  });
};
