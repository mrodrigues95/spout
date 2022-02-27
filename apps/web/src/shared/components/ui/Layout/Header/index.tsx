import { ComponentProps } from 'react';
import { MobileSidebar } from '../Sidebar';

interface Props extends ComponentProps<'div'> {}

const Header = ({ children, ...props }: Props) => {
  return (
    <header className="mb-3 flex items-center" {...props}>
      <MobileSidebar />
      {children}
    </header>
  );
};

export default Header;
