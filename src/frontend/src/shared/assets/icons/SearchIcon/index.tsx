import { SVGProps } from 'react';

export const SearchIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      d="M19.756 18.607l-3.438-3.361-.08-.123a.806.806 0 00-1.137 0c-2.921 2.68-7.423 2.826-10.519.34C1.486 12.979.756 8.634 2.876 5.31 4.996 1.987 9.308.717 12.953 2.342c3.645 1.625 5.49 5.642 4.314 9.386a.78.78 0 00.182.771.821.821 0 00.774.232.803.803 0 00.593-.54c1.406-4.442-.718-9.223-5-11.25C9.534-1.085 4.381.251 1.69 4.085-1.003 7.92-.425 13.102 3.05 16.28c3.474 3.178 8.8 3.397 12.535.516l3.044 2.975a.819.819 0 001.137 0 .784.784 0 000-1.12l-.01-.043z"
      fill="#161616"
    />
  </svg>
);

export default SearchIcon;