import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '../../modules';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { Settings as default } from '../../modules';
