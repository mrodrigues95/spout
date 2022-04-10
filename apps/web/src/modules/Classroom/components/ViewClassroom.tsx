import { useEffect, useMemo, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faBullhorn,
  faCalendarDays,
  faTimeline,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Tabs, Title } from '@spout/toolkit';
import {
  ClassroomParticipants,
  Main,
  PanelRight,
} from '../../../shared/components';
import Activity from './Activity';
import { DiscussionsMenu } from './DiscussionsMenu';
import { ViewClassroomQuery } from './__generated__/ViewClassroomQuery.graphql';
import { ClassroomHeader } from './ClassroomHeader';

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
    component: 'overview here',
  },
  {
    label: 'Announcements',
    slug: 'announcements',
    icon: <FontAwesomeIcon icon={faBullhorn} className="mr-2" />,
    component: 'announcements here',
  },
  {
    label: 'Important Dates',
    slug: 'important',
    icon: <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />,
    component: 'important dates here',
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

  return (
    <>
      <NextSeo title={data.classroomById.name} />
      <div className="flex min-w-0 flex-1 flex-col">
        <ClassroomHeader classroom={data.classroomById} />
        <Main className="flex-col space-y-4">
          <div>
            <DiscussionsMenu classroom={data.classroomById} />
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
            <Tabs.Panels>
              {tabs.map((tab) => (
                <Tabs.Panel key={tab.label}>
                  {tab.slug === currentRoute ? tab.component : null}
                </Tabs.Panel>
              ))}
            </Tabs.Panels>
          </Tabs>
        </Main>
      </div>
      <PanelRight className="space-y-2">
        <Title as="h2" variant="h5" className="px-2">
          Participants
        </Title>
        <ClassroomParticipants />
      </PanelRight>
    </>
  );
};

export default ViewClassroom;
