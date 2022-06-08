import { useEffect, useMemo, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBook,
  faBullhorn,
  faTimeline,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Tabs } from '@spout/toolkit';
import { Main } from '../../../shared/components';
import { DiscussionsMenu } from './DiscussionsMenu';
import { ClassroomHeader } from './ClassroomHeader';
import { Activity } from './Activity';
import { Overview } from './Overview';
import { Announcements } from './Announcements';
import { Reminders } from './Reminders';
import { Participants } from './Participants';
import ForbiddenOrNotFoundClassroom from './ForbiddenOrNotFoundClassroom';
import { ViewClassroomQuery } from './__generated__/ViewClassroomQuery.graphql';

const tabs = [
  {
    label: 'Activity',
    slug: 'activity',
    icon: <FontAwesomeIcon icon={faTimeline} className="mr-2" />,
    component: <Activity />,
  },
  {
    label: 'Overview',
    slug: 'overview',
    icon: <FontAwesomeIcon icon={faBook} className="mr-2" />,
    component: <Overview />,
  },
  {
    label: 'Announcements',
    slug: 'announcements',
    icon: <FontAwesomeIcon icon={faBullhorn} className="mr-2" />,
    component: <Announcements />,
  },
  {
    label: 'Reminders',
    slug: 'reminders',
    icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
    component: <Reminders />,
  },
  {
    label: 'Participants',
    slug: 'participants',
    icon: <FontAwesomeIcon icon={faUsers} className="mr-2" />,
    component: <Participants />,
  },
];

const getSelectedTab = (currentRoute?: string) =>
  tabs.findIndex((tab) => tab.slug === currentRoute);

const query = graphql`
  query ViewClassroomQuery($id: ID!) {
    classroomById(id: $id) {
      name
      ...ClassroomHeader_classroom
      ...DiscussionsMenu_discussions
    }
    me {
      ...ClassroomHeader_user @arguments(classroomId: $id)
      ...DiscussionsMenu_user @arguments(classroomId: $id)
    }
  }
`;

interface Props {
  fetchKey: number;
}

const ViewClassroom = ({ fetchKey }: Props) => {
  const router = useRouter();
  const data = useLazyLoadQuery<ViewClassroomQuery>(
    query,
    {
      id: router.query.classroomId as string,
    },
    { fetchKey },
  );

  const currentRoute = useMemo(
    () => router.pathname.split('/').pop(),
    [router.pathname],
  );
  const [selectedTab, setSelectedTab] = useState(getSelectedTab(currentRoute));

  useEffect(() => {
    // Handles updating the selected tab if the user goes back in the history
    // stack.
    setSelectedTab(getSelectedTab(currentRoute));
  }, [currentRoute]);

  useEffect(() => {
    router.push(
      `/classrooms/${router.query.classroomId}/${tabs[selectedTab].slug}`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  if (!data.classroomById) {
    return <ForbiddenOrNotFoundClassroom />;
  }

  return (
    <>
      <NextSeo title={data.classroomById.name} />
      <div className="flex min-w-0 flex-1 flex-col">
        <ClassroomHeader classroom={data.classroomById} me={data.me!} />
        <Main className="flex-col space-y-4">
          <div>
            <DiscussionsMenu classroom={data.classroomById} me={data.me!} />
          </div>
          <Tabs selectedIndex={selectedTab} onChange={setSelectedTab} manual>
            <Tabs.List>
              {tabs.map((tab) => (
                <Tabs.Tab
                  key={tab.label}
                  href={`/classrooms/${router.query.classroomId}/${tab.slug}`}
                >
                  {tab.icon}
                  {tab.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            <Tabs.Panels className="h-full">
              {tabs.map((tab) => (
                <Tabs.Panel key={tab.label} className="mb-8">
                  {tab.slug === currentRoute ? tab.component : null}
                </Tabs.Panel>
              ))}
            </Tabs.Panels>
          </Tabs>
        </Main>
      </div>
    </>
  );
};

export default ViewClassroom;
