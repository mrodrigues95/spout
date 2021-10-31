import { useCallback, useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { FilePicker, FilePickerProps, FileType } from './file-picker';

export default {
  component: FilePicker,
  title: 'FilePicker',
} as Meta;

const Template: Story<FilePickerProps> = (args) => {
  const [files, setFiles] = useState<FileType[]>([]);

  useEffect(() => console.log(files), [files]);

  const onFileSelected = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      })),
    );
  }, []);

  return (
    <FilePicker {...args} onFileSelected={onFileSelected}>
      <FilePicker.Button>Click here to pick a file</FilePicker.Button>
    </FilePicker>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
