import { SVGProps } from 'react';

const NotificationsIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={17}
    height={20}
    viewBox="0 0 17 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.326 9.262c.406.609.639 1.313.674 2.04l-.027.184a4.106 4.106 0 01-.94 2.74 4.895 4.895 0 01-3.123 1.532 40.862 40.862 0 01-8.872 0 4.84 4.84 0 01-3.07-1.532 4.046 4.046 0 01-.967-2.722v-.123c.049-.749.3-1.471.728-2.092l.07-.088c.445-.498.751-1.101.888-1.75V5.646a.764.764 0 01.793-.474.759.759 0 01.67.631v1.804a.45.45 0 010 .096 5.227 5.227 0 01-1.224 2.434 2.506 2.506 0 00-.39 1.243v.193c-.02.62.188 1.226.586 1.707.55.561 1.287.91 2.076.98 2.854.307 5.734.307 8.588 0a3.335 3.335 0 002.12-1.024c.378-.47.576-1.055.56-1.655v-.2a2.601 2.601 0 00-.382-1.253 5.23 5.23 0 01-1.296-2.434.456.456 0 010-.096V5.787c-.257-2.644-2.927-4.281-5.252-4.281a5.782 5.782 0 00-2.821.726.772.772 0 01-.777.006.75.75 0 01-.38-.668.752.752 0 01.412-.65A7.279 7.279 0 018.465 0c3.07 0 6.512 2.154 6.902 5.612v1.803c.134.651.44 1.255.888 1.751.026.03.05.062.07.096zm-7.527 9.169a2.016 2.016 0 001.32-.78h.01a.789.789 0 011.093-.102c.33.268.377.746.103 1.07A3.629 3.629 0 018.5 20a3.629 3.629 0 01-2.817-1.381.748.748 0 01.103-1.07.789.789 0 011.094.102 2.042 2.042 0 001.92.78z"
      fill="currentColor"
    />
  </svg>
);

export default NotificationsIcon;