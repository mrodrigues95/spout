import { Dialog } from '@headlessui/react';
import { useContext } from 'react';
import { ModalContext } from '..';

interface ModalHeaderProps {
  title: string;
  description?: string;
  dismiss?: boolean;
}

const ModalHeader = ({
  title,
  description,
  dismiss = false,
}: ModalHeaderProps) => {
  const { onClose } = useContext(ModalContext)!;
  if (!onClose) throw new Error('`ModalHeader` must be used within `Modal`');

  return (
    <>
      <Dialog.Title>{title}</Dialog.Title>
      {description && <Dialog.Description>{description}</Dialog.Description>}
      {dismiss && (
        <button type="button" onClick={onClose}>
          X
        </button>
      )}
    </>
  );
};

export default ModalHeader;
