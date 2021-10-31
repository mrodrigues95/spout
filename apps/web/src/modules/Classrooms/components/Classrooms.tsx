import { useRouter } from 'next/router';
import ViewClassroom from './ViewClassroom';

const Classrooms = () => {
  const router = useRouter();

  return <ViewClassroom classroomId={router.query.classroomId as string} />;
};

export default Classrooms;
