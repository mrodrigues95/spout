import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useRef,
  useState,
  useEffect,
} from 'react';
import { usePopper } from '@spout/shared/utils';
import { Portal } from '@headlessui/react';
import { Placement } from '@popperjs/core';
import { AnimatePresence, motion, Variants } from 'framer-motion';

export interface TooltipProps {
  label: string;
  children: ReactNode | ReactElement;
  placement?: Placement;
  delay?: number;
}

export const Tooltip = ({
  label,
  children,
  placement = 'top',
  delay = 0,
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
    timeoutRef.current = window.setTimeout(
      () => setIsShowing(true),
      delay || 0
    );
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setIsShowing(false);
  };

  const withProps = {
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    ref: trigger,
    'aria-describedby': isShowing ? 'spout-tooltip' : undefined,
  };

  // Check if `children` is a valid ReactElement before cloning.
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
              <motion.p
                id="spout-tooltip"
                role="tooltip"
                className="flex items-center justify-center px-2 py-1 tracking-wider font-semibold whitespace-nowrap bg-black text-white text-xs rounded-md"
                variants={variants}
                initial="exit"
                animate="enter"
                exit="exit"
              >
                {label}
              </motion.p>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};