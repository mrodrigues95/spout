import { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import clsx from 'clsx';
import { Sidebar } from './Sidebar';

interface Props {
  title?: string;
  authenticated?: boolean;
  horizontal?: boolean;
  children: ReactNode;
}

export const Layout = ({
  title,
  authenticated = true,
  horizontal = false,
  children,
}: Props) => {
  return (
    <>
      <NextSeo title={title} />
      <div className="flex max-h-screen min-h-screen bg-white">
        <div className="mx-auto flex min-w-0 max-w-[90rem] flex-1 p-2 lg:p-4">
          {authenticated && <Sidebar />}
          <div
            className={clsx(
              'relative flex min-w-0 flex-1',
              horizontal ? 'flex-row' : 'flex-col',
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
