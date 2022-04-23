import { useLayoutEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useTimeout } from '../../../../../shared/hooks';

const AutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { timeout } = useTimeout();

  useLayoutEffect(() => {
    // Without the timeout, HeadlessUI components will auto focus instead.
    if (!editor.isReadOnly()) timeout(() => editor.focus(), 200);
  }, [timeout, editor]);

  return null;
};

export default AutoFocusPlugin;
