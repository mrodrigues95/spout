import * as Types from '../../../../__generated__/schema.generated';

import { UserInfo_User } from '../../../Classrooms/Discussion/utils/__generated__/fragments.generated';
export type UpdateAvatarVariables = Types.Exact<{
  input: Types.UpdateAvatarInput;
}>;


export type UpdateAvatar = (
  { __typename?: 'Mutation' }
  & { updateAvatar: (
    { __typename?: 'UpdateAvatarPayload' }
    & { user?: Types.Maybe<(
      { __typename?: 'User' }
      & UserInfo_User
    )>, userErrors?: Types.Maybe<Array<(
      { __typename?: 'UserError' }
      & Pick<Types.UserError, 'message' | 'code'>
    )>> }
  ) }
);
