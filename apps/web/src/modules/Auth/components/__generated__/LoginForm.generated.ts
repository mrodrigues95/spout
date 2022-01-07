import * as Types from '../../../../__generated__/schema.generated';

export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginPayload' }
    & { authPayload?: Types.Maybe<(
      { __typename?: 'AuthPayload' }
      & { session?: Types.Maybe<(
        { __typename?: 'Session' }
        & Pick<Types.Session, 'id'>
      )> }
    )>, errors?: Types.Maybe<Array<(
      { __typename?: 'LoginUserError' }
      & Pick<Types.LoginUserError, 'message'>
    )>> }
  ) }
);
