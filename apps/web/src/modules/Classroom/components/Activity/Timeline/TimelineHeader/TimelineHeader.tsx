import { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';
import TimelineHeaderAvatar from './TimelineHeaderAvatar';

interface Props extends ComponentProps<'div'> {
  children: ReactNode;
}

const TimelineHeader = ({ className, children, ...props }: Props) => {
  return (
    <div className={clsx('flex items-center', className)} {...props}>
      <TimelineHeaderAvatar />
      <p>{children}</p>
    </div>
  );
};

export default TimelineHeader;
