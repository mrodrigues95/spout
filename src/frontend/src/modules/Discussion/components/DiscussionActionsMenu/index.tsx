import { AttachmentsIcon, CalendarIcon, SettingsIcon } from '~/shared/assets';
import { Button } from '~/shared/components';

const ActionsMenu = () => {
  return (
    <div className="hidden sm:block">
      <div className="flex items-center space-x-2">
        <Button className="px-2 py-2" aria-label="View calendar">
          <CalendarIcon className="h-8 w-8" />
        </Button>
        <Button className="px-2 py-2" aria-label="View attachments">
          <AttachmentsIcon className="h-8 w-8" />
        </Button>
        <Button className="px-2 py-2" aria-label="View settings">
          <SettingsIcon className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default ActionsMenu;
