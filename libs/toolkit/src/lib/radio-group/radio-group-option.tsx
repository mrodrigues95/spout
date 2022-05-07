import { ComponentProps, ReactNode } from 'react';
import { RadioGroup } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface RadioGroupOptionRenderPropArg {
  checked: boolean;
  active: boolean;
  disabled: boolean;
}

export interface RadioGroupOptionProps<T = unknown>
  extends Omit<ComponentProps<'div'>, 'className'> {
  value: T;
  children: ReactNode | (({ checked }: { checked: boolean }) => ReactNode);
  className?: string | ((arg: RadioGroupOptionRenderPropArg) => string);
  icon?: ReactNode;
  disabled?: boolean;
}

export const RadioGroupOption = <T extends unknown = unknown>({
  value,
  disabled,
  className,
  children,
  icon,
  ...props
}: RadioGroupOptionProps<T>) => {
  return (
    <RadioGroup.Option
      value={value}
      disabled={disabled}
      className={({ active, checked, disabled }) =>
        twMerge(
          clsx(
            'relative flex w-full cursor-pointer select-none rounded-lg border-2 border-transparent px-3 py-2',
            'focus:outline-none',
            active && 'border-blue-700 ring-4 ring-blue-200',
            checked && 'border-blue-700 bg-blue-50/75',
            disabled ? 'cursor-auto opacity-60' : 'cursor-pointer opacity-100',
            typeof className === 'function'
              ? className({ active, checked, disabled })
              : className,
          ),
        )
      }
      {...props}
    >
      {({ checked }) => (
        <div className="flex w-full items-center justify-between space-x-4">
          <div className="flex w-full items-center">
            <div className="w-full text-sm">
              {typeof children === 'function'
                ? children({ checked })
                : children}
            </div>
          </div>
          {checked &&
            (icon ? (
              icon
            ) : (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="flex-shrink-0 text-blue-700"
                size="lg"
              />
            ))}
        </div>
      )}
    </RadioGroup.Option>
  );
};
