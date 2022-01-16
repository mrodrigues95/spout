import { createContext, ReactNode, useMemo, useState } from 'react';
import { InviteMutation$data } from './cards/Invite/__generated__/InviteMutation.graphql';

export type ClassroomInvite = InviteMutation$data['createClassroomInvite']['invite'];

interface ClassroomOverviewContextType {
  classroomInvite: ClassroomInvite;
  setClassroomInvite: (invite: ClassroomInvite) => void;
}

export const ClassroomOverviewContext = createContext<ClassroomOverviewContextType | null>(
  null
);

const ClassroomOverviewProvider = ({ children }: { children: ReactNode }) => {
  const [classroomInvite, setClassroomInvite] = useState<ClassroomInvite>(null);

  const values = useMemo(
    () => ({
      classroomInvite,
      setClassroomInvite,
    }),
    [classroomInvite]
  );

  return (
    <ClassroomOverviewContext.Provider value={values}>
      {children}
    </ClassroomOverviewContext.Provider>
  );
};

export default ClassroomOverviewProvider;
