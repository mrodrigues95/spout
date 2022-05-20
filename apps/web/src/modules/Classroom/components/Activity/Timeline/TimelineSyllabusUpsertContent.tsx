import { ContentEditable, Editor } from '../../Editor';
import { useActivityListItem } from '../ActivityListItemProvider';
import {
  TimelineHeader,
  TimelineHeaderDate,
  TimelineHeaderText,
} from './TimelineHeader';
import { logNullEntityError } from './utils';

const TimelineSyllabusUpsertContent = () => {
  const { item } = useActivityListItem()!;

  if (item.event !== 'SYLLABUS_CREATED' && item.event !== 'SYLLABUS_UPDATED') {
    return null;
  }

  if (!item.syllabus) {
    logNullEntityError(item.event);
    return null;
  }

  return (
    <>
      <TimelineHeader className="pb-3">
        <TimelineHeaderText variant="primary">
          {item.triggeredBy.name}{' '}
        </TimelineHeaderText>
        <TimelineHeaderText variant="secondary">
          {item.event === 'SYLLABUS_CREATED'
            ? 'added a classroom syllabus'
            : 'updated the classroom syllabus'}
        </TimelineHeaderText>
        <TimelineHeaderDate />
      </TimelineHeader>
      {/* TODO: Implement a 'See More' button for long content. */}
      <div className="pb-4">
        <Editor
          initialStringifiedEditorState={item.syllabus.content}
          contentEditable={<ContentEditable className="px-2 py-1" />}
          readOnly
        />
      </div>
    </>
  );
};

export default TimelineSyllabusUpsertContent;
