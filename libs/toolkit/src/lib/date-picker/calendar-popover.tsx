import { ReactNode, useRef } from 'react';
import { FocusScope } from '@react-aria/focus';
import { useDialog } from '@react-aria/dialog';
import { useOverlay, useModal, DismissButton } from '@react-aria/overlays';
import { AriaDialogProps } from '@react-types/dialog';
import { mergeProps } from '@react-aria/utils';

export interface CalendarPopoverProps extends AriaDialogProps {
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const CalendarPopover = ({
  isOpen = false,
  onClose,
  children,
  ...props
}: CalendarPopoverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: true,
    },
    ref,
  );

  const { modalProps } = useModal();
  const { dialogProps } = useDialog(props, ref);

  // Add a hidden <DismissButton> component at the end of the popover
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope contain restoreFocus>
      <div
        {...mergeProps(overlayProps, modalProps, dialogProps)}
        ref={ref}
        className="absolute top-full z-10 mt-2 rounded-md border border-gray-300 bg-white p-8 shadow-lg"
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  );
};
