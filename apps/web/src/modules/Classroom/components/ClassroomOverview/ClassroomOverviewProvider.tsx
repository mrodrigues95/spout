import { createContext, ReactNode, useMemo, useState } from 'react';

export type ClassroomInvite = any;

interface ClassroomOverviewContextType {
  classroomInvite: ClassroomInvite;
  setClassroomInvite: (invite: ClassroomInvite) => void;
}

export const ClassroomOverviewContext =
  createContext<ClassroomOverviewContextType | null>(null);

const ClassroomOverviewProvider = ({ children }: { children: ReactNode }) => {
  const [classroomInvite, setClassroomInvite] = useState<ClassroomInvite>(null);

  const values = useMemo(
    () => ({
      classroomInvite,
      setClassroomInvite,
    }),
    [classroomInvite],
  );

  return (
    <ClassroomOverviewContext.Provider value={values}>
      {children}
    </ClassroomOverviewContext.Provider>
  );
};

export default ClassroomOverviewProvider;
