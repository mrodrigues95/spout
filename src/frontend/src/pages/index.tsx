import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '~/modules';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { Home as default } from '~/modules';
