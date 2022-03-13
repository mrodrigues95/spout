import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '../../shared/utils/redirects';
import { MyPageProps } from '../_app';

export const getServerSideProps: GetServerSideProps<MyPageProps> = async (
  ctx,
) => {
  const token = ctx.query.token as string;

  if (!token) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return authenticatedRoute(ctx);
};

export { ChangeEmail as default } from '../../modules';
