import { ReactElement } from 'react';
import { SparklesIcon } from '~/shared/assets/icons';
import Button from '../Button';

interface Props {
  action(): void;
  message?: string;
  icon?: ReactElement;
}

const ErrorFallback = ({ action, icon, message }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 my-12">
      {icon ? icon : <SparklesIcon className="h-12 w-12 text-gray-500" />}
      <p className="font-bold text-gray-500">
        {message ? message : 'Something went wrong.'}
      </p>
      <Button className="text-sm" rounded="md" active onClick={action}>
        Try again
      </Button>
    </div>
  );
};

export default ErrorFallback;
