import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from '../Link';

interface Props {
  href: string;
  icon: ReactElement;
  label: string;
}

const VerticalNavItem = ({ href, icon, label }: Props) => {
  const router = useRouter();
  const selected = router.pathname === href;

  return (
    <Link
      href={href}
      active={selected}
      fullWidth
      aria-labelledby="verticalNavItemLabel"
    >
      <span className="mx-auto xl:mx-0">{icon}</span>
      <span id="verticalNavItemLabel" className="flex-1 hidden xl:inline-block">
        {label}
      </span>
    </Link>
  );
};

const VerticalNav = ({ children }: { children: ReactNode }) => {
  return <nav className="flex flex-col w-full space-y-3">{children}</nav>;
};

VerticalNav.Item = VerticalNavItem;

export default VerticalNav;
