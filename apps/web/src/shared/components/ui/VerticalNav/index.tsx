import { ComponentProps, ReactElement, ReactNode } from 'react';
import { Link, Title } from '@spout/toolkit';
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
    <div className="mb-3 flex items-center space-x-4 px-4">
      <Title as="h5" className="text-xs uppercase tracking-wider text-gray-900">
        {title}
      </Title>
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
  icon?: ReactElement;
  groupTitle?: string;
  groupActions?: ReactNode;
  isGroup?: boolean;
  routes?: string[];
  className?: string;
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
  className,
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
          fullWidth
          size="sm"
          variant={selected ? 'default' : 'tertiary'}
          leftIcon={icon}
          className={clsx(
            'group',
            selected ? 'text-gray-900' : 'text-gray-600',
            className,
          )}
        >
          <span className="min-w-0 flex-1 truncate">{label}</span>
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
