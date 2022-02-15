import { createContext, ReactNode, useContext, useMemo } from 'react';
import { FilePickerProps } from '@spout/toolkit';

interface ComposerToolbarContextType {
  message: string;
  isUploadingFiles: boolean;
  onNewMessage: () => void;
  onFilesAccepted: FilePickerProps['onDropAccepted'];
  onFilesRejected: FilePickerProps['onDropRejected'];
}

const ComposerToolbarContext = createContext<ComposerToolbarContextType | null>(
  null,
);

interface Props extends ComposerToolbarContextType {
  children: ReactNode;
}

export const ComposerToolbarProvider = ({
  message,
  isUploadingFiles,
  onNewMessage,
  onFilesAccepted,
  onFilesRejected,
  children,
}: Props) => {
  const context = useMemo(
    () => ({
      message,
      isUploadingFiles,
      onNewMessage,
      onFilesAccepted,
      onFilesRejected,
    }),
    [isUploadingFiles, message, onFilesAccepted, onFilesRejected, onNewMessage],
  );

  return (
    <ComposerToolbarContext.Provider value={context}>
      {children}
    </ComposerToolbarContext.Provider>
  );
};

export const useComposerToolbar = () => useContext(ComposerToolbarContext);
