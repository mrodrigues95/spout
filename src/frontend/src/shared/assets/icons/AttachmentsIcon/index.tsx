import { SVGProps } from 'react';

const AttachmentsIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.565 3h9.859C25.53 3 27.989 5.537 28 9.773v12.454C28 26.463 25.552 29 21.435 29h-3.65a.942.942 0 01-.822-.947c0-.486.354-.894.822-.947h3.639c3.138 0 4.718-1.642 4.718-4.879V9.773c0-3.237-1.58-4.879-4.718-4.879h-9.859c-3.138 0-4.729 1.642-4.729 4.879v12.454c0 3.238 1.591 4.879 4.73 4.879a.942.942 0 01.821.947.942.942 0 01-.822.947C7.46 29 5 26.463 5 22.227V9.773C5 5.525 7.46 3 11.565 3zm.323 8.449h3.505a.943.943 0 00.822-.947.943.943 0 00-.822-.947h-3.505a.943.943 0 00-.823.947c0 .485.355.893.823.947zm9.202 5.498h-9.213a.942.942 0 01-.823-.947c0-.486.355-.894.823-.947h9.213a.914.914 0 01.884.44.979.979 0 010 1.013.914.914 0 01-.884.441zm0 5.498h-9.213c-.504 0-.913-.421-.913-.94 0-.52.409-.942.913-.942h9.213c.504 0 .912.421.912.941s-.408.941-.912.941z"
      fill="#161616"
    />
  </svg>
);

export default AttachmentsIcon;
