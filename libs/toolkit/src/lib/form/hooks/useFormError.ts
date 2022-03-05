import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

type FormError = Record<string, any>;

export const useFormError = (name?: string) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error: FormError = useMemo(() => {
    if (!name) return null;

    return errors[name!];
  }, [name, errors]);

  return { hasError: !!error, error };
};
