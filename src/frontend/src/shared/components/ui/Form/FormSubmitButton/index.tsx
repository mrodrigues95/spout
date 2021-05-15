import { useFormContext } from 'react-hook-form';
import { LoadingIcon } from '~/shared/assets';
import Button, { ButtonProps } from '../../Button';

const FormSubmitButton = ({ children, ...props }: ButtonProps) => {
  const { formState } = useFormContext();

  return (
    <Button type="submit" disabled={formState.isSubmitting} {...props}>
      {formState.isSubmitting && (
        <LoadingIcon className="animate-spin h-3 w-3 mr-1 text-white" />
      )}
      {children}
    </Button>
  );
};

export default FormSubmitButton;
