import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '~/modules/Auth/utils';
import Discussion from '~/modules/Discussion/components';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default Discussion;
