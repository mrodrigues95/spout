import { ReactElement, ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  action: { description: string; link: ReactElement };
  children: ReactNode;
}

const AuthCard = ({ title, subtitle, action, children }: Props) => {
  return (
    <section className="flex flex-1 items-center justify-center mx-auto w-full max-w-xl">
      <div className="flex flex-col items-center justify-center h-96 p-4 rounded-xl w-full space-y-2">
        <div className="inline-flex flex-col items-center justify-center mb-5 space-y-2">
          <h1 className="font-bold text-2xl">{title}</h1>
          {subtitle && (
            <h2 className="font-medium text-gray-400">
              Use the form below to login
            </h2>
          )}
        </div>
        {children}
        <div className="w-full text-sm font-semibold">
          <span className="text-gray-500 mr-1">{action.description}</span>
          {action.link}
        </div>
      </div>
    </section>
  );
};

export default AuthCard;
