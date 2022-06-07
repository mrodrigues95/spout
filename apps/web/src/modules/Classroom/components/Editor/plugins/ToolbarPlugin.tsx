// @ts-nocheck - A lot of this is copied from the docs.
// Their may be plans for Lexical to export their own headless version of this
// plugin at some point. See https://github.com/facebook/lexical/issues/1760.

import { useCallback, useEffect, useState } from 'react';
import { $createCodeNode } from '@lexical/code';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from '@lexical/rich-text';
import { $wrapLeafNodesInElements } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  CommandListenerLowPriority,
  LexicalEditor,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';

import clsx from 'clsx';
import { Portal } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBold,
  faCode,
  faItalic,
  faRedo,
  faStrikethrough,
  faUnderline,
  faUndo,
  faChevronDown,
  faParagraph,
  faListOl,
  faQuoteLeft,
  faList,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
  faOutdent,
  faIndent,
} from '@fortawesome/free-solid-svg-icons';
import { Menu, usePopper, IconButton } from '@spout/toolkit';
import { useTimeout } from '../../../../../shared/hooks';

const COMMAND_PRIORITY_LOW: CommandListenerLowPriority = 1;

const supportedBlockTypes = new Set([
  'paragraph',
  'quote',
  'code',
  'h1',
  'h2',
  'h3',
  'ul',
  'ol',
]);

const supportedFormatTypes = new Set([
  'left',
  'center',
  'right',
  'justify',
  'outdent',
  'indent',
]);

const formatTypeToFormatName = {
  left: {
    label: 'Left Align',
    icon: faAlignLeft,
  },
  center: {
    label: 'Center Align',
    icon: faAlignCenter,
  },
  right: {
    label: 'Right Align',
    icon: faAlignRight,
  },
  justify: {
    label: 'Justify Align',
    icon: faAlignJustify,
  },
  outdent: {
    label: 'Outdent',
    icon: faOutdent,
  },
  indent: {
    label: 'Indent',
    icon: faIndent,
  },
};

const IS_ALIGN_LEFT = 1;
const IS_ALIGN_CENTER = 2;
const IS_ALIGN_RIGHT = 3;
const IS_ALIGN_JUSTIFY = 4;

const ELEMENT_TYPE_TO_FORMAT = {
  [IS_ALIGN_LEFT]: 'left',
  [IS_ALIGN_CENTER]: 'center',
  [IS_ALIGN_RIGHT]: 'right',
  [IS_ALIGN_JUSTIFY]: 'justify',
};

const blockTypeToBlockName = {
  h1: {
    label: 'Heading 1',
    icon: faParagraph,
  },
  h2: {
    label: 'Heading 2',
    icon: faParagraph,
  },
  h3: {
    label: 'Heading 3',
    icon: faParagraph,
  },
  h4: {
    label: 'Heading 4',
    icon: faParagraph,
  },
  h5: {
    label: 'Heading 5',
    icon: faParagraph,
  },
  ol: {
    label: 'Numbered List',
    icon: faListOl,
  },
  ul: {
    label: 'Bulleted List',
    icon: faList,
  },
  code: {
    label: 'Code Block',
    icon: faCode,
  },
  paragraph: {
    label: 'Normal',
    icon: faParagraph,
  },
  quote: {
    label: 'Quote',
    icon: faQuoteLeft,
  },
};

function BlockFormatDropDown({
  editor,
  blockType,
}: {
  blockType: string;
  editor: LexicalEditor;
}): React$Node {
  const { timeout } = useTimeout();

  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createParagraphNode());
        }
      });
      timeout(() => editor.focus(), 200);
    }
  };

  const formatLargeHeading = () => {
    if (blockType !== 'h1') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createHeadingNode('h1'));
        }
      });
      timeout(() => editor.focus(), 200);
    }
  };

  const formatSmallHeading = () => {
    if (blockType !== 'h2') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createHeadingNode('h2'));
        }
      });
      timeout(() => editor.focus(), 200);
    }
  };

  const formatVerySmallHeading = () => {
    if (blockType !== 'h3') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createHeadingNode('h3'));
        }
      });
      timeout(() => editor.focus(), 200);
    }
  };

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
    timeout(() => editor.focus(), 200);
  };

  const formatNumberedList = () => {
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
    timeout(() => editor.focus(), 200);
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createQuoteNode());
        }
      });
      timeout(() => editor.focus(), 200);
    }
  };

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          if (selection.isCollapsed()) {
            $wrapLeafNodesInElements(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.removeText();
            selection.insertNodes([codeNode]);
            selection.insertRawText(textContent);
          }
        }
      });
      timeout(() => editor.focus(), 200);
    }
  };

  const [trigger, container] = usePopper({
    placement: 'bottom-start',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });

  // TODO: Move this to a `<Select />`
  return (
    <Menu className="w-auto">
      <Menu.Button
        ref={trigger}
        size="sm"
        variant="tertiary"
        leftIcon={
          <FontAwesomeIcon icon={blockTypeToBlockName[blockType].icon} />
        }
        rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
      >
        {blockTypeToBlockName[blockType].label}
      </Menu.Button>
      <Portal>
        <Menu.Items ref={container}>
          <Menu.Group>
            <Menu.Item
              onClick={formatParagraph}
              leftIcon={<FontAwesomeIcon icon={faParagraph} />}
            >
              Normal
            </Menu.Item>
            <Menu.Item
              onClick={formatLargeHeading}
              leftIcon={<FontAwesomeIcon icon={faParagraph} />}
            >
              Heading 1
            </Menu.Item>
            <Menu.Item
              onClick={formatSmallHeading}
              leftIcon={<FontAwesomeIcon icon={faParagraph} />}
            >
              Heading 2
            </Menu.Item>
            <Menu.Item
              onClick={formatVerySmallHeading}
              leftIcon={<FontAwesomeIcon icon={faParagraph} />}
            >
              Heading 3
            </Menu.Item>
            <Menu.Item
              onClick={formatBulletList}
              leftIcon={<FontAwesomeIcon icon={faList} />}
            >
              Bullet List
            </Menu.Item>
            <Menu.Item
              onClick={formatNumberedList}
              leftIcon={<FontAwesomeIcon icon={faListOl} />}
            >
              Numbered List
            </Menu.Item>
            <Menu.Item
              onClick={formatQuote}
              leftIcon={<FontAwesomeIcon icon={faQuoteLeft} />}
            >
              Quote
            </Menu.Item>
            <Menu.Item
              onClick={formatCode}
              leftIcon={<FontAwesomeIcon icon={faCode} />}
            >
              Code Block
            </Menu.Item>
          </Menu.Group>
        </Menu.Items>
      </Portal>
    </Menu>
  );
}

export default function ToolbarPlugin(): React$Node {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [blockType, setBlockType] = useState('paragraph');
  const [formatType, setFormatType] = useState('left');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const { timeout } = useTimeout();

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));

      if (elementDOM !== null) {
        if ($isElementNode(element)) {
          setFormatType(ELEMENT_TYPE_TO_FORMAT[element.getFormat()] ?? 'left');
        }

        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(supportedBlockTypes.has(type) ? type : 'paragraph');
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(supportedBlockTypes.has(type) ? type : 'paragraph');
        }
      }
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [activeEditor, updateToolbar]);

  const [trigger, container] = usePopper({
    placement: 'bottom-start',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });

  return (
    <div className="flex items-center divide-x-2 divide-gray-100 overflow-auto rounded-t-lg border-b border-gray-200 bg-white px-2.5 py-2">
      <div className="flex items-center space-x-1.5 px-2">
        <IconButton
          disabled={!canUndo}
          onClick={() => {
            activeEditor.dispatchCommand(UNDO_COMMAND);
          }}
          icon={<FontAwesomeIcon icon={faUndo} />}
          aria-label="Undo"
          variant="tertiary"
          className="h-8 w-8"
        />
        <IconButton
          disabled={!canRedo}
          onClick={() => {
            activeEditor.dispatchCommand(REDO_COMMAND);
          }}
          icon={<FontAwesomeIcon icon={faRedo} />}
          aria-label="Redo"
          variant="tertiary"
          className="h-8 w-8"
        />
      </div>
      {supportedBlockTypes.has(blockType) && activeEditor === editor && (
        <div className="px-2">
          <BlockFormatDropDown blockType={blockType} editor={editor} />
        </div>
      )}
      {blockType !== 'code' && (
        <>
          <div className="flex items-center space-x-1.5 px-2">
            <IconButton
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
              }}
              icon={<FontAwesomeIcon icon={faBold} />}
              aria-label="Format Bold"
              variant="tertiary"
              className={clsx(
                'h-8 w-8',
                isBold && 'bg-gray-100 text-gray-900 hover:bg-gray-200',
              )}
            />
            <IconButton
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
              }}
              icon={<FontAwesomeIcon icon={faItalic} />}
              aria-label="Format Italics"
              variant="tertiary"
              className={clsx(
                'h-8 w-8',
                isItalic && 'bg-gray-100 text-gray-900 hover:bg-gray-200',
              )}
            />
            <IconButton
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
              }}
              icon={<FontAwesomeIcon icon={faUnderline} />}
              aria-label="Format Underline"
              variant="tertiary"
              className={clsx(
                'h-8 w-8',
                isUnderline && 'bg-gray-100 text-gray-900 hover:bg-gray-200',
              )}
            />
            <IconButton
              onClick={() => {
                activeEditor.dispatchCommand(
                  FORMAT_TEXT_COMMAND,
                  'strikethrough',
                );
              }}
              icon={<FontAwesomeIcon icon={faStrikethrough} />}
              aria-label="Format Strikethrough"
              variant="tertiary"
              className={clsx(
                'h-8 w-8',
                isStrikethrough &&
                  'bg-gray-100 text-gray-900 hover:bg-gray-200',
              )}
            />
            <IconButton
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
              }}
              icon={<FontAwesomeIcon icon={faCode} />}
              aria-label="Insert Code"
              variant="tertiary"
              className={clsx(
                'h-8 w-8',
                isCode && 'bg-gray-100 text-gray-900 hover:bg-gray-200',
              )}
            />
          </div>
        </>
      )}
      {supportedFormatTypes.has(formatType) && (
        <div className="px-2">
          <Menu className="w-auto">
            <Menu.Button
              ref={trigger}
              size="sm"
              variant="tertiary"
              leftIcon={
                <FontAwesomeIcon
                  icon={formatTypeToFormatName[formatType].icon}
                />
              }
              rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {formatTypeToFormatName[formatType].label}
            </Menu.Button>
            <Portal>
              <Menu.Items ref={container}>
                <Menu.Group>
                  <Menu.Item
                    onClick={() => {
                      activeEditor.dispatchCommand(
                        FORMAT_ELEMENT_COMMAND,
                        'left',
                      );
                      timeout(() => activeEditor.focus(), 200);
                    }}
                    leftIcon={<FontAwesomeIcon icon={faAlignLeft} />}
                  >
                    Left Align
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      activeEditor.dispatchCommand(
                        FORMAT_ELEMENT_COMMAND,
                        'center',
                      );
                      timeout(() => activeEditor.focus(), 200);
                    }}
                    leftIcon={<FontAwesomeIcon icon={faAlignCenter} />}
                  >
                    Center Align
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      activeEditor.dispatchCommand(
                        FORMAT_ELEMENT_COMMAND,
                        'right',
                      );
                      timeout(() => activeEditor.focus(), 200);
                    }}
                    leftIcon={<FontAwesomeIcon icon={faAlignRight} />}
                  >
                    Right Align
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      activeEditor.dispatchCommand(
                        FORMAT_ELEMENT_COMMAND,
                        'justify',
                      );
                      timeout(() => activeEditor.focus(), 200);
                    }}
                    leftIcon={<FontAwesomeIcon icon={faAlignJustify} />}
                  >
                    Justify Align
                  </Menu.Item>
                </Menu.Group>
                <Menu.Group>
                  <Menu.Item
                    onClick={() => {
                      activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND);

                      timeout(() => activeEditor.focus(), 200);
                    }}
                    leftIcon={<FontAwesomeIcon icon={faOutdent} />}
                  >
                    Outdent
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND);
                      timeout(() => activeEditor.focus(), 200);
                    }}
                    leftIcon={<FontAwesomeIcon icon={faIndent} />}
                  >
                    Indent
                  </Menu.Item>
                </Menu.Group>
              </Menu.Items>
            </Portal>
          </Menu>
        </div>
      )}
    </div>
  );
}
