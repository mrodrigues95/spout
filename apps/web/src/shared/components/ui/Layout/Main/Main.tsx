import clsx from 'clsx';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'main'> {}

const Main = ({ children, className, ...props }: Props) => {
  return (
    <main className={clsx('flex min-w-0 flex-1', className)} {...props}>
      {children}
    </main>
  );
};

export default Main;
