import { ReactNode } from 'react';
import { Title, Text } from '@spout/toolkit';
import { Main } from '../../../shared/components';

interface Props {
  title?: string;
  children: ReactNode;
}

const AuthContainer = ({ title, children }: Props) => {
  return (
    <Main>
      <section className="mx-auto flex w-full max-w-md flex-1 items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center rounded-xl">
          <div className="mb-8 space-y-2 text-center">
            <Text className="mb-32">LOGO HERE</Text>
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
