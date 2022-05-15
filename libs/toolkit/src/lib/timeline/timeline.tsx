import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { TimelineSeparator } from './timeline-separator';
import { TimelineItem } from './timeline-item';
import { TimelineContent } from './timeline-content';
import { TimelineDot } from './timeline-dot';
import { TimelineConnector } from './timeline-connector';

export interface TimelineProps extends ComponentProps<'ul'> {}

export const Timeline = ({ className, ...props }: TimelineProps) => {
  return (
    <ul
      className={twMerge(clsx('flex flex-1 flex-col', className))}
      {...props}
    />
  );
};

Timeline.Separator = TimelineSeparator;
Timeline.Dot = TimelineDot;
Timeline.Connector = TimelineConnector;
Timeline.Item = TimelineItem;
Timeline.Content = TimelineContent;
