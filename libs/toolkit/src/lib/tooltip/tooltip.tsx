import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { usePopper } from '@spout/utils';
import { Portal } from '@headlessui/react';
import { Placement } from '@popperjs/core';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { generateId } from '../../utils';
import clsx from 'clsx';

export interface TooltipProps {
  label: ReactNode;
  children: ReactNode | ReactElement;
  onOpen?: () => void;
  onClose?: () => void;
  placement?: Placement;
  delay?: number;
  className?: string;
  unstyled?: boolean;
}

export const Tooltip = ({
  label,
  children,
  className,
  onOpen,
  onClose,
  placement = 'top',
  delay = 0,
  unstyled = false,
}: TooltipProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const [trigger, container] = usePopper({
    placement: placement,
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });
  const timeoutRef = useRef(0);

  const showTooltip = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsShowing(true);
      if (onOpen) onOpen();
    }, delay || 0);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setIsShowing(false);
    if (onClose) onClose();
  };

  const id = useMemo(() => `spout-tooltip-${generateId()}`, []);

  const withProps = {
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    ref: trigger,
    'aria-describedby': isShowing ? id : undefined,
  };

  const childrenWithTriggerProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { ...withProps });
    }

    return <div {...withProps}>{child}</div>;
  });

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const variants: Variants = {
    exit: {
      scale: 0.85,
      opacity: 0,
      transition: {
        opacity: { duration: 0.15, easings: 'easeInOut' },
        scale: { duration: 0.2, easings: 'easeInOut' },
      },
    },
    enter: {
      scale: 1,
      opacity: 1,
      transition: {
        opacity: { easings: 'easeOut', duration: 0.1 },
        scale: { duration: 0.2, ease: [0.175, 0.885, 0.4, 1.1] },
      },
    },
  };

  return (
    <>
      {childrenWithTriggerProps}
      <AnimatePresence>
        {isShowing && (
          <Portal>
            <div ref={container}>
              <motion.span
                id={id}
                role="tooltip"
                className={clsx(
                  !unstyled &&
                    'flex items-center justify-center whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs font-semibold tracking-wider text-white',
                  className,
                )}
                variants={variants}
                initial="exit"
                animate="enter"
                exit="exit"
                tabIndex={0}
              >
                {label}
              </motion.span>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};
