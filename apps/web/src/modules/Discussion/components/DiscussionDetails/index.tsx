import { Fragment, ReactNode, useEffect, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { graphql, useFragment } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Title, Tabs } from '@spout/toolkit';
import {
  ClassroomParticipants,
  ConditionalWrapper,
  Image,
  PanelRight,
} from '../../../../shared/components';
import { getRandomAvatar } from '../../../../shared/utils/getRandomAvatar';
import { MEDIA_QUERIES, useMediaQuery } from '../../../../shared/hooks';
import { useDiscussion } from '../DiscussionProvider';
import Attachments from './Attachments';
import Topic from './Topic';
import Description from './Description';
import { DiscussionDetails_discussion$key } from './__generated__/DiscussionDetails_discussion.graphql';
import { DiscussionDetails_user$key } from './__generated__/DiscussionDetails_user.graphql';

interface MobileWrapperProps {
  children: ReactNode;
}

const MobileWrapper = ({ children }: MobileWrapperProps) => {
  const { showDetails, setShowDetails } = useDiscussion()!;

  return (
    <Transition appear show={showDetails} as={Fragment}>
      <Dialog
        open={showDetails}
        onClose={() => setShowDetails(false)}
        className="fixed inset-0 z-50 flex flex-row-reverse py-2 backdrop-blur-sm backdrop-filter lg:hidden"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-900/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200 transform"
          enterFrom="opacity-0 translate-x-full"
          enterTo="opacity-100 translate-x-0"
          leave="ease-in duration-150 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="relative flex h-full w-80 max-w-[calc(100%-4rem)] flex-col space-y-8 overflow-y-auto rounded-l-3xl bg-white p-4 shadow-2xl ring ring-gray-200">
            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

const discussionDetailsFragment = graphql`
  fragment DiscussionDetails_discussion on Discussion {
    name
    ...Topic_discussion
    ...Description_discussion
    classroom {
      name
    }
  }
`;

const meFragment = graphql`
  fragment DiscussionDetails_user on User
  @argumentDefinitions(classroomId: { type: "ID!" }) {
    ...Description_user @arguments(classroomId: $classroomId)
    ...Topic_user @arguments(classroomId: $classroomId)
  }
`;

interface Props {
  me: DiscussionDetails_user$key;
  discussion: DiscussionDetails_discussion$key;
}

const DiscussionDetails = ({ ...props }: Props) => {
  const discussion = useFragment(discussionDetailsFragment, props.discussion);
  const me = useFragment(meFragment, props.me);
  const isLaptop = useMediaQuery(MEDIA_QUERIES.LARGE);
  const { showDetails, setShowDetails } = useDiscussion()!;

  useEffect(() => {
    setShowDetails(false);
  }, [isLaptop, setShowDetails]);

  const tabs = useMemo(
    () => [
      {
        id: 1,
        icon: <FontAwesomeIcon icon={faUsers} />,
        ariaLabel: 'Participants',
        component: <ClassroomParticipants />,
      },
      {
        id: 2,
        icon: <FontAwesomeIcon icon={faFileAlt} />,
        ariaLabel: 'Attachments',
        component: <Attachments />,
      },
    ],
    [],
  );

  if (!showDetails) return null;

  return (
    <ConditionalWrapper
      condition={!isLaptop}
      wrapper={(children) => <MobileWrapper>{children}</MobileWrapper>}
    >
      <PanelRight>
        <div className="flex flex-col items-center">
          <Image src={getRandomAvatar()} alt="" size="xl" rounded />
          <Title className="mt-2" as="h2" variant="h4">
            {discussion.name}
          </Title>
          <Title as="h3" variant="h6" className="font-medium text-gray-500">
            {discussion.classroom.name}
          </Title>
        </div>
        <div className="space-y-2">
          <Topic discussion={discussion} me={me} />
          <Description discussion={discussion} me={me} />
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
      </PanelRight>
    </ConditionalWrapper>
  );
};

export default DiscussionDetails;
