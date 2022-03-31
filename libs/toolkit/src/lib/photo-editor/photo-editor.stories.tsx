import { useCallback, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
} from '@fortawesome/free-solid-svg-icons';
import { PhotoEditor, PhotoEditorProps } from './photo-editor';
import { FilePicker, FileWithPreview } from '../file-picker';

export default {
  component: PhotoEditor,
  title: 'PhotoEditor',
} as Meta;

export const WithFilePicker: Story<PhotoEditorProps> = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [zoom, setZoom] = useState(1);

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      })),
    );
  }, []);

  return (
    <>
      <FilePicker onDropAccepted={onDropAccepted}>
        <FilePicker.Button>Click here to pick a photo</FilePicker.Button>
      </FilePicker>
      {files.length > 0 && (
        <div className="flex flex-col space-y-6">
          <PhotoEditor image={files[0].preview!} scale={zoom} rounded />
          <div className="flex flex-row items-center justify-center space-x-4">
            <FontAwesomeIcon
              icon={faMagnifyingGlassMinus}
              className="text-gray-400"
            />
            <PhotoEditor.Slider value={zoom} onChange={setZoom} />
            <FontAwesomeIcon
              icon={faMagnifyingGlassPlus}
              className="text-gray-400"
            />
          </div>
        </div>
      )}
    </>
  );
};
