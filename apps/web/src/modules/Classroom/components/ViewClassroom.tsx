import { useEffect, useState } from 'react';
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
import { Header, Main } from '../../../shared/components';
import ClassroomOverviewProvider from './ClassroomOverview/ClassroomOverviewProvider';
import DiscussionsNavigation from './ClassroomOverview/DiscussionsNavigation';
import Activity from './Activity';
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
      ...DiscussionsNavigation_discussions
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

  const currentRoute = router.pathname.split('/').pop();
  const [selectedTab, setSelectedTab] = useState(getSelectedTab(currentRoute));

  useEffect(() => {
    if (getSelectedTab(currentRoute) !== selectedTab) {
      router.push(
        `/classrooms/${router.query.classroomId}/${tabs[selectedTab].slug}`,
      );
    }
  }, [router, selectedTab, currentRoute]);

  return (
    <ClassroomOverviewProvider>
      <NextSeo title={data.classroomById.name} />
      <Header>
        <Title as="h1">{data.classroomById.name}</Title>
      </Header>
      <Main className="flex-col space-y-4">
        <div>
          <DiscussionsNavigation classroom={data.classroomById} />
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
    </ClassroomOverviewProvider>
  );
};

export default ViewClassroom;
