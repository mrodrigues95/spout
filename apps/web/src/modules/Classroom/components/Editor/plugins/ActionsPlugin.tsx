import { useCallback, useEffect, useState } from 'react';
import {
  $getRoot,
  $isParagraphNode,
  LexicalEditor,
  ParagraphNode,
} from 'lexical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button, IconButton } from '@spout/toolkit';

const useIsEditorEmpty = (editor: LexicalEditor) => {
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        const root = $getRoot();
        const children = root.getChildren();

        if (children.length > 1) {
          setIsEditorEmpty(false);
        } else {
          if ($isParagraphNode(children[0])) {
            const paragraphChildren = (
              children[0] as ParagraphNode
            ).getChildren();
            setIsEditorEmpty(paragraphChildren.length === 0);
          } else {
            setIsEditorEmpty(false);
          }
        }
      });
    });
  }, [editor]);

  return { isEditorEmpty };
};

export interface Props {
  onCancel(): void;
  onSave(stringifiedEditorState: string): void;
  onDelete?(): void;
  isSaving?: boolean;
  showDelete?: boolean;
}

const ActionsPlugin = ({
  onCancel,
  onSave,
  onDelete,
  isSaving = false,
  showDelete = false,
}: Props) => {
  const [editor] = useLexicalComposerContext();
  const { isEditorEmpty } = useIsEditorEmpty(editor);

  const parseEditorState = useCallback(() => {
    const stringifiedEditorState = JSON.stringify(
      editor.getEditorState().toJSON(),
    );
    onSave(stringifiedEditorState);
  }, [editor, onSave]);

  return (
    <div className="flex justify-end space-x-1.5 px-2.5 py-2">
      {showDelete && (
        <IconButton
          aria-label="Delete"
          size="sm"
          variant="danger"
          icon={<FontAwesomeIcon icon={faTrashAlt} />}
          onClick={onDelete}
          disabled={isEditorEmpty}
          className="mr-auto"
        />
      )}
      <Button
        size="sm"
        variant="tertiary"
        onClick={onCancel}
        disabled={isSaving}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={parseEditorState}
        disabled={isEditorEmpty}
        loading={isSaving}
        loadingText="Saving..."
      >
        Save
      </Button>
    </div>
  );
};

export default ActionsPlugin;
