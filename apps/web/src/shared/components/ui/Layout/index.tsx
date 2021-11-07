import { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import clsx from 'clsx';
import TopNavigation from './TopNavigation';
import Sidebar from './Sidebar';

interface LayoutColumnProps {
  main?: boolean;
  children: ReactNode;
}

const LayoutColumn = ({
  main = false,
  children,
}: LayoutColumnProps) => {
  return (
    <section className={clsx('flex flex-col space-y-4', main && 'flex-1')}>
      {main && <TopNavigation />}
      {children}
    </section>
  );
};

interface Props {
  title: string;
  authenticated?: boolean;
  children: ReactNode;
}

export const Layout = ({
  title,
  authenticated = true,
  children,
}: Props) => {
  return (
    <>
      <NextSeo title={title} />
      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex flex-1 p-2">
          {authenticated && <Sidebar />}
          <main className="flex flex-1 p-4 bg-blueGray-100 rounded-2xl space-x-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

Layout.Column = LayoutColumn;

export default Layout;
