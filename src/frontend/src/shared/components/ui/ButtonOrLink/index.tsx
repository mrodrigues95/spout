import { ComponentProps } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { buttonOrLinkVariants as variants } from '../utils/variants';

interface Styles {
  ignoreStyles?: boolean;
  variant?: keyof typeof variants;
  active?: boolean;
  fullWidth?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
}

type ButtonOrLinkProps = ComponentProps<'button'> &
  ComponentProps<'a'> &
  Styles;

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
            router.query.redirect as string
          )}`
        : href!;

    return <Link href={finalHref}>{content}</Link>;
  }

  return content;
};

export default ButtonOrLink;
