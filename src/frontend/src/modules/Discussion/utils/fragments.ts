import { gql } from '@apollo/client';

export const UserInfoFragment = gql`
  fragment UserInfo_user on User {
    id
    name
  }
`;

export const MessageFragment = gql`
  fragment Message_message on Message {
    id
    body
    createdAt
    createdBy {
      ...UserInfo_user
    }
  }
  ${UserInfoFragment}
`;