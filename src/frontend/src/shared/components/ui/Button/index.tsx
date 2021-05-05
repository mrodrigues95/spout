import clsx from 'clsx';
import ButtonOrLink, { Props as ButtonOrLinkProps } from '../ButtonOrLink';

interface Props extends ButtonOrLinkProps {
  fullWidth?: boolean;
}

const Button = ({ fullWidth = true, ...props }: Props) => {
  return (
    <ButtonOrLink
      className={clsx(
        'flex items-center justify-center p-3 font-semibold tracking-wider border-none rounded-md bg-black text-white transition duration-200 ease-in-out disabled:opacity-60 disabled:pointer-events-none focus:outline-none focus:bg-opacity-80 hover:bg-opacity-80 active:bg-gray-800',
        fullWidth && 'w-full',
      )}
      {...props}
    />
  );
};

export default Button;
