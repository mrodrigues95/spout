import * as Types from '../../../../../../__generated__/schema.generated';

import { UserInfo_User, File_File } from '../../../utils/__generated__/fragments.generated';
export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & UserInfo_User
  )> }
);
