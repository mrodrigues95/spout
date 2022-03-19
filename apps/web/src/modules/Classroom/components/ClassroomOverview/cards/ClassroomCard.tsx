import { ReactNode, ReactElement } from 'react';
import { ButtonOrLink, ButtonOrLinkProps, Title, Text } from '@spout/toolkit';
import clsx from 'clsx';
import { Card } from '../../../../../shared/components';

interface ClassroomBaseCardProps {
  title: string;
  icon: ReactElement;
  description: string;
  className?: string;
  children?: ReactNode;
}

const ClassroomCardHeader = ({
  title,
  icon,
  description,
}: ClassroomBaseCardProps) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        {icon}
        <Title as="h2" variant="h4">
          {title}
        </Title>
      </div>
      <Text color="muted" weight="medium">
        {description}
      </Text>
    </>
  );
};

interface ClassroomActionCardProps
  extends ClassroomBaseCardProps,
    Omit<ButtonOrLinkProps, 'title'> {}

export const ClassroomActionCard = ({
  title,
  icon,
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
        'relative w-full select-none bg-white text-left transition duration-150 ease-in-out hover:-translate-y-0.5 hover:transform focus:outline-none focus:ring focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-white active:translate-y-0.5',
        className,
      )}
      {...props}
    >
      <ClassroomCardHeader
        title={title}
        icon={icon}
        description={description}
      />
      {children}
    </Card>
  );
};

interface ClassroomContentCardProps extends ClassroomBaseCardProps {}

export const ClassroomContentCard = ({
  title,
  icon,
  description,
  children,
  ...props
}: ClassroomContentCardProps) => {
  return (
    <Card as="article" {...props}>
      <ClassroomCardHeader
        title={title}
        icon={icon}
        description={description}
      />
      {children}
    </Card>
  );
};
