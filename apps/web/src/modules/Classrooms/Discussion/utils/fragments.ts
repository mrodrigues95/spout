import { gql } from '@apollo/client';

export const FileFragment = gql`
  fragment File_file on File {
    id
    name
    contentLength
    extension
    location
    mimeType
  }
`;

export const UserInfoFragment = gql`
  fragment UserInfo_user on User {
    id
    name
    email
    createdAt
    avatarUrl
    profileColor
  }
`;

export const MessageFragment = gql`
  fragment Message_message on Message {
    id
    content
    createdAt
    isDiscussionEvent
    discussionEvent
    attachments {
      ...File_file
    }
    createdBy {
      ...UserInfo_user
    }
  }
  ${UserInfoFragment}
  ${FileFragment}
`;
