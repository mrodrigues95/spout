import { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import Sidebar from './Sidebar';

interface Props {
  title: string;
  unauthenticated?: boolean;
  children: ReactNode;
}

const Layout = ({ title, unauthenticated = false, children }: Props) => {
  return (
    <>
      <NextSeo title={title} />
      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex flex-1">
          <>
            {!unauthenticated && <Sidebar />}
            {children}
          </>
        </div>
      </div>
    </>
  );
};

export default Layout;