import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Button as SButton, generateId, Text, Tooltip } from '@spout/toolkit';

interface ButtonProps {
  label: 'Topic' | 'Description';
  content: string;
}

const Button = ({ label, content }: ButtonProps) => {
  const labelId = `spout-details-label-${generateId()}`;
  const descId = `spout-details-desc-${generateId()}`;

  return (
    <Tooltip
      label={content}
      placement="left-start"
      className="block max-w-[40rem] max-h-[40rem] p-2 rounded-md shadow-md bg-white ring-1 ring-gray-900/5 whitespace-pre-line"
      unstyled
    >
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
          {content}
        </Text>
      </SButton>
    </Tooltip>
  );
};

const TopicDescription = () => {
  return (
    <div>
      <Button
        label="Topic"
        content="This is a example This is a example
        This is a example This is a example This is a example This is a example This is a example This is a example This is a example This is a example
        This is a example This is a example This is a example This is a example This is a example This is a example This is a example This is a example
        This is a example This is a example This is a example This is a example This is a example This is a example This is a example This is a example"
      />
      <Button label="Description" content="This is an example" />
    </div>
  );
};

export default TopicDescription;
