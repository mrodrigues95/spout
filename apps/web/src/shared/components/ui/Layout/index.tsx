import { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
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
        <div className="flex flex-1">
          {authenticated && <Sidebar />}
          <main className="flex flex-1 flex-col">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
