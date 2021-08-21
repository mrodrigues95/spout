import * as Types from '../../../../../../../__generated__/schema.generated';

export type ClassroomsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ClassroomsQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id'>
    & { classrooms: Array<(
      { __typename?: 'Classroom' }
      & Pick<Types.Classroom, 'id' | 'name'>
      & { discussions?: Types.Maybe<Array<Types.Maybe<(
        { __typename?: 'Discussion' }
        & Pick<Types.Discussion, 'id' | 'name'>
      )>>> }
    )> }
  )> }
);
