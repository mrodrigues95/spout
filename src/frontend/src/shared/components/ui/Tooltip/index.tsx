import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { Portal } from '@headlessui/react';
import { Placement } from '@popperjs/core';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import usePopper from '~/shared/hooks/usePopper';

interface Props {
  label: string;
  children: ReactNode | ReactElement;
  placement?: Placement;
  delay?: number;
}

const Tooltip = ({ label, children, placement, delay }: Props) => {
  const [isShowing, setIsShowing] = useState(false);
  const [trigger, container] = usePopper({
    placement: placement || 'top',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });

  let timeout: NodeJS.Timeout;
  const showTooltip = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setIsShowing(true), delay || 0);
  };

  const hideTooltip = () => {
    clearTimeout(timeout);
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

  const variants: Variants = {
    exit: {
      opacity: 0,
      transition: {
        opacity: { duration: 0.15, easings: 'easeInOut' },
      },
    },
    enter: {
      opacity: 1,
      transition: {
        opacity: { easings: 'easeOut', duration: 0.15 },
      },
    },
  };

  return (
    <>
      {childrenWithTriggerProps}
      <AnimatePresence>
        {isShowing && (
          <Portal>
            <motion.div
              id="spout-tooltip"
              role="tooltip"
              className="flex items-center justify-center px-2 py-1 tracking-wider font-semibold whitespace-nowrap bg-black text-white text-xs rounded-md"
              ref={container}
              variants={variants}
              initial="exit"
              animate="enter"
              exit="exit"
            >
              {label}
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tooltip;