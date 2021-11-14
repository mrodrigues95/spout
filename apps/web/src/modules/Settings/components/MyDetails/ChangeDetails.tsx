import { Card } from '../../../../shared/components';
import { Button } from '@spout/toolkit';

const ChangeDetails = () => {
  return (
    <Card className="shadow-container flex-1 mr-4 space-y-4">
      <div className="flex justify-between">
        <div>
          <span className="uppercase text-sm font-semibold text-gray-500">
            Name
          </span>
          <p className="font-medium text-gray-900">John Doe</p>
        </div>
        <Button size="sm">Edit</Button>
      </div>
      <div className="flex justify-between">
        <div>
          <span className="uppercase text-sm font-semibold text-gray-500">
            Name
          </span>
          <p className="font-medium text-gray-900">John Doe</p>
        </div>
        <Button size="sm">Edit</Button>
      </div>
      <div className="flex justify-between">
        <div>
          <span className="uppercase text-sm font-semibold text-gray-500">
            Name
          </span>
          <p className="font-medium text-gray-900">John Doe</p>
        </div>
        <Button size="sm">Edit</Button>
      </div>
    </Card>
  );
};

export default ChangeDetails;
