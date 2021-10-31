import { GetServerSideProps } from 'next';
import { authenticatedRoute } from '../../modules';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { Classrooms as default } from '../../modules';
