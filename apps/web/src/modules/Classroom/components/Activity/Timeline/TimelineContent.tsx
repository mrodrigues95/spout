import { Timeline } from '@spout/toolkit';
import TimelineUserJoinedClassroomContent from './TimelineUserJoinedClassroomContent';
import TimelineClassroomCreatedContent from './TimelineClassroomCreatedContent';
import TimelineDiscussionCreatedContent from './TimelineDiscussionCreatedContent';
import TimelineSyllabusUpsertContent from './TimelineSyllabusUpsertContent';
import TimelineAnnouncementUpsertContent from './TimelineAnnouncementUpsertContent';
import TimelineReminderCreatedContent from './TimelineReminderCreatedContent';

const TimelineContent = () => {
  return (
    <Timeline.Content className="pr-0 sm:py-1.5">
      <TimelineUserJoinedClassroomContent />
      <TimelineClassroomCreatedContent />
      <TimelineDiscussionCreatedContent />
      <TimelineSyllabusUpsertContent />
      <TimelineAnnouncementUpsertContent />
      <TimelineReminderCreatedContent />
    </Timeline.Content>
  );
};

export default TimelineContent;
