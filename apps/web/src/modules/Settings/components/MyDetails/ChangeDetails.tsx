import { Button, Text } from '@spout/toolkit';
import { Card } from '../../../../shared/components';

const ChangeDetails = () => {
  return (
    <Card className="shadow-container flex-1 mr-4 space-y-4">
      <div className="flex justify-between">
        <div>
          <Text as="span" variant="subtitle">
            Name
          </Text>
          <Text color="muted" weight="medium">
            John Doe
          </Text>
        </div>
        <Button size="sm">Edit</Button>
      </div>
      <div className="flex justify-between">
        <div>
          <Text as="span" variant="subtitle">
            Name
          </Text>
          <Text color="muted" weight="medium">
            John Doe
          </Text>
        </div>
        <Button size="sm">Edit</Button>
      </div>
      <div className="flex justify-between">
        <div>
          <Text as="span" variant="subtitle">
            Name
          </Text>
          <Text color="muted" weight="medium">
            John Doe
          </Text>
        </div>
        <Button size="sm">Edit</Button>
      </div>
    </Card>
  );
};

export default ChangeDetails;
