import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '../modules/Auth';
import { Home } from '../modules';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { Home as default };
