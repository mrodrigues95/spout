import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

export interface DropzoneProps extends DropzoneOptions {
  primaryMessage?: string;
  secondaryMessage?: string;
}

export const Dropzone = ({
  primaryMessage = 'Select a file to upload',
  secondaryMessage = 'or drag and drop it here',
  disabled = false,
  ...props
}: DropzoneProps) => {
  const { getRootProps, getInputProps, isFocused, isDragActive } = useDropzone({
    disabled,
    ...props,
  });

  return (
    <section className="w-full flex-1">
      <div
        {...getRootProps({
          className: clsx(
            'border-2 outline-none border-indigo-200 rounded-lg bg-indigo-50 border-dashed py-8 px-4 text-center',
            disabled
              ? 'opacity-60 pointer-events-none'
              : 'pointer-events-auto opacity-100 hover:border-indigo-300',
            isFocused || isDragActive
              ? 'border-indigo-500'
              : 'border-indigo-200',
          ),
        })}
        role="button"
      >
        <input {...getInputProps()} />
        <FontAwesomeIcon
          icon={faCloudArrowUp}
          className="rounded-full bg-indigo-100 p-2.5 text-indigo-700"
        />
        <p className="mt-4 text-lg font-medium text-indigo-700">
          {primaryMessage}
        </p>
        <p className="text-sm text-gray-500">{secondaryMessage}</p>
      </div>
    </section>
  );
};
