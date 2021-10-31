import { useCallback, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { PhotoCropper, PhotoCropperProps } from './photo-cropper';
import { FilePicker, FileType } from '../file-picker';

export default {
  component: PhotoCropper,
  title: 'PhotoCropper',
} as Meta;

export const WithFilePicker: Story<PhotoCropperProps> = () => {
  const [files, setFiles] = useState<FileType[]>([]);

  const onFileSelected = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      })),
    );
  }, []);

  return (
    <>
      <FilePicker onFileSelected={onFileSelected}>
        <FilePicker.Button>Click here to pick a photo</FilePicker.Button>
      </FilePicker>
      {files.length > 0 && (
        <PhotoCropper
          image={files[0].preview!}
          setCropper={(cropper) => console.log(cropper)}
        />
      )}
    </>
  );
};
