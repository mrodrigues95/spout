import React from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { NextPage } from 'next';
import { testQuery } from './__generated__/testQuery.graphql';

const query = graphql`
  query testQuery {
    users {
      id
    }
  }
`;

const Test: NextPage = () => {
  const data = useLazyLoadQuery<testQuery>(query, {});

  return (
    <div>
      <div>About {data.users[0].id}</div>
    </div>
  );
};

export default Test;
