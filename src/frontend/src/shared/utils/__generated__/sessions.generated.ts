import * as Types from '../../../__generated__/schema.generated';

export type SessionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SessionQuery = (
  { __typename?: 'Query' }
  & { sessionById: (
    { __typename?: 'Session' }
    & Pick<Types.Session, 'id' | 'createdAt' | 'updatedAt'>
  ) }
);
