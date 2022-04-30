import { ComponentProps, forwardRef, Fragment, ReactNode } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';

interface SelectOptionsProps extends ComponentProps<'ul'> {
  children: ReactNode;
}

export const SelectOptions = forwardRef<HTMLDivElement, SelectOptionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className="relative z-50">
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={clsx(
              'relative z-50 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-gray-900/5 focus:outline-none',
              className,
            )}
            {...props}
          >
            {children}
          </Listbox.Options>
        </Transition>
      </div>
    );
  },
);
