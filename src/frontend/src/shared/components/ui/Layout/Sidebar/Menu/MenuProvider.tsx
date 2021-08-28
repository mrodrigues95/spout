import { createContext, ReactNode, useMemo, useState } from 'react';
import { Classroom } from '~/__generated__/schema.generated';
import { CreateClassroomInviteMutation } from './components/Modals/InviteStudents/__generated__/index.generated';

export enum Menus {
  Classroom,
  Discussion,
}

export enum Modals {
  InviteStudents,
}

export type ClassroomInvite =
  | CreateClassroomInviteMutation['createClassroomInvite']['invite']
  | null;

interface MenuContextType {
  currentMenu: Menus;
  setCurrentMenu: (menu: Menus) => void;
  currentModal: Modals | null;
  setCurrentModal: (modal: Modals | null) => void;
  selectedClassroom: Partial<Classroom> | null;
  setSelectedClassroom: (classroom: Partial<Classroom> | null) => void;
  classroomInvite: ClassroomInvite;
  setClassroomInvite: (invite: ClassroomInvite) => void;
}

export const MenuContext = createContext<MenuContextType | null>(null);

const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [currentMenu, setCurrentMenu] = useState<Menus>(Menus.Classroom);
  const [selectedClassroom, setSelectedClassroom] = useState<Partial<
    Classroom
  > | null>(null);
  const [currentModal, setCurrentModal] = useState<Modals | null>(null);
  const [classroomInvite, setClassroomInvite] = useState<ClassroomInvite>(null);

  const values = useMemo(
    () => ({
      currentMenu,
      setCurrentMenu,
      currentModal,
      setCurrentModal,
      selectedClassroom,
      setSelectedClassroom,
      classroomInvite,
      setClassroomInvite,
    }),
    [currentMenu, currentModal, selectedClassroom, classroomInvite]
  );

  return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>;
};

export default MenuProvider;
