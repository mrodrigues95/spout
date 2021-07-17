import { GetServerSideProps } from 'next';
import { unauthenticatedRoute } from '~/modules/Auth/utils';

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute;

export { SignUpForm as default } from '~/modules';
