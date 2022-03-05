import clsx from 'clsx';

export const getBaseInputStyles = (hasError = false) =>
  clsx(
    'outline-none w-full border-transparent bg-gray-100 font-medium ring-offset-4 rounded-lg border-2 px-3 py-2 transition duration-150 ease-in-out',
    'placeholder-shown:font-normal',
    hasError
      ? 'focus:border-red-700 focus:ring-red-200 focus:ring-4'
      : 'focus:border-blue-700 focus:ring-blue-200 focus:ring-4',
  );
