import { ComponentPropsWithRef, forwardRef, useState } from 'react';
import clsx from 'clsx';
import { SearchIcon } from '@spout/assets/icons/outline';
import { Button } from '@spout/toolkit';
import { useMediaQuery, MEDIA_QUERIES } from '../../../../shared/hooks';

type Props = ComponentPropsWithRef<'input'>;

const Search = forwardRef<HTMLInputElement, Props>(({ ...props }, ref) => {
  const [focused, setFocused] = useState(false);
  const isSmall = useMediaQuery(MEDIA_QUERIES.SMALL);

  return (
    <div className="relative flex w-full justify-end">
      {isSmall ? (
        <span className="absolute right-0 inset-y-0 flex items-center pr-4">
          <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          className="sm:ml-3"
          aria-label="Search"
        >
          <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      )}
      <input
        className={clsx(
          'hidden pr-12 pl-4 h-12 border-none outline-none tracking-wide rounded-2xl font-bold bg-gray-100 placeholder-semibold placeholder-black text-black text-sm items-center transition-all ease-in-out duration-300 sm:inline-flex focus:ring-2 focus:ring-black',
          focused ? 'w-full' : 'w-3/6',
        )}
        aria-hidden={!isSmall}
        aria-label="Search"
        onFocus={() => setFocused(true)}
        onBlur={(e) => !e.target.value && setFocused(false)}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Search;
