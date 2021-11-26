import { Meta } from '@storybook/react';
import { Title } from './title';

export default {
  component: Title,
  title: 'Title',
} as Meta;

export const Primary = () => {
  return (
    <>
      <Title as="h1">This is h1 title</Title>
      <Title as="h2">This is h2 title</Title>
      <Title as="h3">This is h3 title</Title>
      <Title as="h4">This is h4 title</Title>
      <Title as="h5">This is h5 title</Title>
      <Title as="h6">This is h6 title</Title>
    </>
  );
};
Primary.args = {};
