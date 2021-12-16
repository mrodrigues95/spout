import * as Types from '../../../../../__generated__/schema.generated';

import { Message_Message, UserInfo_User } from '../../../../../modules/Classrooms/Discussion/utils/__generated__/fragments.generated';
export type SendDiscussionMessageMutationVariables = Types.Exact<{
  input: Types.SendDiscussionMessageInput;
}>;


export type SendDiscussionMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendDiscussionMessage: (
    { __typename?: 'SendDiscussionMessagePayload' }
    & { message?: Types.Maybe<(
      { __typename?: 'Message' }
      & Message_Message
    )>, userErrors?: Types.Maybe<Array<(
      { __typename?: 'UserError' }
      & Pick<Types.UserError, 'message' | 'code'>
    )>> }
  ) }
);
