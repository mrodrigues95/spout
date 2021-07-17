import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '~/modules/Auth/utils';
import Home from '~/modules/Home/components';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { Home as default };
