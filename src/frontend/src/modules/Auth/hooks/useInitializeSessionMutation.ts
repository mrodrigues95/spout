export const useInitializeSessionMutation = () => async (sessionId: string) => {
  await fetch('/api/sessions/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sessionId),
  }).catch((error) => {
    throw error;
  });
};
