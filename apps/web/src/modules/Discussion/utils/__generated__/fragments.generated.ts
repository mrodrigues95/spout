import * as Types from '../../../../__generated__/schema.generated';

export type UserInfo_User = (
  { __typename?: 'User' }
  & Pick<Types.User, 'id' | 'name' | 'email' | 'createdAt'>
);

export type Message_Message = (
  { __typename?: 'Message' }
  & Pick<Types.Message, 'id' | 'content' | 'createdAt'>
  & { createdBy: (
    { __typename?: 'User' }
    & UserInfo_User
  ) }
);
