import { ContentEditable, Editor } from '../../Editor';
import { useActivityListItem } from '../ActivityListItemProvider';
import {
  TimelineHeader,
  TimelineHeaderText,
  TimelineHeaderDate,
} from './TimelineHeader';

const TimelineAnnouncementUpsertContent = () => {
  const { item } = useActivityListItem()!;

  if (
    item.event !== 'ANNOUNCEMENT_CREATED' &&
    item.event !== 'ANNOUNCEMENT_UPDATED'
  ) {
    return null;
  }

  if (!item.announcement) {
    throw new Error('TODO');
  }

  return (
    <>
      <TimelineHeader className="pb-3">
        <TimelineHeaderText variant="primary">
          {item.triggeredBy.name}{' '}
        </TimelineHeaderText>
        <TimelineHeaderText variant="secondary">
          {item.event === 'ANNOUNCEMENT_CREATED'
            ? 'created a new announcement'
            : 'updated an announcement'}
        </TimelineHeaderText>
        <TimelineHeaderDate />
      </TimelineHeader>
      {/* TODO: Implement a 'See More' button for long content. */}
      <div className="pb-4">
        <Editor
          initialStringifiedEditorState={item.announcement.content}
          contentEditable={<ContentEditable className="px-2 py-1" />}
          readOnly
        />
      </div>
    </>
  );
};

export default TimelineAnnouncementUpsertContent;
