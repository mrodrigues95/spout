import * as Types from '../../../../../__generated__/schema.generated';

export type DiscussionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DiscussionQuery = (
  { __typename?: 'Query' }
  & { discussionById: (
    { __typename?: 'Discussion' }
    & Pick<Types.Discussion, 'id' | 'name'>
  ) }
);
