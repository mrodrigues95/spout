import { GetServerSideProps } from 'next';
import { unauthenticatedRoute } from '../../shared/utils/redirects';
import { MyPageProps } from '../_app';

export const getServerSideProps: GetServerSideProps<MyPageProps> =
  unauthenticatedRoute;

export { LoginForm as default } from '../../modules';
