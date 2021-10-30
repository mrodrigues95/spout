import * as Types from '../../../../../../../__generated__/schema.generated';

export type CreateClassroomInviteMutationVariables = Types.Exact<{
  input: Types.CreateClassroomInviteInput;
}>;


export type CreateClassroomInviteMutation = (
  { __typename?: 'Mutation' }
  & { createClassroomInvite: (
    { __typename?: 'CreateClassroomInvitePayload' }
    & { invite: (
      { __typename?: 'Invite' }
      & Pick<Types.Invite, 'id' | 'code' | 'uses' | 'maxUses' | 'maxAge' | 'expiresAt' | 'createdAt'>
    ) }
  ) }
);
