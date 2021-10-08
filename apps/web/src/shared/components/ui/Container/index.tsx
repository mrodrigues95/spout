import { ReactNode } from 'react';
import { NotificationsIcon, HamburgerMenuIcon } from '@spout/assets/icons/outline';
import { Button, Tooltip } from '@spout/toolkit';
import Search from '../Search';

const ContainerBody = ({ children }: { children: ReactNode }) => {
  return <section className="relative flex-1">{children}</section>;
};

const ContainerHeader = ({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) => {
  return (
    <section className="flex flex-col justify-between border-b border-gray-200 p-3 sm:border-none sm:p-0 sm:mb-3 lg:mb-6">
      <div className="flex items-center justify-between sm:mb-2">
        <Button
          aria-label="Open menu"
          size="sm"
          variant="ghost"
          scheme="gray"
          className="inline-flex mr-1 sm:hidden"
        >
          <HamburgerMenuIcon className="w-4 h-4" />
        </Button>
        {title ? (
          <h1 className="hidden sm:block font-bold text-gray-900 truncate sm:text-2xl lg:text-3xl xl:text-4xl">
            {title}
          </h1>
        ) : (
          <div aria-hidden="true"></div>
        )}
        <div className="flex justify-end items-center w-3/5">
          <Search placeholder="Search" />
          <Tooltip label="Notifications">
            <Button
              size="sm"
              aria-label="View notifications"
              variant="ghost"
              scheme="gray"
              className="md:ml-2"
            >
              <NotificationsIcon className="w-4 h-4 md:w-6 md:h-6" />
            </Button>
          </Tooltip>
        </div>
      </div>
      {children && (
        <div className="flex items-center justify-end">{children}</div>
      )}
    </section>
  );
};

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col flex-1 w-full sm:p-3 lg:p-10">
      {children}
    </main>
  );
};

Container.Body = ContainerBody;
Container.Header = ContainerHeader;

export default Container;
