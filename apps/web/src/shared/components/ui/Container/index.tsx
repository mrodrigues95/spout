import { ComponentProps } from 'react';
import { ApolloError } from '@apollo/client';
import { Spinner, Button, Title } from '@spout/toolkit';
import { VoidIllustration } from '@spout/assets/illustrations';
import { ChevronIcon } from '@spout/assets/icons/outline';
import clsx from 'clsx';
import { getRandomAvatar } from '../../../utils/getRandomAvatar';
import ErrorFallback, { Props as ErrorFallbackProps } from '../ErrorFallback';
import Avatar from '../Avatar';

interface ContainerProps extends ComponentProps<'div'> {
  title: string;
  isLoading?: boolean;
  isError?: boolean | ApolloError;
  refetch?: ErrorFallbackProps['action'];
}

const Container = ({
  title,
  children,
  className,
  isLoading = false,
  isError = false,
  refetch,
  ...props
}: ContainerProps) => {
  const isReady = !isError && !isLoading;

  return (
    <div className={clsx('flex flex-col flex-1 p-5 space-y-3')} {...props}>
      {isLoading && <Spinner center size="lg" className="flex-1" />}
      {isError && (
        <ErrorFallback
          icon={<VoidIllustration className="w-full h-64 mb-4" />}
          action={() => refetch?.()}
        />
      )}
      {isReady && (
        <>
          <section className="flex items-center justify-between border-b border-gray-200/50 pb-3">
            <Title as="h1">{title}</Title>
            <Button className="space-x-2" variant="ghost" scheme="gray">
              <Avatar src={getRandomAvatar()} aria-hidden="true" size="xs" />
              <span className="text-blueGray-900 font-semibold">
                Marcus Rodrigues
              </span>
              <ChevronIcon className="w-4 h-4 transform -rotate-90 text-gray-600" />
            </Button>
          </section>
          <section className="flex flex-col flex-1">{children}</section>
        </>
      )}
    </div>
  );
};

export default Container;
