import { Suspense, useMemo } from 'react';
import { graphql, useFragment } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Title, Tabs } from '@spout/toolkit';
import { Image } from '../../../../../shared/components';
import { getRandomAvatar } from '../../../../../shared/utils/getRandomAvatar';
import Participants from './Participants';
import Attachments from './Attachments';
import Topic from './Topic';
import Description from './Description';
import { DiscussionDetails_discussion$key } from '../../../../../__generated__/DiscussionDetails_discussion.graphql';

const fragment = graphql`
  fragment DiscussionDetails_discussion on Discussion {
    name
    ...Topic_discussion
    ...Description_discussion
    classroom {
      name
      ...Participants_classroom
    }
  }
`;

interface Props {
  discussion: DiscussionDetails_discussion$key;
}

const DiscussionDetails = ({ discussion }: Props) => {
  const data = useFragment(fragment, discussion);

  const tabs = useMemo(
    () => [
      {
        id: 1,
        icon: <FontAwesomeIcon icon={faUsers} />,
        ariaLabel: 'Participants',
        component: <Participants classroom={data.classroom} />,
      },
      {
        id: 2,
        icon: <FontAwesomeIcon icon={faFileAlt} />,
        ariaLabel: 'Attachments',
        component: (
          <Suspense fallback={null}>
            <Attachments />
          </Suspense>
        ),
      },
    ],
    [data.classroom],
  );

  return (
    <section className="flex w-72 flex-col space-y-8 pl-5">
      <div className="flex flex-col items-center">
        <Image src={getRandomAvatar()} alt="" size="xl" rounded />
        <Title className="mt-2" as="h2" variant="h4">
          {data.name}
        </Title>
        <Title as="h3" variant="h6" className="font-semibold text-gray-700">
          {data.classroom.name}
        </Title>
      </div>
      <div className="space-y-2">
        <Topic discussion={data} />
        <Description discussion={data} />
      </div>
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
    </section>
  );
};

export default DiscussionDetails;
