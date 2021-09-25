import { GetServerSideProps } from 'next';
import { unauthenticatedRoute } from '../../modules';

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute;

export { SignUpForm as default } from '../../modules';
