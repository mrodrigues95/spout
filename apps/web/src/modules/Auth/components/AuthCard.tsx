import { ReactElement, ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  action: { description: string; link: ReactElement };
  children: ReactNode;
}

const AuthCard = ({ title, subtitle, action, children }: Props) => {
  return (
    <section className="mx-auto flex w-full max-w-xl flex-1 items-center justify-center">
      <div className="flex h-96 w-full flex-col items-center justify-center space-y-2 rounded-xl p-4">
        <div className="mb-5 inline-flex flex-col items-center justify-center space-y-2">
          <h1 className="font-bold text-2xl">{title}</h1>
          {subtitle && (
            <h2 className="font-medium text-gray-400">
              Use the form below to login
            </h2>
          )}
        </div>
        {children}
        <div className="w-full text-sm font-medium">
          <span className="mr-1 text-gray-500">{action.description}</span>
          {action.link}
        </div>
      </div>
    </section>
  );
};

export default AuthCard;
