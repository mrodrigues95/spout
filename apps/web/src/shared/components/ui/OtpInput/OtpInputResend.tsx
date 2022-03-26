import { Button, ButtonOrLinkProps, Spinner, Text } from '@spout/toolkit';
import { useEffect } from 'react';
import { useCountdown } from '../../../hooks';

interface Props {
  onResend(): void;
  label?: string;
  onCountdownComplete?(): void;
  shouldResetCountdown?: boolean;
  countdownTime?: number;
  buttonProps?: Omit<ButtonOrLinkProps, 'onClick'>;
}

const OtpInputResend = ({
  onResend,
  label,
  onCountdownComplete,
  shouldResetCountdown = false,
  countdownTime = 60,
  buttonProps: _buttonProps = {},
}: Props) => {
  const [count, { start, reset, isCountingDown }] = useCountdown({
    initialCount: countdownTime,
    interval: 1000,
    resetAtZero: true,
    onCountdownComplete,
  });

  useEffect(() => {
    if (shouldResetCountdown) reset();
  }, [reset, shouldResetCountdown]);

  const { disabled, ...buttonProps } = _buttonProps;

  return (
    <div className="space-x-2 text-center">
      <Text as="span" size="sm">
        {label ?? "Didn't receive it?"}
      </Text>
      <Button
        size="xs"
        onClick={() => {
          start();
          onResend();
        }}
        disabled={isCountingDown || disabled}
        spinner={<Spinner variant="circle" scheme="black" size="xs" />}
        {...buttonProps}
      >
        {isCountingDown ? count : 'Resend Code'}
      </Button>
    </div>
  );
};

export default OtpInputResend;
