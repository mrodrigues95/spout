import { generateId } from '../../../../../shared/utils/generateId';
import { ClassroomActionCard } from './ClassroomCard';

const Settings = () => {
  const labelId = `spout-classroom-settings-label-${generateId()}`;
  const descId = `spout-classroom-settings-desc-${generateId()}`;

  return (
    <ClassroomActionCard
      href="/profile"
      aria-labelledby={labelId}
      aria-describedby={descId}
      title="⚙️ Settings"
      description="Manage your classroom"
    />
  );
};

export default Settings;
