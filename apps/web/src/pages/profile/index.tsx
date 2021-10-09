import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '../../modules';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { Profile as default } from '../../modules'
