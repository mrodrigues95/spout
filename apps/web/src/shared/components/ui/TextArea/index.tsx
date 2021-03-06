import { forwardRef, ComponentPropsWithRef } from 'react';
import clsx from 'clsx';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';

type BaseProps = TextareaAutosizeProps & ComponentPropsWithRef<'textarea'>;

interface Props extends BaseProps {
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosize
        style={{ border: 'none' }}
        className={clsx(
          'w-full resize-none font-medium placeholder-gray-300 ring-0 placeholder-shown:font-normal focus-within:ring-0',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
