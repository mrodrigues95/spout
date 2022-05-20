import { ComponentProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { TimelineSeparator } from './timeline-separator';
import { TimelineItem } from './timeline-item';
import { TimelineContent } from './timeline-content';
import { TimelineDot } from './timeline-dot';
import { TimelineConnector } from './timeline-connector';

export interface TimelineProps extends ComponentProps<'ul'> {}

const TimelineRoot = forwardRef<HTMLUListElement, TimelineProps>(
  ({ className, ...props }, ref) => {
    return (
      <ul
        className={twMerge(clsx('flex flex-1 flex-col', className))}
        ref={ref}
        {...props}
      />
    );
  },
);

export const Timeline = Object.assign(TimelineRoot, {
  Separator: TimelineSeparator,
  Dot: TimelineDot,
  Connector: TimelineConnector,
  Item: TimelineItem,
  Content: TimelineContent,
});
