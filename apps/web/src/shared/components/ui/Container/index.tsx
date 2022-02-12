import { ComponentProps } from 'react';
import { Spinner } from '@spout/toolkit';
import { VoidIllustration } from '@spout/assets/illustrations';
import clsx from 'clsx';
import ErrorFallback, { Props as ErrorFallbackProps } from '../ErrorFallback';

interface ContainerProps extends ComponentProps<'div'> {
  title: string;
  horizontal?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  refetch?: ErrorFallbackProps['action'];
}

const Container = ({
  title,
  children,
  className,
  horizontal = false,
  isLoading = false,
  isError = false,
  refetch,
  ...props
}: ContainerProps) => {
  const isReady = !isError && !isLoading;

  return (
    <section
      className={clsx(
        'flex flex-1 p-5',
        horizontal ? 'flex-row space-x-10' : 'flex-col space-y-4',
        className
      )}
      {...props}
    >
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
