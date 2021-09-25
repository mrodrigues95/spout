import { ReactElement } from 'react';
import { SparklesIcon } from '@spout/shared/assets';

interface Props {
  message?: string;
  submessage?: string;
  icon?: ReactElement;
}

const EmptyFallback = ({ icon, message, submessage }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-2">
      {icon ? icon : <SparklesIcon className="h-12 w-12 text-black" />}
      <p className="font-bold text-black">
        {message ? message : "There's nothing here, yet."}
      </p>
      {submessage && <p className="font-bold text-black text-sm">{submessage}</p>}
    </div>
  );
};

export default EmptyFallback;
