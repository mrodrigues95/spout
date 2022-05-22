import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface Props extends ComponentProps<'section'> {}

const PanelRight = ({ className, children, ...props }: Props) => {
  return (
    <div className="relative h-full lg:ml-5 lg:w-64">
      <section
        className={twMerge(
          clsx(
            'flex h-full flex-1 flex-col space-y-8',
            'lg:fixed lg:inset-y-0 lg:z-20 lg:w-64 lg:flex-initial lg:py-4 lg:pr-4',
            '2xl:pr-0',
            className,
          ),
        )}
        // style={{ right: 'max(0px,calc(50% - 45rem))' }}
        {...props}
      >
        {children}
      </section>
    </div>
  );
};

export default PanelRight;
