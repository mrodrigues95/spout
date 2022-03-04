import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonOrLinkProps } from '@spout/toolkit';
import clsx from 'clsx';

type Props = ButtonOrLinkProps;

const Search = forwardRef<HTMLButtonElement & HTMLAnchorElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <Button
          variant="unstyled"
          className={clsx(
            'outline-none relative flex w-full items-center rounded-lg border-2 border-gray-200/80 bg-gray-100/75 px-2 py-1.5 text-sm leading-6 text-gray-400',
            'hover:border-gray-300 focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-offset-white',
            className,
          )}
          {...props}
          ref={ref}
        >
          <FontAwesomeIcon icon={faSearch} className="mr-2.5" />
          Search...
          <span className="ml-auto flex-none rounded-lg bg-gray-200 p-1 text-xs font-semibold text-gray-500">
            CTRL K
          </span>
        </Button>
      </div>
    );
  },
);

Search.displayName = 'Search';

export default Search;
