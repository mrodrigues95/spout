import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

const VARIANTS = {
  info: {
    container: 'bg-sky-50',
    title: 'text-sky-800',
    description: 'text-sky-700',
    icon: <FontAwesomeIcon icon={faCircleInfo} className="text-sky-400" />,
  },
  success: {
    container: 'bg-green-50',
    title: 'text-green-800',
    description: 'text-green-700',
    icon: <FontAwesomeIcon icon={faCircleCheck} className="text-green-400" />,
  },
  warning: {
    container: 'bg-amber-50',
    title: 'text-amber-800',
    description: 'text-amber-700',
    icon: <FontAwesomeIcon icon={faWarning} className="text-amber-400" />,
  },
  error: {
    container: 'bg-red-50',
    title: 'text-red-800',
    description: 'text-red-700',
    icon: <FontAwesomeIcon icon={faCircleXmark} className="text-red-400" />,
  },
} as const;

export interface AlertProps {
  severity: keyof typeof VARIANTS;
  title: string;
  description: string;
}

export const Alert = ({ severity, title, description }: AlertProps) => {
  const variant = VARIANTS[severity];

  return (
    <div
      className={clsx(
        'relative flex items-start space-x-3 rounded-lg p-4',
        variant.container,
      )}
      role="alert"
    >
      <span>{variant.icon}</span>
      <div className="flex-1 space-y-1 break-words">
        <div className={clsx('font-medium', variant.title)}>{title}</div>
        <p className={clsx('text-sm', variant.description)}>{description}</p>
      </div>
    </div>
  );
};
