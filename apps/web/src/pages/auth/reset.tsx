import { GetServerSideProps } from 'next';
import { unauthenticatedRoute } from '../../shared/utils/redirects';
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

  return unauthenticatedRoute(ctx);
};

export { ResetPassword as default } from '../../modules';
