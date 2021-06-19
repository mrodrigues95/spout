import { LoadingIcon } from '~/shared/assets';
import clsx from 'clsx';
import VisuallyHidden from '../VisuallyHidden';

interface Props {
  className: string;
  label?: string;
}

const Spinner = ({ className, label = 'Loading...' }: Props) => {
  return (
    <div className="flex items-center justify-center" role="status">
      <LoadingIcon className={clsx('animate-spin', className)} />
      <VisuallyHidden>{label}</VisuallyHidden>
    </div>
  );
};

export default Spinner;
