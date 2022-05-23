import { useCallback, useMemo, useReducer } from 'react';
import { graphql, useMutation } from 'react-relay';
import { generateId } from '@spout/toolkit';
import {
  FileUploadErrorCode,
  useFileUpload,
} from '../../../shared/hooks/files';
import { useFileUploadQueueMutation } from './__generated__/useFileUploadQueueMutation.graphql';

const mutation = graphql`
  mutation useFileUploadQueueMutation($input: DeleteFileInput!) {
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
`;

export interface FileWithId extends File {
  id?: string | null;
}

export interface FileUploadQueueElement {
  id: number | string;
  file: FileWithId;
  isUploading: boolean;
  isUploaded: boolean;
  isError: boolean;
  errorCode?: FileUploadErrorCode;
}

export enum ActionType {
  InitializeQueue,
  BeginUpload,
  CompleteUpload,
  ResetQueue,
  ResetErrorFiles,
  RemoveFile,
  MarkFileUploadError,
  MarkFileUploadSuccess,
}

type Action =
  | {
      type: ActionType.InitializeQueue;
      files: FileUploadQueueElement[];
    }
  | { type: ActionType.BeginUpload }
  | { type: ActionType.CompleteUpload }
  | { type: ActionType.ResetQueue }
  | { type: ActionType.ResetErrorFiles }
  | {
      type: ActionType.RemoveFile;
      elementId: FileUploadQueueElement['id'];
    }
  | {
      type: ActionType.MarkFileUploadError;
      elementId: FileUploadQueueElement['id'];
      errorCode: FileUploadErrorCode;
    }
  | {
      type: ActionType.MarkFileUploadSuccess;
      elementId: FileUploadQueueElement['id'];
      fileId: FileWithId['id'];
    };

interface State {
  files: FileUploadQueueElement[];
  errorFiles: FileUploadQueueElement[];
  uploadedFiles: FileUploadQueueElement[];
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
    case ActionType.InitializeQueue:
      return {
        ...state,
        files: [...state.files, ...action.files],
      };
    case ActionType.BeginUpload:
      return {
        ...state,
        isInFlight: true,
      };
    case ActionType.CompleteUpload:
      return {
        ...state,
        isInFlight: false,
      };
    case ActionType.ResetQueue:
      return {
        ...initialState,
      };
    case ActionType.ResetErrorFiles:
      return {
        ...state,
        errorFiles: [...state.errorFiles.filter((element) => !element.isError)],
      };
    case ActionType.RemoveFile:
      return {
        ...state,
        files: [
          ...state.files.filter((element) => element.id !== action.elementId),
        ],
      };
    case ActionType.MarkFileUploadError: {
      const element = {
        ...state.files.find((element) => element.id === action.elementId)!,
      };
      element.isUploading = false;
      element.isUploaded = false;
      element.isError = true;
      element.errorCode = action.errorCode;

      return {
        ...state,
        files: [
          ...state.files.filter((element) => element.id !== action.elementId),
          element,
        ],
        errorFiles: [...state.errorFiles, element],
      };
    }
    case ActionType.MarkFileUploadSuccess: {
      const element = {
        ...state.files.find((element) => element.id === action.elementId)!,
      };
      element.file.id = action.fileId;
      element.isUploading = false;
      element.isUploaded = true;
      element.isError = false;

      return {
        ...state,
        files: [
          ...state.files.filter((element) => element.id !== action.elementId),
          element,
        ],
        uploadedFiles: [...state.uploadedFiles, element],
      };
    }
    default:
      return state;
  }
};

export const useFileUploadQueue = () => {
  const { upload: uploadFile } = useFileUpload();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [deleteFile] = useMutation<useFileUploadQueueMutation>(mutation);

  const removeFromQueue = useCallback(
    (elementId: FileUploadQueueElement['id'], fileId?: FileWithId['id']) => {
      dispatch({ type: ActionType.RemoveFile, elementId });

      if (fileId) {
        deleteFile({
          variables: { input: { fileId } },
          onError: () => {
            console.error('Error deleting file for id: ', fileId);
          },
        });
      }
    },
    [deleteFile],
  );

  const upload = useCallback(
    async (files: FileWithId[]) => {
      const queue: FileUploadQueueElement[] = [];
      for (const file of files) {
        queue.push({
          id: generateId(),
          file,
          isUploading: true,
          isUploaded: false,
          isError: false,
        });
      }

      dispatch({ type: ActionType.InitializeQueue, files: queue });
      dispatch({ type: ActionType.BeginUpload });

      Promise.allSettled(
        queue.map((element) =>
          uploadFile(element.file).then((uploadResult) => {
            if (uploadResult.isError) {
              dispatch({
                type: ActionType.MarkFileUploadError,
                elementId: element.id,
                errorCode: uploadResult.errorCode!,
              });
            } else {
              dispatch({
                type: ActionType.MarkFileUploadSuccess,
                elementId: element.id,
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
    () => ({ queue: state, dispatch, upload, removeFromQueue }),
    [removeFromQueue, state, upload],
  );
};
