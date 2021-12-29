import { useCallback, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { FilePicker, FilePickerProps, FileType } from './file-picker';

export default {
  component: FilePicker,
  title: 'FilePicker',
} as Meta;

const Template: Story<FilePickerProps> = (args) => {
  const [files, setFiles] = useState<FileType[]>([]);

  const onDrop = useCallback((files: File[]) => setFiles(files), []);

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
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
