import { useCallback, useMemo, useReducer } from 'react';
import { graphql, useMutation } from 'react-relay';
import { generateId } from '@spout/toolkit';
import { FileUploadErrorCode, useFileUpload } from './useFileUpload';
import { useMultiFileUploadMutation } from './__generated__/useMultiFileUploadMutation.graphql';

export interface FileWithId extends File {
  /** The id associated with the database record. */
  id?: string | null;
}

export interface MultiFileUploadEntry {
  id: number | string;
  file: FileWithId;
  isUploading: boolean;
  isUploaded: boolean;
  isError: boolean;
  errorCode?: FileUploadErrorCode;
}

export enum ActionType {
  BeginUpload,
  CompleteUpload,
  Reset,
  ClearErrorFiles,
  RemoveFile,
  UpdateFileProgressError,
  UpdateFileProgressSuccess,
}

type Action =
  | {
      type: ActionType.BeginUpload;
      files: MultiFileUploadEntry[];
      freshState?: boolean;
    }
  | { type: ActionType.CompleteUpload }
  | { type: ActionType.Reset }
  | { type: ActionType.ClearErrorFiles }
  | {
      type: ActionType.RemoveFile;
      entryId: MultiFileUploadEntry['id'];
    }
  | {
      type: ActionType.UpdateFileProgressError;
      entryId: MultiFileUploadEntry['id'];
      errorCode: FileUploadErrorCode;
    }
  | {
      type: ActionType.UpdateFileProgressSuccess;
      entryId: MultiFileUploadEntry['id'];
      fileId: FileWithId['id'];
    };

interface State {
  files: MultiFileUploadEntry[];
  errorFiles: MultiFileUploadEntry[];
  uploadedFiles: MultiFileUploadEntry[];
  isInFlight: boolean;
}

const initialState: State = {
  files: [],
  errorFiles: [],
  uploadedFiles: [],
  isInFlight: false,
};

const reducer = (state: State, action: Action): State => {
  const { type } = action;

  switch (type) {
    case ActionType.BeginUpload:
      return action.freshState
        ? { ...initialState }
        : {
            ...state,
            isInFlight: true,
            files: [...state.files, ...action.files],
          };
    case ActionType.CompleteUpload:
      return {
        ...state,
        isInFlight: false,
      };
    case ActionType.Reset:
      return {
        ...initialState,
      };
    case ActionType.ClearErrorFiles:
      return {
        ...state,
        errorFiles: [],
      };
    case ActionType.RemoveFile:
      return {
        ...state,
        files: [...state.files.filter((entry) => entry.id !== action.entryId)],
        errorFiles: [
          ...state.errorFiles.filter((entry) => entry.id !== action.entryId),
        ],
      };
    case ActionType.UpdateFileProgressError: {
      const entry = {
        ...state.files.find((entry) => entry.id === action.entryId)!,
      };
      entry.isUploading = false;
      entry.isUploaded = false;
      entry.isError = true;
      entry.errorCode = action.errorCode;

      return {
        ...state,
        files: [
          ...state.files.filter((entry) => entry.id !== action.entryId),
          entry,
        ],
        errorFiles: [...state.errorFiles, entry],
      };
    }
    case ActionType.UpdateFileProgressSuccess: {
      const entry = {
        ...state.files.find((entry) => entry.id === action.entryId)!,
      };
      entry.file.id = action.fileId;
      entry.isUploading = false;
      entry.isUploaded = true;
      entry.isError = false;

      return {
        ...state,
        files: [
          ...state.files.filter((entry) => entry.id !== action.entryId),
          entry,
        ],
        uploadedFiles: [...state.uploadedFiles, entry],
      };
    }
    default:
      return state;
  }
};

export const useMultiFileUpload = () => {
  const { upload: uploadFile } = useFileUpload();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [deleteFile] = useMutation<useMultiFileUploadMutation>(graphql`
    mutation useMultiFileUploadMutation($input: DeleteFileInput!) {
      deleteFile(input: $input) {
        file {
          id
        }
        errors {
          ... on Error {
            message
          }
        }
      }
    }
  `);

  const removeFileEntry = useCallback(
    (
      entryId: MultiFileUploadEntry['id'],
      options: { delete?: boolean; fileId?: FileWithId['id'] } = {},
    ) => {
      dispatch({ type: ActionType.RemoveFile, entryId });

      if (options.delete && options.fileId) {
        deleteFile({
          variables: { input: { fileId: options.fileId } },
          onError: () => {
            console.error('Error deleting file for id: ', options.fileId);
          },
        });
      }
    },
    [deleteFile],
  );

  const upload = useCallback(
    async (files: FileWithId[]) => {
      const fileEntries = files.map((file) => ({
        id: generateId(),
        file,
        isUploading: true,
        isUploaded: false,
        isError: false,
      }));

      dispatch({
        type: ActionType.BeginUpload,
        files: fileEntries,
        freshState: false,
      });

      Promise.allSettled(
        fileEntries.map((fileEntry) =>
          uploadFile(fileEntry.file).then((uploadResult) => {
            if (uploadResult.isError) {
              dispatch({
                type: ActionType.UpdateFileProgressError,
                entryId: fileEntry.id,
                errorCode: uploadResult.errorCode!,
              });
            } else {
              dispatch({
                type: ActionType.UpdateFileProgressSuccess,
                entryId: fileEntry.id,
                fileId: uploadResult.file?.id,
              });
            }
          }),
        ),
      ).then(() => dispatch({ type: ActionType.CompleteUpload }));
    },
    [uploadFile],
  );

  return useMemo(
    () => ({ progress: state, dispatch, upload, removeFileEntry }),
    [removeFileEntry, state, upload],
  );
};
