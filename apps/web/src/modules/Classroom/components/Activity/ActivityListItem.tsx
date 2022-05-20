import { graphql, useFragment } from 'react-relay';
import { Timeline } from '@spout/toolkit';
import { TimelineContent, TimelineDot } from './Timeline';
import { ActivityListItemProvider } from './ActivityListItemProvider';
import { ActivityListItem_classroomTimelineEvent$key } from './__generated__/ActivityListItem_classroomTimelineEvent.graphql';

const fragment = graphql`
  fragment ActivityListItem_classroomTimelineEvent on ClassroomTimelineEvent {
    event
    createdAt
    triggeredBy {
      name
      avatarUrl
      profileColor
    }
    classroom {
      id
      name
    }
    discussion {
      id
      name
    }
    syllabus {
      content
    }
    announcement {
      content
    }
  }
`;

interface ReminderProps {
  timelineEvent: ActivityListItem_classroomTimelineEvent$key;
  isLastItem?: boolean;
}

const ActivityListItem = ({ isLastItem = false, ...props }: ReminderProps) => {
  const eventItem = useFragment(fragment, props.timelineEvent);

  // TODO: Move this to fragments instead of a provider.
  return (
    <ActivityListItemProvider item={eventItem}>
      <Timeline.Separator>
        <TimelineDot />
        {!isLastItem && <Timeline.Connector />}
      </Timeline.Separator>
      <TimelineContent />
    </ActivityListItemProvider>
  );
};

export default ActivityListItem;
