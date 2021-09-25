import clsx from 'clsx';
import ButtonOrLink, { Props as ButtonOrLinkProps } from '../../../../ButtonOrLink';
import { menuVariants } from '..';

interface MenuItemProps extends Omit<ButtonOrLinkProps, 'variant'> {
  variant: keyof typeof menuVariants;
}

const MenuItem = ({ variant, ...props }: MenuItemProps) => {
  const styles = menuVariants[variant];

  const Item = ButtonOrLink;
  return (
    <Item
      className={clsx(
        'block w-full rounded-md p-2 text-left font-bold tracking-wide text-sm truncate focus:outline-none focus-visible:ring',
        styles.base,
        styles.active
      )}
      {...props}
    />
  );
};

export default MenuItem;
