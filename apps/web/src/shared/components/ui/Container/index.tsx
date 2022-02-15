import { ComponentProps } from 'react';
import { Spinner } from '@spout/toolkit';
import { VoidIllustration } from '@spout/assets/illustrations';
import clsx from 'clsx';
import ErrorFallback, { Props as ErrorFallbackProps } from '../ErrorFallback';

interface ContainerProps extends ComponentProps<'div'> {
  title: string;
}

const Container = ({ title, children, ...props }: ContainerProps) => {
  return <section className="p-5">{children}</section>;
};

export default Container;
