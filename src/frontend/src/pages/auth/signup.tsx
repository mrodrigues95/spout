import { GetServerSideProps } from 'next';
import { unauthenticatedRoute } from '~/modules/Auth/utils';
import SignUpForm from '~/modules/Auth/components/SignUpForm';

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute;

export default SignUpForm;
