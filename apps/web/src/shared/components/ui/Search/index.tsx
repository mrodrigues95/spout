import { ComponentPropsWithRef, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@spout/toolkit';
import { useMediaQuery, MEDIA_QUERIES } from '../../../../shared/hooks';

type Props = ComponentPropsWithRef<'input'>;

const Search = forwardRef<HTMLInputElement, Props>(({ ...props }, ref) => {
  const isSmall = useMediaQuery(MEDIA_QUERIES.SMALL);

  return (
    <div className="relative flex w-full justify-end">
      {isSmall ? (
        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
          <FontAwesomeIcon
            icon={faSearch}
            className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5"
          />
        </span>
      ) : (
        <Button size="sm" className="sm:ml-3" aria-label="Search">
          <FontAwesomeIcon
            icon={faSearch}
            className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5"
          />
        </Button>
      )}
      <input
        className="outline-none placeholder-medium hidden h-12 w-full items-center rounded-2xl border-none bg-gray-100 pr-12 pl-4 text-sm font-bold tracking-wide text-black placeholder-gray-400 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-gray-900 sm:inline-flex"
        aria-hidden={!isSmall}
        aria-label="Search"
        ref={ref}
        {...props}
      />
    </div>
  );
});

Search.displayName = 'Search';

export default Search;
