import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, ButtonOrLinkProps } from '../button';
import { Spinner } from '../spinner';

interface Props extends ButtonOrLinkProps {
  isSubmitting?: boolean;
}

export const FormSubmitButton = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  Props
>(({ children, disabled, isSubmitting = false, ...props }, ref) => {
  const { formState } = useFormContext();

  return (
    <Button
      type="submit"
      disabled={formState.isSubmitting || disabled}
      {...props}
      ref={ref}
    >
      {(formState.isSubmitting || isSubmitting) && (
        <Spinner size="xs" scheme="white" className="mr-2" />
      )}
      {children}
    </Button>
  );
});
