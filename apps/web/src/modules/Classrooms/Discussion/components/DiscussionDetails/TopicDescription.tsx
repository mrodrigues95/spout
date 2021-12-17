import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Button as SButton, generateId, Text, Tooltip } from '@spout/toolkit';

type Content = string | null;

interface ButtonProps {
  label: 'Topic' | 'Description';
  content?: Content;
}

// TODO: Make an orange "Edit" button when topic/description is null.
const Button = ({ label, content }: ButtonProps) => {
  const labelId = `spout-details-label-${generateId()}`;
  const descId = `spout-details-desc-${generateId()}`;

  const button = (
    <SButton
      className="relative w-full flex items-center justify-between space-x-4"
      variant="unstyled"
      aria-labelledby={labelId}
      aria-describedby={descId}
    >
      <div className="inline-flex items-center space-x-2">
        <FontAwesomeIcon
          icon={label === 'Topic' ? faCommentAlt : faPencilAlt}
          className="text-gray-500"
        />
        <Text
          id={labelId}
          color="muted"
          size="xs"
          weight="medium"
          casing="uppercase"
        >
          {label}
        </Text>
      </div>
      <Text id={descId} className="text-gray-900" weight="medium" truncate>
        {content ?? <i className="text-gray-500 text-sm">Edit...</i>}
      </Text>
    </SButton>
  );

  return (
    <>
      {content ? (
        <Tooltip
          label={content}
          placement="left-start"
          className="block max-w-[40rem] max-h-[40rem] p-2 rounded-md shadow-md bg-white ring-1 ring-gray-900/5 whitespace-pre-line"
          unstyled
        >
          {button}
        </Tooltip>
      ) : (
        button
      )}
    </>
  );
};

interface Props {
  topic?: Content;
  description?: Content;
}

const TopicDescription = ({ topic, description }: Props) => {
  return (
    <div>
      <Button label="Topic" content={topic} />
      <Button label="Description" content={description} />
    </div>
  );
};

export default TopicDescription;
