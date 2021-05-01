import { ReactNode } from 'react';
import { NextSeo } from 'next-seo';

interface Props {
  title: string;
  children: ReactNode;
}

const PrimaryLayout = ({ title, children }: Props) => {
  return (
    <>
      <NextSeo title={`${title} | Spout`} />
      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex flex-1">{children}</div>
      </div>
    </>
  );
};

export default PrimaryLayout;
