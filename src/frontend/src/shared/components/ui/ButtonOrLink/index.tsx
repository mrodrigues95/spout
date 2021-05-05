import { ComponentProps } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type ButtonOrLinkProps = ComponentProps<'button'> & ComponentProps<'a'>;

export interface Props extends ButtonOrLinkProps {
  preserveRedirect?: boolean;
}

const ButtonOrLink = ({ href, preserveRedirect, ...props }: Props) => {
  const router = useRouter();
  const isLink = typeof href !== 'undefined';
  const ButtonOrLink = isLink ? 'a' : 'button';

  const content = <ButtonOrLink {...props} />;

  if (isLink) {
    const finalHref =
      preserveRedirect && router.query.redirect
        ? `${href!}?redirect=${encodeURIComponent(
            router.query.redirect as string,
          )}`
        : href!;

    return <Link href={finalHref}>{content}</Link>;
  }

  return content;
};

export default ButtonOrLink;
