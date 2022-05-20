import { Text, TextProps } from '@spout/toolkit';

interface Props extends Omit<TextProps, 'as' | 'weight' | 'color'> {
  variant: 'primary' | 'secondary';
}

const TimelineHeaderText = ({ variant, ...props }: Props) => {
  return (
    <Text
      as="span"
      weight={variant === 'primary' ? 'medium' : 'normal'}
      color={variant === 'primary' ? 'dark' : 'muted'}
      {...props}
    />
  );
};

export default TimelineHeaderText;
