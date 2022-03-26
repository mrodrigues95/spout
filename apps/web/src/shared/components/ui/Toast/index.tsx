import { useCallback } from 'react';
import toast from 'react-hot-toast';

const useToast = () => {
  const handleError = useCallback((error?: Error | string) => {
    const message = error instanceof Error ? error.message : error;
    toast.error(message ?? 'Something went wrong. Please try again.');
  }, []);

  return { handleError, toast };
};

export default useToast;
