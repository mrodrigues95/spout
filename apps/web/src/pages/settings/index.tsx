import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '../../shared/utils';
import { MyPageProps } from '../_app';

export const getServerSideProps: GetServerSideProps<MyPageProps> =
  authenticatedRoute;

export { Settings as default } from '../../modules';
