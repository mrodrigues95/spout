import { createContext, ReactNode, useContext, useMemo } from 'react';

interface TSettingsContext {
  sessionId: string;
}

const SettingsContext = createContext<TSettingsContext | null>(null);

interface Props extends TSettingsContext {
  children: ReactNode;
}

export const SettingsProvider = ({ sessionId, children }: Props) => {
  const context = useMemo(() => ({ sessionId }), [sessionId]);

  return (
    <SettingsContext.Provider value={context}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext)!;
