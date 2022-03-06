import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, ButtonOrLinkProps } from '../button';
import { Spinner } from '../spinner';

export const FormSubmitButton = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonOrLinkProps
>(({ children, loading = false, ...props }, ref) => {
  const { formState } = useFormContext();

  return (
    <Button
      type="submit"
      variant="primary"
      loading={formState.isSubmitting || loading}
      spinner={<Spinner size="sm" scheme="white" variant="circle" />}
      {...props}
      ref={ref}
    >
      {children}
    </Button>
  );
});
