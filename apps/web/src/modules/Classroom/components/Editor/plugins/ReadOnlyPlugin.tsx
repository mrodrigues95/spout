import { useLayoutEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface Props {
  readOnly?: boolean;
}

const ReadOnlyPlugin = ({ readOnly = true }: Props) => {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect(() => {
    editor.setReadOnly(readOnly);
  }, [readOnly, editor]);

  return null;
};

export default ReadOnlyPlugin;
