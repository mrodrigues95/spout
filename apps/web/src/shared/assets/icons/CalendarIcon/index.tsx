import { SVGProps } from 'react';

const CalendarIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.52 4H21.48C25.626 4 29 7.493 29 11.788v9.424C29 25.507 25.626 29 21.479 29c-.479 0-.867-.402-.867-.898 0-.495.388-.897.867-.897 3.191 0 5.788-2.688 5.788-5.993v-7.521h-4.269c-1.402.001-2.545 1.183-2.546 2.636.001 1.453 1.144 2.635 2.546 2.636h1.774c.478 0 .867.402.867.898 0 .495-.389.897-.867.897h-1.774c-2.358 0-4.278-1.988-4.279-4.43.001-2.443 1.92-4.431 4.279-4.432h4.269v-.108c0-3.305-2.597-5.993-5.788-5.993H10.52c-2.572 0-4.73 1.757-5.483 4.163h11.424c.479 0 .867.402.867.898s-.389.897-.867.897H4.737l-.002.018-.002.017v9.424c0 3.305 2.596 5.993 5.787 5.993h5.514c.478 0 .866.402.866.898 0 .495-.388.897-.866.897H10.52C6.373 29 3 25.507 3 21.212v-9.424C3 7.493 6.373 4 10.52 4zm11.8 12.246c0-.495.387-.897.866-.897h.394c.478 0 .867.402.867.897 0 .496-.389.898-.867.898h-.394c-.479 0-.867-.402-.867-.898z"
      fill="currentColor"
    />
  </svg>
);

export default CalendarIcon;