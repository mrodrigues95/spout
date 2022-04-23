import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalContentEditable, {
  Props as LexicalContentEditableProps,
} from '@lexical/react/LexicalContentEditable';
import clsx from 'clsx';
import { useLayoutEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContentEditableProps extends LexicalContentEditableProps {
  className?: string;
}

const ContentEditable = ({ className, ...props }: ContentEditableProps) => {
  const [editor] = useLexicalComposerContext();
  const [readOnly, setReadOnly] = useState(false);

  useLayoutEffect(() => {
    return editor.registerReadOnlyListener((readOnly) => {
      setReadOnly(readOnly);
    });
  }, [editor]);

  return (
    <LexicalContentEditable
      className={twMerge(
        clsx(
          'relative cursor-text resize-none rounded-lg bg-white outline-none',
          readOnly ? 'p-4' : 'min-h-[20rem] px-2.5 py-2',
          className,
        ),
      )}
      {...props}
    />
  );
};

export default ContentEditable;
