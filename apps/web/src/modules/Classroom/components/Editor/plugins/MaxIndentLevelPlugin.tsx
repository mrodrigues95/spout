import { useEffect } from 'react';
import {
  $getListDepth,
  $isListItemNode,
  $isListNode,
  ListNode,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  INDENT_CONTENT_COMMAND,
  LexicalNode,
  RangeSelection,
} from 'lexical';

function getElementNodesInSelection(selection: RangeSelection) {
  const nodesInSelection = selection.getNodes();

  if (nodesInSelection.length === 0) {
    return new Set([
      selection.anchor.getNode().getParentOrThrow(),
      selection.focus.getNode().getParentOrThrow(),
    ]);
  }

  return new Set(
    nodesInSelection.map((n) => ($isElementNode(n) ? n : n.getParentOrThrow())),
  );
}

const highPriority = 3;

function isIndentPermitted(maxDepth: number) {
  const selection = $getSelection();

  if (!$isRangeSelection(selection)) {
    return false;
  }

  const elementNodesInSelection = getElementNodesInSelection(
    selection as RangeSelection,
  );

  let totalDepth = 0;

  for (const elementNode of elementNodesInSelection) {
    if ($isListNode(elementNode)) {
      totalDepth = Math.max(
        $getListDepth(elementNode as ListNode) + 1,
        totalDepth,
      );
    } else if ($isListItemNode(elementNode)) {
      const parent = elementNode.getParent();
      if (!$isListNode(parent as LexicalNode)) {
        throw new Error(
          'ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.',
        );
      }

      totalDepth = Math.max($getListDepth(parent as ListNode) + 1, totalDepth);
    }
  }

  return totalDepth <= maxDepth;
}

export default function ListMaxIndentLevelPlugin({
  maxDepth = 7,
}: {
  maxDepth?: number;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INDENT_CONTENT_COMMAND,
      () => !isIndentPermitted(maxDepth),
      highPriority,
    );
  }, [editor, maxDepth]);

  return null;
}
