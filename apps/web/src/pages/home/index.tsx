import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '../../shared/utils';
import { Home } from '../../modules';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { Home as default };
