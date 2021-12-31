import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '../../shared/utils';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { Settings as default } from '../../modules';
