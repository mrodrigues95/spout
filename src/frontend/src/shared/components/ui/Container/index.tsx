import { ReactNode } from 'react';
import { NotificationsIcon, HamburgerMenuIcon } from '~/shared/assets';
import Button from '../Button';
import Search from '../Search';

interface Props {
  title?: string;
  children: ReactNode;
}

const ContainerBody = ({ children }: Pick<Props, 'children'>) => {
  return <section className="relative flex-1">{children}</section>;
};

const ContainerHeader = ({ title, children }: Props) => {
  return (
    <section className="flex flex-col justify-between border-b border-gray-200 p-3 sm:border-none sm:p-0 sm:mb-3 lg:mb-6">
      <div className="flex items-center justify-between sm:mb-2">
        <Button className="inline-flex mr-1 sm:hidden" aria-label="Open menu">
          <HamburgerMenuIcon className="w-4 h-4" />
        </Button>
        {title && (
          <h1 className="hidden sm:block font-bold truncate sm:text-4xl">
            {title}
          </h1>
        )}
        <div className="flex justify-end items-center w-3/5">
          <Search placeholder="Search" />
          <Button
            className="p-2 sm:p-3 sm:ml-3"
            aria-label="View notifications"
          >
            <NotificationsIcon className="w-4 h-4 sm:w-6 sm:h-6" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">{children}</div>
    </section>
  );
};

const Container = ({ children }: Pick<Props, 'children'>) => {
  return (
    <main className="flex flex-col flex-1 w-full sm:p-3 lg:p-10">
      {children}
    </main>
  );
};

Container.Body = ContainerBody;
Container.Header = ContainerHeader;

export default Container;
