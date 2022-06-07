import { Text, TextProps } from '@spout/toolkit';
import { MEDIA_QUERIES, useMediaQuery } from '../../../../../../shared/hooks';

interface Props extends Omit<TextProps, 'as' | 'weight' | 'color'> {
  variant: 'primary' | 'secondary';
}

const TimelineHeaderText = ({ variant, ...props }: Props) => {
  const isTablet = useMediaQuery(MEDIA_QUERIES.SMALL);

  return (
    <Text
      as="span"
      weight={variant === 'primary' ? 'medium' : 'normal'}
      color={variant === 'primary' ? 'dark' : 'muted'}
      size={isTablet ? 'md' : 'sm'}
      {...props}
    />
  );
};

export default TimelineHeaderText;
