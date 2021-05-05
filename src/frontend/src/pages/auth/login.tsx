import { GetServerSideProps } from 'next';
import { unauthenticatedRoute } from '~/shared/utils/redirects';

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute;

export { LoginForm as default } from '~/modules';
