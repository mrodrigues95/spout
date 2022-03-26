import { forwardRef, ReactNode } from 'react';
import ReactOtpInput, {
  OtpInputProps as ReactOtpInputProps,
} from 'react-otp-input';
import clsx from 'clsx';
import OtpInputResend from './OtpInputResend';

export const OTP_LENGTH = 6;
export type OtpInputRef = ReactOtpInput;

interface Props extends Omit<ReactOtpInputProps, 'numInputs'> {
  numInputs?: typeof OTP_LENGTH | 4;
  children?: ReactNode;
}

const OtpInput = forwardRef<OtpInputRef, Props>(
  ({ containerStyle, inputStyle, numInputs = 6, children, ...props }, ref) => {
    return (
      <>
        <ReactOtpInput
          ref={ref}
          numInputs={numInputs}
          containerStyle={clsx(
            'flex items-center justify-center w-full space-x-2.5 mb-4',
            containerStyle,
          )}
          inputStyle={clsx(
            '!w-11 !h-11 text-center p-0 w-full rounded-lg border-2 border-transparent bg-gray-100 font-medium outline-none ring-offset-4',
            'disabled:opacity-60',
            'focus:border-blue-700 focus:ring-4 focus:ring-blue-200',
            inputStyle,
          )}
          {...props}
        />
        {children}
      </>
    );
  },
);

OtpInput.displayName = 'OtpInput';

export default Object.assign(OtpInput, { Resend: OtpInputResend });
