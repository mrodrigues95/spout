import clsx from 'clsx';

const variants = {
  gray: 'bg-gray-500',
};

interface Props {
  variant?: keyof typeof variants;
  spaceY?: string;
  h?: string;
}

const Skeleton = ({
  variant = 'gray',
  spaceY = 'space-y-2',
  h = 'h-6',
}: Props) => {
  return (
    <div className={clsx('py-2 animate-pulse flex flex-col', spaceY)}>
      <div
        className={clsx('bg-opacity-25 rounded-lg w-1/2', h, variants[variant])}
      ></div>
      <div
        className={clsx('bg-opacity-25 rounded-lg w-2/3', h, variants[variant])}
      ></div>
      <div
        className={clsx('bg-opacity-25 rounded-lg w-5/6', h, variants[variant])}
      ></div>
    </div>
  );
};

export default Skeleton;
