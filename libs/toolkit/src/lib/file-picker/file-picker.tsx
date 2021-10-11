import { ComponentProps, createContext, ReactNode, useContext } from 'react';
import { useDropzone } from 'react-dropzone';

export interface FileType extends File {
  preview?: string;
}

interface ButtonProps extends ComponentProps<'button'> {}

const Button = ({ ...props }: ButtonProps) => {
  const { open } = useContext(FilePickerContext)!;
  return <button type="button" {...props} onClick={open} />;
};

interface FilePickerContextType {
  open: () => void;
}

const FilePickerContext = createContext<FilePickerContextType | null>(null);

export interface FilePickerProps {
  onFileSelected: (acceptedFiles: File[]) => void;
  children: ReactNode;
}

export const FilePicker = ({ onFileSelected, children }: FilePickerProps) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: onFileSelected,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <FilePickerContext.Provider value={{ open }}>
      <div {...getRootProps()}>
        <input {...getInputProps()} aria-hidden="true" />
        {children}
      </div>
    </FilePickerContext.Provider>
  );
};

FilePicker.Button = Button;
