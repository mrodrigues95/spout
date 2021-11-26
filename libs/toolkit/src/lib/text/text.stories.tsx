import { Story, Meta } from '@storybook/react';
import { Text, TextProps } from './text';

export default {
  component: Text,
  title: 'Text',
} as Meta;

const Template: Story<TextProps> = () => {
  return (
    <>
      <Text size="xs">Extra small text</Text>
      <Text size="sm">Small text</Text>
      <Text>Default text</Text>
      <Text size="lg">Large text</Text>
      <Text size="xl">Extra large text</Text>
      <Text weight="bold">Bold text</Text>
      <Text weight="semibold">Semibold text</Text>
      <Text weight="medium">Medium text</Text>
      <Text casing="uppercase">Uppercase text</Text>
      <Text casing="capitalize">Capitalized text</Text>
      <Text color="muted">Muted text</Text>
      <Text variant="subtitle" truncate>Subtitle text</Text>
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
