import {
  ComponentProps,
  createContext,
  forwardRef,
  ReactNode,
  useContext,
} from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

export interface FileWithPreview extends File {
  preview?: string;
}

interface ButtonProps extends ComponentProps<'span'> {
  disabled?: boolean;
}

const Button = forwardRef<HTMLSpanElement, ButtonProps>(
  ({ disabled = false, ...props }, ref) => {
    const { open } = useContext(FilePickerContext)!;

    return (
      <span
        tabIndex={disabled ? undefined : 0}
        role="button"
        onKeyPress={(e) => {
          if (e.code === 'Enter' || e.code === 'Space') {
            e.preventDefault();
            open();
          }
        }}
        ref={ref}
        {...props}
      />
    );
  },
);

interface FilePickerContextType {
  open: () => void;
}

const FilePickerContext = createContext<FilePickerContextType | null>(null);

export interface FilePickerProps extends DropzoneOptions {
  children: ReactNode;
}

export const FilePicker = ({
  children,
  disabled,
  ...props
}: FilePickerProps) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    noDragEventsBubbling: true,
    disabled,
    ...props,
  });

  return (
    <FilePickerContext.Provider value={{ open }}>
      <label
        {...getRootProps()}
        onClick={(e) => disabled && e.preventDefault()}
      >
        <input {...getInputProps()} />
        {children}
      </label>
    </FilePickerContext.Provider>
  );
};

FilePicker.Button = Button;
