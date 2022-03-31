import { forwardRef, ReactNode } from 'react';
import AvatarEditor, { AvatarEditorProps } from 'react-avatar-editor';
import { PhotoEditorSlider } from './photo-editor-slider';

export type PhotoEditorRef = AvatarEditor;

export interface PhotoEditorProps extends AvatarEditorProps {
  rounded?: boolean;
  children?: ReactNode;
}

const PhotoEditorRoot = forwardRef<PhotoEditorRef, PhotoEditorProps>(
  ({ rounded = false, children, ...props }, ref) => {
    return (
      <div className="flex w-full flex-1 items-center">
        <AvatarEditor
          ref={ref}
          className="!mx-auto !block"
          width={250}
          height={250}
          borderRadius={rounded ? 9999 : 0}
          {...props}
        />
      </div>
    );
  },
);

export const PhotoEditor = Object.assign(PhotoEditorRoot, {
  Slider: PhotoEditorSlider,
});
