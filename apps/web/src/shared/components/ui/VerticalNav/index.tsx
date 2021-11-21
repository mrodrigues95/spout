import { ComponentProps, ReactNode } from 'react';
import { Link } from '@spout/toolkit';
import clsx from 'clsx';
import { useIsCurrentRoute } from '../../../hooks';

interface VerticalNavGroupHeaderProps {
  title: string;
  actions?: ReactNode;
}

const VerticalNavGroupHeader = ({
  title,
  actions,
}: VerticalNavGroupHeaderProps) => {
  return (
    <div className="flex items-center px-4 space-x-4 mb-3">
      <span className="text-gray-500 text-xs font-semibold tracking-wide uppercase">
        {title}
      </span>
      {actions}
    </div>
  );
};

interface VerticalNavItemsProps extends ComponentProps<'ul'> {}

const VerticalNavItems = ({
  className,
  children,
  ...props
}: VerticalNavItemsProps) => {
  return (
    <ul className={clsx('space-y-2', className)} {...props}>
      {children}
    </ul>
  );
};

interface VerticalNavItemProps extends ComponentProps<'li'> {
  to?: string;
  label?: string;
  icon?: ReactNode;
  groupTitle?: string;
  groupActions?: ReactNode;
  isGroup?: boolean;
  routes?: string[];
}

const VerticalNavItem = ({
  to,
  label,
  icon,
  children,
  groupTitle,
  groupActions,
  isGroup = false,
  routes = [],
  ...props
}: VerticalNavItemProps) => {
  const selected = useIsCurrentRoute([to || '__', ...routes]);

  return (
    <li className={isGroup ? '!mt-8' : undefined} {...props}>
      {isGroup ? (
        <>
          <VerticalNavGroupHeader title={groupTitle!} actions={groupActions} />
          {children}
        </>
      ) : (
        <Link
          href={to!}
          variant={selected ? 'light' : 'ghost'}
          fullWidth
          size="sm"
          className="text-sm space-x-4"
        >
          {icon}
          <span className="flex-1 truncate min-w-0">{label}</span>
        </Link>
      )}
    </li>
  );
};

interface Props extends ComponentProps<'nav'> {}

const VerticalNav = ({ className, children, ...props }: Props) => {
  return (
    <nav className={clsx('space-y-6', className)} {...props}>
      {children}
    </nav>
  );
};

VerticalNav.Items = VerticalNavItems;
VerticalNav.Item = VerticalNavItem;

export default VerticalNav;
