import { Suspense } from 'react';
import ViewDiscussion from './ViewDiscussion';

const Classrooms = () => {
  // TODO: Create loading indicator and add error boundary.
  return (
    <Suspense fallback={null}>
      <ViewDiscussion />
    </Suspense>
  );
};

export default Classrooms;
