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
        <span className="absolute right-0 inset-y-0 flex items-center pr-4">
          <FontAwesomeIcon
            icon={faSearch}
            className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
          />
        </span>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          className="sm:ml-3"
          aria-label="Search"
        >
          <FontAwesomeIcon
            icon={faSearch}
            className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
          />
        </Button>
      )}
      <input
        className="hidden w-full pr-12 pl-4 h-12 border-none outline-none tracking-wide rounded-2xl font-bold bg-blueGray-100 placeholder-medium placeholder-gray-400 text-black text-sm items-center transition-all ease-in-out duration-300 sm:inline-flex focus:ring-2 focus:ring-gray-900"
        aria-hidden={!isSmall}
        aria-label="Search"
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Search;
