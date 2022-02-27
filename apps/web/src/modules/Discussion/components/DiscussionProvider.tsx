import { Dispatch, SetStateAction } from 'react';
import { createContext, ReactNode, useContext, useMemo } from 'react';

interface TDiscussionContext {
  showDetails: boolean;
  setShowDetails: Dispatch<SetStateAction<boolean>>;
}

const DiscussionContext = createContext<TDiscussionContext | null>(null);

interface Props extends TDiscussionContext {
  children: ReactNode;
}

export const DiscussionProvider = ({
  showDetails,
  setShowDetails,
  children,
}: Props) => {
  const context = useMemo(
    () => ({ showDetails, setShowDetails }),
    [setShowDetails, showDetails],
  );

  return (
    <DiscussionContext.Provider value={context}>
      {children}
    </DiscussionContext.Provider>
  );
};

export const useDiscussion = () => useContext(DiscussionContext);
