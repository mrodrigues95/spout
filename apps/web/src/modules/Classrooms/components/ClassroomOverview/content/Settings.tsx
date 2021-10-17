import { generateId } from '../../../../../shared/utils/generateId';
import { ActionCard } from './cards';

const Settings = () => {
  const labelId = `spout-classroom-settings-label-${generateId()}`;
  const descId = `spout-classroom-settings-desc-${generateId()}`;

  return (
    <ActionCard
      href="/profile"
      aria-labelledby={labelId}
      aria-describedby={descId}
      title="⚙️ Settings"
      description="Manage your classroom"
    />
  );
};

export default Settings;
