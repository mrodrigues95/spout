import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '../../shared/utils';
import { Home } from '../../modules';
import { MyPageProps } from '../_app';

export const getServerSideProps: GetServerSideProps<MyPageProps> =
  authenticatedRoute;

export { Home as default };
