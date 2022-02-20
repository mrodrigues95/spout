import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<'blockquote'> {
  children: ReactNode;
}

const Quote = ({ className, children, ...props }: Props) => {
  return (
    <blockquote
      className={clsx(
        'p-2 bg-gray-50 border-gray-200 border-l-4 rounded-r-md',
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
};

export default Quote;
