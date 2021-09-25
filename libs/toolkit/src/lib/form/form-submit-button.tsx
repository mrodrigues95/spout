import { useFormContext } from 'react-hook-form';
import { Button, ButtonOrLinkProps } from '../button';
import { Spinner } from '../spinner';

export const FormSubmitButton = ({
  children,
  disabled,
  ...props
}: ButtonOrLinkProps) => {
  const { formState } = useFormContext();

  return (
    <Button
      type="submit"
      disabled={formState.isSubmitting || disabled}
      {...props}
    >
      {formState.isSubmitting && (
        <Spinner size="xs" scheme="white" className="mr-2" />
      )}
      {children}
    </Button>
  );
};
