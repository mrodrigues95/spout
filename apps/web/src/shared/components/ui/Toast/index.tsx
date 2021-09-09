import { useCallback } from 'react';
import toast from 'react-hot-toast';

const useToast = () => {
  const handleError = useCallback((error: any) => {
    toast.error('Something went wrong. Please try again.', {
      className: 'font-bold',
    });
  }, []);

  return { handleError };
};

export default useToast;
