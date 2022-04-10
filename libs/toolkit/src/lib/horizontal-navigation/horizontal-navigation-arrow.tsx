import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Button, ButtonOrLinkProps } from '../button';

interface HorizontalNavigationArrowProps extends ButtonOrLinkProps {
  isLeftArrow?: boolean;
}

export const HorizontalNavigationArrow = ({
  isLeftArrow = false,
  ...props
}: HorizontalNavigationArrowProps) => {
  return (
    <div
      className={clsx(
        'absolute z-10 flex h-full items-center',
        isLeftArrow ? 'left-0' : 'right-0',
      )}
    >
      {!isLeftArrow && (
        <div className="pointer-events-none h-full w-8 bg-gradient-to-l from-white"></div>
      )}
      <div className="flex h-full flex-1 items-center justify-center bg-white">
        <Button
          variant="unstyled"
          className={clsx(
            'relative inline-flex w-10 select-none items-center justify-center border-0 text-gray-500 outline-none',
            'transform transition duration-100 ease-out',
            'hover:scale-125 hover:text-gray-900',
          )}
          {...props}
        >
          <FontAwesomeIcon
            icon={isLeftArrow ? faChevronLeft : faChevronRight}
          />
        </Button>
      </div>
      {isLeftArrow && (
        <div className="pointer-events-none h-full w-8 bg-gradient-to-r from-white"></div>
      )}
    </div>
  );
};
