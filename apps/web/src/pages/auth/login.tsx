import { GetServerSideProps } from 'next';
import { unauthenticatedRoute } from '../../modules';

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute;

export { LoginForm as default } from '../../modules';
