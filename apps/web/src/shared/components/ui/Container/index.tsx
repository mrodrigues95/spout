import clsx from 'clsx';
import { ComponentProps } from 'react';
import { ApolloError } from '@apollo/client';
import { Spinner } from '@spout/toolkit';
import { VoidIllustration } from '@spout/assets/illustrations';
import ErrorFallback, { Props as ErrorFallbackProps } from '../ErrorFallback';

interface ContainerProps extends ComponentProps<'section'> {
  isLoading?: boolean;
  isError?: boolean | ApolloError;
  refetch?: ErrorFallbackProps['action'];
}

const Container = ({
  children,
  className,
  isLoading = false,
  isError = false,
  refetch,
  ...props
}: ContainerProps) => {
  const isReady = !isError && !isLoading;

  return (
    <section
      className={clsx(
        'flex flex-col flex-1 p-4 rounded-2xl',
        isReady && 'bg-blueGray-100'
      )}
      {...props}
    >
      {isLoading && <Spinner center size="lg" className="flex-1" />}
      {isError && (
        <ErrorFallback
          icon={<VoidIllustration className="w-full h-64 mb-4 ml-14" />}
          action={() => refetch?.()}
        />
      )}
      {isReady && children}
    </section>
  );
};

export default Container;
