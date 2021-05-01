import ButtonOrLink, { Props as ButtonOrLinkProps } from '../ButtonOrLink';

interface Props extends ButtonOrLinkProps {
  className: string;
}

const Link = ({ className, ...props }: Props) => {
  return <ButtonOrLink className={className} {...props} />;
};

export default Link;
