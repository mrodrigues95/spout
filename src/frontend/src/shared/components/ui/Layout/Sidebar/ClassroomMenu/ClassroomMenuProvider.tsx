import { createContext, ReactNode, useMemo, useState } from 'react';
import { Classroom } from '~/__generated__/schema.generated';

export enum ActiveMenu {
  CLASSROOMS,
  DISCUSSIONS,
}

interface ClassroomMenuContextType {
  activeMenu: ActiveMenu;
  selectedClassroom: Partial<Classroom> | null;
  setActiveMenu: (activeMenu: ActiveMenu) => void;
  setSelectedClassroom: (classroom: Partial<Classroom> | null) => void;
}

export const ClassroomMenuContext = createContext<ClassroomMenuContextType | null>(
  null
);

const ClassroomMenuProvider = ({ children }: { children: ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState(ActiveMenu.CLASSROOMS);
  const [selectedClassroom, setSelectedClassroom] = useState<Partial<
    Classroom
  > | null>(null);

  const values = useMemo(
    () => ({
      activeMenu,
      setActiveMenu,
      selectedClassroom,
      setSelectedClassroom,
    }),
    [activeMenu, selectedClassroom]
  );

  return (
    <ClassroomMenuContext.Provider value={values}>
      {children}
    </ClassroomMenuContext.Provider>
  );
};

export default ClassroomMenuProvider;
