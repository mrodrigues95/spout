import { ComponentProps } from 'react';
import { ApolloError } from '@apollo/client';
import { Spinner } from '@spout/toolkit';
import { VoidIllustration } from '@spout/assets/illustrations';
import clsx from 'clsx';
import ErrorFallback, { Props as ErrorFallbackProps } from '../ErrorFallback';

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
    <section className={clsx('flex flex-col flex-1 p-5 space-y-4')} {...props}>
      {isLoading && <Spinner center size="lg" className="flex-1" />}
      {isError && (
        <ErrorFallback
          icon={<VoidIllustration className="w-full h-64 mb-4" />}
          action={() => refetch?.()}
        />
      )}
      {isReady && children}
    </section>
  );
};

export default Container;
