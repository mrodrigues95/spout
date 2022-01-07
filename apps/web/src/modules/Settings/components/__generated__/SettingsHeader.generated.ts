import * as Types from '../../../../__generated__/schema.generated';

export type LogoutMutationVariables = Types.Exact<{
  input: Types.LogoutInput;
}>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'LogoutPayload' }
    & { authPayload?: Types.Maybe<(
      { __typename?: 'AuthPayload' }
      & Pick<Types.AuthPayload, 'isLoggedIn'>
    )> }
  ) }
);
