import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '~/modules';
import { preloadQuery } from '~/shared/utils/apollo';
import { Discussion, DISCUSSION_QUERY as query } from '~/modules';

export const getServerSideProps: GetServerSideProps<
  {},
  {
    discussionId: string;
  }
> = async (ctx) => {
  const auth = await authenticatedRoute(ctx);
  if ('redirect' in auth) return auth;

  return preloadQuery(ctx, {
    query,
    variables: {
      id: ctx.params!.discussionId,
    },
  });
};

export { Discussion as default };
