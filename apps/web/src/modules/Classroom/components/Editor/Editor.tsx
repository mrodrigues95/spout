import { ReactElement, useRef } from 'react';
import { EditorThemeClasses, LexicalEditor } from 'lexical';
import LexicalComposer from '@lexical/react/LexicalComposer';
import { HistoryPlugin as LexicalHistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalRichTextPlugin from '@lexical/react/LexicalRichTextPlugin';
import LexicalMarkdownShortcutPlugin from '@lexical/react/LexicalMarkdownShortcutPlugin';
import LexicalListPlugin from '@lexical/react/LexicalListPlugin';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import ContentEditable from './ContentEditable';
import { editorNodes } from './nodes';
import {
  ToolbarPlugin,
  MaxIndentLevelPlugin,
  CodeHighlightPlugin,
  ReadOnlyPlugin,
  ActionsPlugin,
  ActionsPluginProps,
  AutoFocusPlugin,
} from './plugins';
import { Card, CardProps } from '@spout/toolkit';

const EditorPlaceholder = () => (
  <div className="pointer-events-none absolute top-[3.875rem] left-0 inline-block select-none overflow-hidden whitespace-pre-wrap px-3 font-light text-gray-400 outline-none">
    Enter some text...
  </div>
);

interface InitialConfig {
  readOnly?: boolean;
  theme?: EditorThemeClasses;
  nodes?: any;
  onError: (error: Error, editor: LexicalEditor) => void;
}

// @ts-ignore - Lexical types are a mess right now.
// See https://github.com/facebook/lexical/issues/1349.
const theme: EditorThemeClasses = {
  ltr: 'text-left',
  rtl: 'text-right',
  paragraph: 'm-0 mb-2 relative last:mb-0',
  quote:
    'text-base p-2 m-0 border-l-4 border-solid border-l-gray-200 text-gray-900 bg-gray-50 rounded-r-md',
  characterLimit: 'inline bg-red-200',
  heading: {
    h1: 'text-2xl font-normal m-0 mb-3 p-0 text-gray-900',
    h2: 'text-base font-bold text-gray-500 m-0 mt-2.5 p-0 uppercase',
    h3: 'text-xs m-0 font-bold mt-2.5 p-0 uppercase text-gray-900',
  },
  text: {
    bold: 'font-bold',
    code: 'bg-gray-100 py-0.5 px-1 text-sm',
    italic: 'italic',
    strikethrough: 'line-through',
    underline: 'underline',
    underlineStrikethrough: 'underline-line-through',
  },
  list: {
    listitem: 'my-2 mx-8',
    nested: {
      listitem: 'list-none',
    },
    olDepth: [
      'p-0 m-0 ml-4 list-decimal',
      'p-0 m-0 ml-4 list-[upper-alpha]',
      'p-0 m-0 ml-4 list-[lower-alpha]',
      'p-0 m-0 ml-4 list-[upper-roman]',
      'p-0 m-0 ml-4 list-[lower-roman]',
    ],
    ulDepth: [
      'p-0 m-0 ml-4 list-disc',
      'p-0 m-0 ml-4 list-[circle]',
      'p-0 m-0 ml-4 list-[square]',
    ],
  },
  code: clsx(
    'text-sm bg-gray-100 block py-2 pr-2 pl-14 mx-0 my-2 overflow-x-auto relative leading-6',
    'before:content-[attr(data-gutter)] before:absolute before:top-0 before:left-0 before:h-full before:w-12',
    'before:bg-stone-200/40 before:p-2 before:whitespace-pre-wrap before:text-stone-700 before:text-right before:border-r before:border-r-stone-300',
  ),
};

interface Props extends ActionsPluginProps {
  readOnly?: boolean;
  contentEditable?: ReactElement;
  containerProps?: CardProps<'div'>;
}

const Editor = ({
  onDelete,
  onSave,
  onCancel,
  showDelete,
  isSaving,
  readOnly = true,
  containerProps: _containerProps = {},
  contentEditable,
  initialStringifiedEditorState,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialConfig: InitialConfig = {
    theme,
    onError: (error) => console.error(error),
    nodes: [...editorNodes],
    readOnly,
  };

  const { className, ...containerProps } = _containerProps;

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Card
        ref={scrollRef}
        className={twMerge(
          clsx('p-0', readOnly ? 'shadow-sm' : 'shadow-md', className),
        )}
        {...containerProps}
      >
        <ReadOnlyPlugin readOnly={readOnly} />
        <MaxIndentLevelPlugin maxDepth={7} />
        <CodeHighlightPlugin />
        <LexicalHistoryPlugin />
        <LexicalListPlugin />
        <LexicalMarkdownShortcutPlugin />
        {!readOnly && (
          <>
            <ToolbarPlugin />
            <AutoFocusPlugin />
          </>
        )}
        <LexicalRichTextPlugin
          contentEditable={contentEditable ?? <ContentEditable />}
          placeholder={<EditorPlaceholder />}
          initialEditorState={initialStringifiedEditorState || undefined}
        />
        {!readOnly && (
          <ActionsPlugin
            onDelete={onDelete}
            onSave={onSave}
            onCancel={onCancel}
            isSaving={isSaving}
            showDelete={showDelete}
            initialStringifiedEditorState={initialStringifiedEditorState}
          />
        )}
      </Card>
    </LexicalComposer>
  );
};

export default Editor;
