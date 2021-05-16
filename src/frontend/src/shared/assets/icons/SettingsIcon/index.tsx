import { SVGProps } from 'react';

const SettingsIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
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
      d="M12.476 9.337a3.602 3.602 0 01-3.487-.023l-.047-.045a.975.975 0 01-.332-1.37c.301-.467.937-.61 1.42-.32.217.121.46.188.71.194.384.015.758-.117 1.04-.367.281-.25.448-.6.464-.969-.008-1.857 1.52-3.381 3.444-3.437h1.621c1.961 0 3.55 1.534 3.55 3.426-.002.24.063.477.19.685.189.32.502.555.871.652.37.097.763.047 1.094-.138 1.666-.876 3.75-.332 4.734 1.233a.997.997 0 01-.379 1.358 1.063 1.063 0 01-1.408-.353c-.401-.66-1.278-.884-1.965-.503a3.664 3.664 0 01-3.479-.037c-1.073-.597-1.746-1.69-1.776-2.886a1.355 1.355 0 00-.402-1.007c-.27-.269-.642-.42-1.03-.42h-1.621c-.39 0-.762.151-1.034.42-.272.268-.42.632-.41 1.007-.011 1.202-.685 2.307-1.768 2.9zm1.768 16.272c.006.765.651 1.381 1.444 1.381l-.012.023c.368 0 .708.19.892.497a.963.963 0 010 .993 1.037 1.037 0 01-.892.497c-1.96 0-3.55-1.534-3.55-3.426a1.279 1.279 0 00-.19-.685c-.397-.663-1.275-.892-1.965-.514-1.666.876-3.75.332-4.734-1.233l-.804-1.358c-.907-1.608-.344-3.62 1.278-4.568.215-.122.394-.295.52-.502.238-.32.323-.721.235-1.105a1.387 1.387 0 00-.696-.905c-1.622-.949-2.185-2.96-1.278-4.567.152-.22.388-.373.657-.425a1.06 1.06 0 01.775.15.96.96 0 01.296 1.325c-.392.662-.154 1.506.532 1.884.516.305.94.734 1.231 1.245.907 1.607.344 3.619-1.278 4.567-.686.379-.924 1.222-.533 1.884l.817 1.359c.186.324.5.56.871.655.371.095.766.04 1.094-.152a3.517 3.517 0 011.74-.446c1.96 0 3.55 1.534 3.55 3.426zm13.03-8.404a1.39 1.39 0 01-.669-.843 1.34 1.34 0 01.149-1.053c.126-.207.305-.38.52-.502a.974.974 0 00.355-1.359 1.075 1.075 0 00-1.396-.377c-1.622.949-2.185 2.96-1.278 4.568a3.36 3.36 0 001.29 1.358c.33.182.57.483.668.837.098.354.045.732-.148 1.047l-.804 1.36a1.474 1.474 0 01-.876.65 1.453 1.453 0 01-1.089-.148 3.663 3.663 0 00-3.484.04c-1.074.6-1.745 1.697-1.77 2.894.056.51.503.898 1.035.898.532 0 .979-.387 1.035-.898-.01-.499.263-.963.71-1.213a1.465 1.465 0 011.444.014c1.666.875 3.751.332 4.734-1.233l.805-1.359c.994-1.621.444-3.713-1.23-4.681zm-10.781-5.493c-1.801 0-3.425 1.048-4.113 2.653-.688 1.606-.305 3.454.97 4.68 1.275 1.228 3.191 1.592 4.854.924 1.662-.668 2.743-2.237 2.739-3.975 0-1.137-.47-2.228-1.305-3.032a4.523 4.523 0 00-3.145-1.25zm0 6.577c-1.308 0-2.367-1.022-2.367-2.283 0-1.262 1.06-2.284 2.367-2.284s2.367 1.022 2.367 2.284c0 1.261-1.06 2.283-2.367 2.283z"
      fill="#161616"
    />
  </svg>
);

export default SettingsIcon;
