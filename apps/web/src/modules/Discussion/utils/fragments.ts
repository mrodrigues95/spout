import { gql } from '@apollo/client';

export const UserInfoFragment = gql`
  fragment UserInfo_user on User {
    id
    name
    email
    createdAt
    avatarUrl
  }
`;

export const MessageFragment = gql`
  fragment Message_message on Message {
    id
    content
    createdAt
    createdBy {
      ...UserInfo_user
    }
  }
  ${UserInfoFragment}
`;
