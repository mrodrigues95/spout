import { ReactNode } from 'react';
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { AlertAction } from './alert-action';
import { AlertProvider } from './alert-provider';
import { ValueOf } from '../../types';

const VARIANTS = {
  info: {
    container: 'bg-sky-50',
    title: 'text-sky-800',
    description: 'text-sky-700',
    icon: <FontAwesomeIcon icon={faCircleInfo} className="text-sky-400" />,
    action:
      'text-sky-800 bg-sky-100 hover:bg-sky-200/75 hover:text-sky-900 active:text-sky-900 active:bg-sky-200 focus-visible:ring-sky-300',
  },
  success: {
    container: 'bg-green-50',
    title: 'text-green-800',
    description: 'text-green-700',
    icon: <FontAwesomeIcon icon={faCircleCheck} className="text-green-400" />,
    action:
      'text-green-800 bg-green-100 hover:bg-green-200/75 hover:text-green-900 active:text-green-800 active:bg-green-200 focus-visible:ring-green-300',
  },
  warning: {
    container: 'bg-amber-50',
    title: 'text-amber-800',
    description: 'text-amber-700',
    icon: <FontAwesomeIcon icon={faWarning} className="text-amber-400" />,
    action:
      'text-amber-800 bg-amber-100 hover:bg-amber-200/75 hover:text-amber-900 active:text-amber-800 active:bg-amber-200 focus-visible:ring-amber-300',
  },
  error: {
    container: 'bg-red-50',
    title: 'text-red-800',
    description: 'text-red-700',
    icon: <FontAwesomeIcon icon={faCircleXmark} className="text-red-400" />,
    action:
      'text-red-800 bg-red-100 hover:bg-red-200/75 hover:text-red-900 active:text-red-800 active:bg-red-200 focus-visible:ring-red-300',
  },
} as const;

export type AlertVariant = ValueOf<typeof VARIANTS>;

export interface AlertProps {
  severity: keyof typeof VARIANTS;
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export const Alert = ({
  severity,
  title,
  description,
  icon,
  children,
}: AlertProps) => {
  const variant = VARIANTS[severity];

  return (
    <AlertProvider variant={variant}>
      <div
        className={clsx(
          'relative flex items-start space-x-3 rounded-lg p-4',
          variant.container,
        )}
        role="alert"
      >
        <span>{icon || variant.icon}</span>
        <div className="flex-1 space-y-1 break-words">
          <div className={clsx('font-medium', variant.title)}>{title}</div>
          {description && (
            <p className={clsx('text-sm', variant.description)}>
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </AlertProvider>
  );
};

Alert.Action = AlertAction;
