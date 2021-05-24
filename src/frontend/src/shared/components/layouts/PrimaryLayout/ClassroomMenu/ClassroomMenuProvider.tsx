import { createContext, ReactNode, useMemo, useState } from 'react';

export enum ActiveMenu {
  CLASSROOMS,
  DISCUSSIONS,
}

interface ClassroomMenuContextType {
  activeMenu: ActiveMenu;
  selectedClassroom: any;
  setActiveMenu: (activeMenu: ActiveMenu) => void;
  setSelectedClassroom: (classroom: any) => void;
}

export const ClassroomMenuContext = createContext<ClassroomMenuContextType | null>(
  null
);

const ClassroomMenuProvider = ({ children }: { children: ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState(ActiveMenu.CLASSROOMS);
  const [selectedClassroom, setSelectedClassroom] = useState<any | null>(null);

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
