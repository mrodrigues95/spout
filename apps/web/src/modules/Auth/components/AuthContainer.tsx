import { ReactNode } from 'react';
import { Title, Text } from '@spout/toolkit';
import clsx from 'clsx';
import { Main } from '../../../shared/components';

interface Props {
  title?: string;
  width?: 'md' | 'lg' | 'xl';
  children: ReactNode;
}

const AuthContainer = ({ title, width = 'md', children }: Props) => {
  return (
    <Main>
      <section
        className={clsx(
          'mx-auto flex w-full flex-1 items-center justify-center',
          width === 'md'
            ? 'max-w-md'
            : width === 'lg'
            ? 'max-w-lg'
            : 'max-w-xl',
        )}
      >
        <div className="flex w-full flex-col items-center justify-center rounded-xl">
          <div className="mb-8 space-y-2 text-center">
            <Text className="mb-24">LOGO HERE</Text>
            {title && (
              <Title as="h1" variant="h3">
                {title}
              </Title>
            )}
          </div>
          {children}
        </div>
      </section>
    </Main>
  );
};

export default AuthContainer;
