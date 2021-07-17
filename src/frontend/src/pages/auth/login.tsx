import { GetServerSideProps } from 'next';
import { unauthenticatedRoute } from '~/modules/Auth/utils';
import LoginForm from '~/modules/Auth/components/LoginForm';

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute;

export default LoginForm;