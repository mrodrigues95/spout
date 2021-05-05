import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '~/shared/utils/redirects';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { Home as default } from '~/modules';
