import { generateId } from '../../../../../shared/utils/generateId';
import { ActionCard } from './cards';
import { Props as OverviewProps } from '../';

interface Props extends Pick<OverviewProps, 'classroom'> {}

const Invite = ({ classroom }: Props) => {
  const labelId = `spout-classroom-invite-label-${generateId()}`;
  const descId = `spout-classroom-invite-desc-${generateId()}`;

  return (
    <ActionCard
      aria-labelledby={labelId}
      aria-describedby={descId}
      title="✉️ Invite"
      description={`Invite people to ${classroom.name}`}
      className="col-start-2"
    />
  );
};

export default Invite;
