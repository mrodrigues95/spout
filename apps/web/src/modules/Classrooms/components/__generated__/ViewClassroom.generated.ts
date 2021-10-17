import * as Types from '../../../../__generated__/schema.generated';

export type Classroom_Classroom = (
  { __typename?: 'Classroom' }
  & Pick<Types.Classroom, 'id' | 'name'>
  & { discussions: Array<(
    { __typename?: 'Discussion' }
    & Pick<Types.Discussion, 'id' | 'name'>
  )> }
);

export type ClassroomQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type ClassroomQuery = (
  { __typename?: 'Query' }
  & { classroomById: (
    { __typename?: 'Classroom' }
    & Classroom_Classroom
  ) }
);
