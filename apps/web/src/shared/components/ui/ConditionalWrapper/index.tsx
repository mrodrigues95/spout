import { ReactElement, ReactNode } from 'react';

interface Props {
  condition: boolean;
  wrapper(children: ReactNode): ReactElement;
  children: ReactNode;
}

const ConditionalWrapper = ({ condition, wrapper, children }: Props) =>
  condition ? wrapper(children) : <>{children}</>;

export default ConditionalWrapper;
