import { useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { ModalContext } from './modal';
import { IconButton } from '../icon-button';

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
  dismiss = true,
}: ModalHeaderProps) => {
  const { onClose } = useContext(ModalContext)!;

  return (
    <header className="flex items-center justify-center px-6 py-4 space-x-8">
      <div className="flex-1 min-w-0">
        <Dialog.Title
          as="h3"
          className={clsx(
            'text-lg text-gray-900 uppercase font-semibold truncate',
            titleProps?.className
          )}
        >
          {title}
        </Dialog.Title>
        <Dialog.Description
          as="h4"
          className={clsx('text-gray-500 font-medium', descriptionProps?.className)}
        >
          {description}
        </Dialog.Description>
      </div>
      {dismiss && (
        <IconButton
          variant="ghost"
          className="mb-auto -mt-1 !p-2"
          aria-label="Close modal"
          onClick={onClose}
          icon={<FontAwesomeIcon icon={faTimes} />}
        />
      )}
    </header>
  );
};
