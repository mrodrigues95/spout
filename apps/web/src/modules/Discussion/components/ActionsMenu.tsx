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
          <Button
            aria-label="View calendar"
            variant="ghost"
            scheme="gray"
            size="sm"
          >
            <CalendarIcon className="h-6 w-6" />
          </Button>
        </Tooltip>
        <Tooltip label="Attachments">
          <Button
            aria-label="View attachments"
            variant="ghost"
            scheme="gray"
            size="sm"
          >
            <AttachmentsIcon className="h-6 w-6" />
          </Button>
        </Tooltip>
        <Tooltip label="Settings">
          <Button
            aria-label="View settings"
            variant="ghost"
            rounded="lg"
            scheme="gray"
            size="sm"
          >
            <SettingsIcon className="h-6 w-6" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ActionsMenu;
