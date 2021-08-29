import { AttachmentsIcon, CalendarIcon, SettingsIcon } from '~/shared/assets';
import { Tooltip, Button } from '~/shared/components';

const ActionsMenu = () => {
  return (
    <div className="hidden sm:block">
      <div className="flex items-center space-x-2">
        <Tooltip label="Calendar">
          <Button aria-label="View calendar" variant="ghost" scheme="light">
            <CalendarIcon className="h-8 w-8" />
          </Button>
        </Tooltip>
        <Tooltip label="Attachments">
          <Button aria-label="View attachments" variant="ghost" scheme="light">
            <AttachmentsIcon className="h-8 w-8" />
          </Button>
        </Tooltip>
        <Tooltip label="Settings">
          <Button
            aria-label="View settings"
            variant="ghost"
            rounded="lg"
            scheme="light"
          >
            <SettingsIcon className="h-8 w-8" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ActionsMenu;
