import { Suspense } from 'react';
import ViewClassroom from './ViewClassroom';

const Classrooms = () => {
  // TODO: Create loading indicator and add error boundary.
  return (
    <Suspense fallback={null}>
      <ViewClassroom />
    </Suspense>
  );
};

export default Classrooms;
