import { useCallback, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { FilePicker, FilePickerProps, FileType } from './file-picker';
import { FileIcon } from '../file-icon';

export default {
  component: FilePicker,
  title: 'FilePicker',
} as Meta;

const Template: Story<FilePickerProps> = (args) => {
  const [files, setFiles] = useState<FileType[]>([]);

  const onDrop = useCallback((files: File[]) => setFiles(files), []);

  console.log(files);

  return (
    <>
      <FilePicker {...args} onDrop={onDrop}>
        <FilePicker.Button>Click here to pick a file</FilePicker.Button>
      </FilePicker>
      <ul>
        {files.map((file, idx) => (
          <li key={idx}>
            {file.name} - {file.size}
          </li>
        ))}
      </ul>
      <ul>
        {files.map((file, idx) => (
          <li key={idx}>
            <FileIcon fileName={file.name} />
            {file.name} - {file.size}
          </li>
        ))}
      </ul>
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
