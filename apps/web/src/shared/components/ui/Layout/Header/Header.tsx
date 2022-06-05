import clsx from 'clsx';
import { ComponentProps } from 'react';
import { MobileSidebar } from '../Sidebar';

interface Props extends ComponentProps<'div'> {}

const Header = ({ children, className, ...props }: Props) => {
  return (
    <header className={clsx('mb-4 flex items-center', className)} {...props}>
      <MobileSidebar />
      {children}
    </header>
  );
};

export default Header;
