import { createContext, ReactNode, useMemo, useState } from 'react';
import { Classroom } from '~/__generated__/schema.generated';

export enum Menu {
  Classrooms,
  Discussions,
}

export enum Modal {
  InviteStudents,
}

interface MenuContextType {
  currentMenu: Menu;
  setCurrentMenu: (menu: Menu) => void;
  currentModal: Modal | null;
  setCurrentModal: (modal: Modal | null) => void;
  selectedClassroom: Partial<Classroom> | null;
  setSelectedClassroom: (classroom: Partial<Classroom> | null) => void;
}

export const MenuContext = createContext<MenuContextType | null>(null);

const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [currentMenu, setCurrentMenu] = useState<Menu>(Menu.Classrooms);
  const [selectedClassroom, setSelectedClassroom] = useState<Partial<
    Classroom
  > | null>(null);
  const [currentModal, setCurrentModal] = useState<Modal | null>(null);

  const values = useMemo(
    () => ({
      currentMenu,
      setCurrentMenu,
      currentModal,
      setCurrentModal,
      selectedClassroom,
      setSelectedClassroom,
    }),
    [currentMenu, currentModal, selectedClassroom]
  );

  return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>;
};

export default MenuProvider;
