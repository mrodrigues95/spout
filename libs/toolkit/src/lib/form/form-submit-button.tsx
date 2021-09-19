import { useFormContext } from 'react-hook-form';
import { Button, Props as ButtonProps } from '../button';
import { Spinner } from '../spinner';

export const FormSubmitButton = ({
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const { formState } = useFormContext();

  return (
    <Button
      type="submit"
      disabled={formState.isSubmitting || disabled}
      {...props}
    >
      {formState.isSubmitting && <Spinner size="xs" scheme="white" />}
      {children}
    </Button>
  );
};
