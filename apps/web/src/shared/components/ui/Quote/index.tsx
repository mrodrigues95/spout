import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<'blockquote'> {
  children: ReactNode;
}

const Quote = ({ className, children, ...props }: Props) => {
  return (
    <blockquote
      className={clsx(
        'rounded-r-md border-l-4 border-gray-200 bg-gray-50 p-2',
        className,
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
};

export default Quote;
