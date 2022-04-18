import { useLayoutEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const AutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
};

export default AutoFocusPlugin;
