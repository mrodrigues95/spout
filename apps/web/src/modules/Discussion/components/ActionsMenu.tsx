import {
  AttachmentsIcon,
  SettingsIcon,
  CalendarIcon,
} from '@spout/assets/icons/outline';
import { Tooltip, Button } from '@spout/toolkit';

const ActionsMenu = () => {
  return (
    <div className="hidden sm:block">
      <div className="flex items-center">
        <Tooltip label="Calendar">
          <Button variant="ghost" size="sm">
            <CalendarIcon className="h-6 w-6" />
          </Button>
        </Tooltip>
        <Tooltip label="Attachments">
          <Button variant="ghost" size="sm">
            <AttachmentsIcon className="h-6 w-6" />
          </Button>
        </Tooltip>
        <Tooltip label="Settings">
          <Button variant="ghost" rounded="lg" size="sm">
            <SettingsIcon className="h-6 w-6" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ActionsMenu;
