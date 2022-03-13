import { createContext, ReactNode, useContext, useMemo } from 'react';
import { AlertVariant } from './alert';

interface TAlertContext {
  variant: AlertVariant;
}

const AlertContext = createContext<TAlertContext | null>(null);

interface Props extends TAlertContext {
  children: ReactNode;
}

export const AlertProvider = ({ variant, children }: Props) => {
  const context = useMemo(() => ({ variant }), [variant]);

  return (
    <AlertContext.Provider value={context}>{children}</AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext)!;
