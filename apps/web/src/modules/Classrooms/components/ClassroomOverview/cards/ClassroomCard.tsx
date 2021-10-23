import { ReactNode } from 'react';
import { ButtonOrLink, ButtonOrLinkProps } from '@spout/toolkit';
import clsx from 'clsx';
import { Card } from '../../../../../shared/components';

interface ClassroomBaseCardProps {
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
}

const ClassroomCardHeader = ({
  title,
  description,
}: ClassroomBaseCardProps) => {
  return (
    <>
      <h2 className="font-semibold text-lg text-gray-900">{title}</h2>
      <p className="font-medium text-gray-500">{description}</p>
    </>
  );
};

interface ClassroomActionCardProps
  extends ClassroomBaseCardProps,
    Omit<ButtonOrLinkProps, 'title'> {}

export const ClassroomActionCard = ({
  title,
  description,
  children,
  className,
  ...props
}: ClassroomActionCardProps) => {
  return (
    <Card
      as={ButtonOrLink}
      variant="unstyled"
      className={clsx(
        'bg-white select-none transition duration-150 ease-in-out hover:transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900',
        className
      )}
      {...props}
    >
      <ClassroomCardHeader title={title} description={description} />
      {children}
    </Card>
  );
};

interface ClassroomContentCardProps extends ClassroomBaseCardProps {}

export const ClassroomContentCard = ({
  title,
  description,
  children,
  ...props
}: ClassroomContentCardProps) => {
  return (
    <Card as="article" {...props}>
      <ClassroomCardHeader title={title} description={description} />
      {children}
    </Card>
  );
};
