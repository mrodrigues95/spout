import { GetServerSideProps } from 'next';
import { unauthenticatedRoute } from '../../shared/utils/redirects';

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute;

export { SignUpForm as default } from '../../modules';
