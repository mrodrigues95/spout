import { createContext, ReactNode, useContext, useMemo } from 'react';

interface TSessionContext {
  sessionId?: string;
}

const SessionContext = createContext<TSessionContext | null>(null);

interface Props extends TSessionContext {
  children: ReactNode;
}

export const SessionProvider = ({ sessionId, children }: Props) => {
  const context = useMemo(() => ({ sessionId }), [sessionId]);

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext)!;
