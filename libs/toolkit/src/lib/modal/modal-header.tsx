import { useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@spout/shared/assets';
import clsx from 'clsx';
import { ModalContext } from './modal';
import { Button } from '../button';

interface HeaderProps {
  className?: string;
}

interface ModalHeaderProps {
  title: string;
  titleProps?: HeaderProps;
  description: string;
  descriptionProps?: HeaderProps;
  dismiss?: boolean;
}

export const ModalHeader = ({
  title,
  titleProps,
  description,
  descriptionProps,
  dismiss = false,
}: ModalHeaderProps) => {
  const { onClose } = useContext(ModalContext)!;
  if (!onClose) throw new Error('`ModalHeader` must be used within `Modal`');

  return (
    <header className="flex items-center justify-center space-x-8">
      <div className="flex-1 min-w-0">
        <Dialog.Title
          as="h3"
          className={clsx(
            'text-lg uppercase font-bold truncate',
            titleProps?.className
          )}
        >
          {title}
        </Dialog.Title>
        <Dialog.Description
          as="h4"
          className={clsx(
            'font-semibold text-sm text-gray-500',
            descriptionProps?.className
          )}
        >
          {description}
        </Dialog.Description>
      </div>
      {dismiss && (
        <Button
          scheme="dark"
          className="mb-auto -mt-1 !p-2"
          aria-label="Close modal"
          onClick={onClose}
        >
          <XIcon className="w-5 h-5 text-black" />
        </Button>
      )}
    </header>
  );
};
