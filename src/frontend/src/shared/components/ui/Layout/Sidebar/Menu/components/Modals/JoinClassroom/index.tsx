import { useContext, useEffect, useState } from 'react';
import { MenuContext } from '../../../MenuProvider';
import Modal from '../../../../../../Modal';
import Button from '../../../../../../Button';
import Spinner from '../../../../../../Spinner';
import Input from '../../../../../../Input';

const JoinClassroom = () => {
  const { currentModal, setCurrentModal } = useContext(MenuContext)!;

  const isOpen = currentModal === 'join';

  return (
    <Modal isOpen={isOpen} onClose={() => setCurrentModal(null)}>
      <Modal.Content>
        <Modal.Header
          title="Join a Classroom"
          description="Enter an invite below to join an existing classroom"
          dismiss
        />

          {/* <Input label="Invite link" /> */}
        
      </Modal.Content>
      <Modal.Footer>
        <Button className="font-semibold" onClick={() => {}}>
          Join
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JoinClassroom;
