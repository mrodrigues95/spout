import { Title } from '@spout/toolkit';
import { graphql, useFragment } from 'react-relay';
import SyllabusAttachment from './SyllabusAttachment';
import { SyllabusAttachments_classroomSyllabus$key } from './__generated__/SyllabusAttachments_classroomSyllabus.graphql';

const fragment = graphql`
  fragment SyllabusAttachments_classroomSyllabus on ClassroomSyllabus {
    attachments {
      id
      ...SyllabusAttachment_file
    }
  }
`;

interface Props {
  syllabus: SyllabusAttachments_classroomSyllabus$key;
}

const SyllabusAttachments = ({ ...props }: Props) => {
  const syllabus = useFragment(fragment, props.syllabus);

  if (!syllabus.attachments.length) return null;

  return (
    <>
      <Title as="h3" variant="h4">
        Attachments
      </Title>
      <ul role="list" className="space-y-2.5">
        {syllabus.attachments.map((attachment) => (
          <SyllabusAttachment key={attachment.id} attachment={attachment} />
        ))}
      </ul>
    </>
  );
};

export default SyllabusAttachments;
