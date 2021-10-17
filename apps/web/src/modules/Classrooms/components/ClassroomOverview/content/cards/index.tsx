import { ReactNode } from 'react';
import { ButtonOrLink, ButtonOrLinkProps } from '@spout/toolkit';
import clsx from 'clsx';
import { Card } from '../../../../../../shared/components';

const styles = {
  action: {
    inactive:
      'flex flex-col p-4 shadow-container rounded-md bg-white select-none transition duration-150 ease-in-out',
    active:
      'hover:transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900',
  },
};

interface BaseCardProps {
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
}

interface ActionCardProps
  extends BaseCardProps,
    Omit<ButtonOrLinkProps, 'title'> {}

const CardHeader = ({ title, description }: BaseCardProps) => {
  return (
    <>
      <h2 className="font-semibold text-lg text-gray-900">{title}</h2>
      <p className="font-medium text-gray-500">{description}</p>
    </>
  );
};

export const ActionCard = ({
  title,
  description,
  children,
  className,
  ...props
}: ActionCardProps) => {
  return (
    <ButtonOrLink
      variant="unstyled"
      className={clsx(styles.action.inactive, styles.action.active, className)}
      {...props}
    >
      <CardHeader title={title} description={description} />
      {children}
    </ButtonOrLink>
  );
};

interface ContentCardProps extends BaseCardProps {}

export const ContentCard = ({
  title,
  description,
  children,
  ...props
}: ContentCardProps) => {
  return (
    <Card as="article" {...props}>
      <CardHeader title={title} description={description} />
      {children}
    </Card>
  );
};
