import { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import TopNavigation from './TopNavigation';
import Sidebar from './Sidebar';

interface Props {
  title: string;
  authenticated?: boolean;
  children: ReactNode;
}

export const Layout = ({ title, authenticated = true, children }: Props) => {
  return (
    <>
      <NextSeo title={title} />
      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex flex-1 p-4">
          {authenticated && <Sidebar />}
          <main className="flex flex-1 flex-col space-x-4 space-y-4">
            {authenticated && <TopNavigation />}
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
