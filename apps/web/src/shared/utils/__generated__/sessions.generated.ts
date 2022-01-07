import * as Types from '../../../__generated__/schema.generated';

export type SessionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SessionQuery = (
  { __typename?: 'Query' }
  & { sessionById: (
    { __typename?: 'Session' }
    & Pick<Types.Session, 'id' | 'createdAt' | 'updatedAt' | 'expiresAt'>
  ) }
);

export type RefreshSessionMutationVariables = Types.Exact<{
  input: Types.RefreshSessionInput;
}>;


export type RefreshSessionMutation = (
  { __typename?: 'Mutation' }
  & { refreshSession: (
    { __typename?: 'RefreshSessionPayload' }
    & { authPayload?: Types.Maybe<(
      { __typename?: 'AuthPayload' }
      & { session?: Types.Maybe<(
        { __typename?: 'Session' }
        & Pick<Types.Session, 'id' | 'createdAt' | 'updatedAt' | 'expiresAt'>
      )> }
    )> }
  ) }
);
