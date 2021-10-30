import { useState, ReactElement, createContext } from 'react';
import { generateId, Modal } from '@spout/toolkit';
import { ClassroomActionCard } from '../ClassroomCard';
import LeaveClassroom from './LeaveClassroom';
import Home from './Home';
import EditClassroom from './EditClassroom';

export const modals = {
  home: <Home />,
  edit: <EditClassroom />,
  leave: <LeaveClassroom />,
};

interface SettingsContextType {
  setModal: (modal: ReactElement) => void;
}

export const SettingsContext = createContext<SettingsContextType | null>(null);

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState<ReactElement>(modals['home']);

  const labelId = `spout-classroom-settings-label-${generateId()}`;
  const descId = `spout-classroom-settings-desc-${generateId()}`;

  return (
    <>
      <ClassroomActionCard
        aria-labelledby={labelId}
        aria-describedby={descId}
        title="⚙️ Settings"
        description="Manage your classroom"
        onClick={() => setIsOpen(true)}
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <SettingsContext.Provider value={{ setModal }}>
          <Modal.Content>{modal}</Modal.Content>
        </SettingsContext.Provider>
      </Modal>
    </>
  );
};

export default Settings;
