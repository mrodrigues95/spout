import { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Title, Tabs } from '@spout/toolkit';
import { DiscussionQuery } from '../__generated__/Discussion.generated';
import { Image } from '../../../../../shared/components';
import { getRandomAvatar } from '../../../../../shared/utils/getRandomAvatar';
import TopicDescription from './TopicDescription';
import Participants from './Participants';
import Attachments from './Attachments';

interface Tab {
  id: number;
  icon: ReactElement;
  ariaLabel: string;
  component: ReactElement;
}

interface Props {
  discussion: DiscussionQuery['discussionById'];
}

const DiscussionDetails = ({ discussion }: Props) => {
  const [tabs] = useState<Tab[]>([
    {
      id: 1,
      icon: <FontAwesomeIcon icon={faUsers} />,
      ariaLabel: 'Participants',
      component: <Participants users={discussion.classroom.users} />,
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={faFileAlt} />,
      ariaLabel: 'Attachments',
      component: <Attachments />,
    },
  ]);

  return (
    <div className="flex flex-col w-72 space-y-8">
      <div className="flex flex-col items-center">
        <Image
          src={getRandomAvatar()}
          alt=""
          size="xl"
          rounded
        />
        <Title className="mt-2" as="h2" variant="h4">
          {discussion.name}
        </Title>
        <Title as="h3" variant="h6" className="text-gray-700 font-semibold">
          {discussion.classroom.name}
        </Title>
      </div>
      <TopicDescription discussion={discussion} />
      <div className="flex-1">
        <Tabs className="h-full" variant="primary">
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Tab key={tab.id} aria-label={tab.ariaLabel}>
                {tab.icon}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Panels className="flex-1">
            {tabs.map((tab) => (
              <Tabs.Panel className="relative flex-1" key={tab.id}>
                {tab.component}
              </Tabs.Panel>
            ))}
          </Tabs.Panels>
        </Tabs>
      </div>
    </div>
  );
};

export default DiscussionDetails;
