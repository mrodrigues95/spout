import { useContext } from 'react';
import { MenuContext, Modal as ModalEnum } from '../../MenuProvider';
import Modal from '../../../../../Modal';

const InviteStudents = () => {
  const { currentModal, setCurrentModal, selectedClassroom } = useContext(
    MenuContext
  )!;

  const isOpen = currentModal === ModalEnum.InviteStudents;

  return (
    <Modal isOpen={isOpen} onClose={() => setCurrentModal(null)}>
      <Modal.Header
        title={`Invite students to ${selectedClassroom?.name}`}
        description="Add students to your classroom by sharing the invite link below"
        dismiss
      />
      <Modal.Content>Test</Modal.Content>
      <Modal.Footer>Test</Modal.Footer>
    </Modal>
  );
};

export default InviteStudents;
