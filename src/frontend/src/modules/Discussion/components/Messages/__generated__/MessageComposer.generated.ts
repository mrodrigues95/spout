import * as Types from '../../../../../__generated__/schema.generated';

import { UserInfo_User } from '../../../utils/__generated__/fragments.generated';
export type SendDiscussionMessageMutationVariables = Types.Exact<{
  input: Types.SendDiscussionMessageInput;
}>;


export type SendDiscussionMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendDiscussionMessage: (
    { __typename?: 'SendDiscussionMessagePayload' }
    & { message?: Types.Maybe<(
      { __typename?: 'Message' }
      & Pick<Types.Message, 'id'>
    )>, userErrors?: Types.Maybe<Array<(
      { __typename?: 'UserError' }
      & Pick<Types.UserError, 'message' | 'code'>
    )>> }
  ) }
);

export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & UserInfo_User
  )> }
);
