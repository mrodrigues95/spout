import * as Types from '../../../../../__generated__/schema.generated';

export type UserInfo_User = (
  { __typename?: 'User' }
  & Pick<Types.User, 'id' | 'name' | 'email' | 'createdAt' | 'avatarUrl' | 'profileColor'>
);

export type File_File = (
  { __typename?: 'File' }
  & Pick<Types.File, 'id' | 'name' | 'contentLength' | 'extension' | 'location' | 'mimeType' | 'createdAt'>
  & { uploadedBy: (
    { __typename?: 'User' }
    & UserInfo_User
  ) }
);

export type Message_Message = (
  { __typename?: 'Message' }
  & Pick<Types.Message, 'id' | 'content' | 'createdAt' | 'isDiscussionEvent' | 'discussionEvent'>
  & { attachments: Array<(
    { __typename?: 'File' }
    & File_File
  )>, createdBy: (
    { __typename?: 'User' }
    & UserInfo_User
  ) }
);
