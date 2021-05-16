import clsx from 'clsx';
import ButtonOrLink, { Props as ButtonOrLinkProps } from '../ButtonOrLink';
import { buttonOrLinkVariants as variants } from '../utils/variants';

const Link = ({
  ignoreStyles = false,
  variant = 'default',
  active = false,
  fullWidth = false,
  rounded = '2xl',
  className,
  ...props
}: ButtonOrLinkProps) => {
  const styles = variants[variant] || variants.default;

  if (ignoreStyles) return <ButtonOrLink className={className} {...props} />;

  return (
    <ButtonOrLink
      className={clsx(
        styles.base,
        active ? styles.active : styles.inactive,
        `rounded-${rounded}`,
        fullWidth && 'w-full',
        className
      )}
      {...props}
    />
  );
};

export default Link;
