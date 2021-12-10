import { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Title, Tabs } from '@spout/toolkit';
import { DiscussionInfo_Discussion } from '../__generated__/Discussion.generated';
import { Avatar } from '../../../../../shared/components';
import { getRandomAvatar } from '../../../../../shared/utils/getRandomAvatar';
import TopicDescription from './TopicDescription';
import Participants from './Participants';

interface Tab {
  id: number;
  icon: ReactElement;
  component: ReactElement;
}

interface Props {
  discussion: DiscussionInfo_Discussion;
}

const DiscussionDetails = ({ discussion }: Props) => {
  const [tabs] = useState<Tab[]>([
    {
      id: 1,
      icon: <FontAwesomeIcon icon={faUsers} />,
      component: <Participants users={discussion.classroom.users} />,
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={faFileAlt} />,
      component: <span>files</span>,
    },
  ]);

  return (
    <div className="w-72 space-y-8">
      <div className="flex flex-col items-center">
        <Avatar
          src={getRandomAvatar()}
          className="mb-2"
          aria-hidden="true"
          size="xl"
        />
        <Title as="h2" variant="h4">
          {discussion.name}
        </Title>
        <Title as="h3" variant="h6" className="text-gray-700 font-semibold">
          {discussion.classroom.name}
        </Title>
      </div>
      <TopicDescription />
      <div>
        <Tabs variant="primary">
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Tab key={tab.id}>{tab.icon}</Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Panels>
            {tabs.map((tab) => (
              <Tabs.Panel key={tab.id}>{tab.component}</Tabs.Panel>
            ))}
          </Tabs.Panels>
        </Tabs>
      </div>
    </div>
  );
};

export default DiscussionDetails;
