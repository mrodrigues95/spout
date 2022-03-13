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
  description?: string;
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
    <header className="flex items-center justify-center space-x-4 px-6 py-4">
      <div className="min-w-0 flex-1">
        <Dialog.Title
          as="h3"
          className={clsx(
            'truncate text-lg font-semibold uppercase text-gray-900',
            titleProps?.className,
          )}
        >
          {title}
        </Dialog.Title>
        {description && (
          <Dialog.Description
            as="h4"
            className={clsx(' text-gray-700', descriptionProps?.className)}
          >
            {description}
          </Dialog.Description>
        )}
      </div>
      {dismiss && (
        <IconButton
          className="mb-auto rounded-md py-1.5 px-2"
          aria-label="Close modal"
          variant="tertiary"
          onClick={onClose}
          size="sm"
          icon={<FontAwesomeIcon icon={faTimes} />}
        />
      )}
    </header>
  );
};
