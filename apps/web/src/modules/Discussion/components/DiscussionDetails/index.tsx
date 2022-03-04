import { Fragment, ReactNode, Suspense, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { graphql, useFragment } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Title, Tabs } from '@spout/toolkit';
import { ConditionalWrapper, Image } from '../../../../shared/components';
import { getRandomAvatar } from '../../../../shared/utils/getRandomAvatar';
import { MEDIA_QUERIES, useMediaQuery } from '../../../../shared/hooks';
import { useDiscussion } from '../DiscussionProvider';
import Participants from './Participants';
import Attachments from './Attachments';
import Topic from './Topic';
import Description from './Description';
import { DiscussionDetails_discussion$key } from '../../../../__generated__/DiscussionDetails_discussion.graphql';
import { useEffect } from 'react';

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

  if (!showDetails) return null;

  return (
    <ConditionalWrapper
      condition={!isLaptop}
      wrapper={(children) => <MobileWrapper>{children}</MobileWrapper>}
    >
      <section className="flex flex-1 flex-col space-y-8 lg:ml-4 lg:w-64 lg:flex-initial">
        <div className="flex flex-col items-center">
          <Image src={getRandomAvatar()} alt="" size="xl" rounded />
          <Title className="mt-2" as="h2" variant="h4">
            {data.name}
          </Title>
          <Title as="h3" variant="h6" className="font-medium text-gray-500">
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
    </ConditionalWrapper>
  );
};

export default DiscussionDetails;
