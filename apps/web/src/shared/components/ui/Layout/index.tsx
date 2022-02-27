import { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import clsx from 'clsx';
import Sidebar from './Sidebar';

interface Props {
  title?: string;
  authenticated?: boolean;
  children: ReactNode;
}

export const Layout = ({ title, authenticated = true, children }: Props) => {
  return (
    <>
      <NextSeo title={title} />
      <div className="flex max-h-screen min-h-screen bg-white">
        <div className="max-w-8xl mx-auto flex min-w-0 flex-1 p-2 lg:p-4">
          {authenticated && <Sidebar />}
          <div className={clsx('relative flex min-w-0 flex-1')}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
