import { ReactNode } from 'react';

const MenuHeader = ({ children }: { children: ReactNode }) => {
  return (
    <p
      id="spout-popover-header"
      className="p-2 uppercase text-gray-500 font-bold text-xs tracking-wide truncate"
    >
      {children}
    </p>
  );
};

export default MenuHeader;
