import * as Types from '../../../../__generated__/schema.generated';

export type SignUpMutationVariables = Types.Exact<{
  input: Types.SignUpInput;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'SignUpPayload' }
    & { authPayload?: Types.Maybe<(
      { __typename?: 'AuthPayload' }
      & { session?: Types.Maybe<(
        { __typename?: 'Session' }
        & Pick<Types.Session, 'id'>
      )> }
    )>, errors?: Types.Maybe<Array<(
      { __typename?: 'SignUpNewUserError' }
      & Pick<Types.SignUpNewUserError, 'message'>
    )>> }
  ) }
);
