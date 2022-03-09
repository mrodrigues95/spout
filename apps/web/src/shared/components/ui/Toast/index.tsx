import { useCallback } from 'react';
import toast from 'react-hot-toast';

const useToast = () => {
  const handleError = useCallback(() => {
    toast.error('Something went wrong. Please try again.');
  }, []);

  return { handleError, toast };
};

export default useToast;
