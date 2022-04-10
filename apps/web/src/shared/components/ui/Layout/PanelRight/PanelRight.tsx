import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface Props extends ComponentProps<'section'> {}

const RightPanel = ({ className, children, ...props }: Props) => {
  return (
    <section
      className={twMerge(
        clsx(
          'flex flex-1 flex-col space-y-8 lg:ml-4 lg:w-64 lg:flex-initial xl:ml-8',
          className,
        ),
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default RightPanel;
