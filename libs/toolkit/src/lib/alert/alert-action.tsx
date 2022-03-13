import clsx from 'clsx';
import { Button, ButtonOrLinkProps } from '../button';
import { useAlert } from './alert-provider';

interface Props extends ButtonOrLinkProps {}

export const AlertAction = ({ className, ...props }: Props) => {
  const { variant } = useAlert();

  return (
    <Button
      {...props}
      size="sm"
      className={clsx(variant.action, '!mt-4', className)}
    />
  );
};
