import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '~/modules/Auth/utils';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { Classrooms as default } from '~/modules'
