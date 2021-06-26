import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '~/modules';
import { Discussion } from '~/modules';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { Discussion as default };
