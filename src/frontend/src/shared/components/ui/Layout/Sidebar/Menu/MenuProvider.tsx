import { createContext, ReactNode, useMemo, useState } from 'react';
import { Classroom } from '~/__generated__/schema.generated';

export enum Menus {
  Classroom,
  Discussion,
}

export enum Modals {
  InviteStudents,
}

interface MenuContextType {
  currentMenu: Menus;
  setCurrentMenu: (menu: Menus) => void;
  currentModal: Modals | null;
  setCurrentModal: (modal: Modals | null) => void;
  selectedClassroom: Partial<Classroom> | null;
  setSelectedClassroom: (classroom: Partial<Classroom> | null) => void;
}

export const MenuContext = createContext<MenuContextType | null>(null);

const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [currentMenu, setCurrentMenu] = useState<Menus>(Menus.Classroom);
  const [selectedClassroom, setSelectedClassroom] = useState<Partial<
    Classroom
  > | null>(null);
  const [currentModal, setCurrentModal] = useState<Modals | null>(null);

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
