import { Story, Meta } from '@storybook/react';
import { Modal, ModalProps } from './modal';

export default {
  component: Modal,
  title: 'Modal',
} as Meta;

const Primary = () => {
  return (
    <Modal isOpen={false} onClose={() => {}} style={{ width: '32rem' }}>
      <Modal.Content>
        <Modal.Header
          title="Create Your Classroom"
          description="Classrooms help you better manage your discussions"
          dismiss
        />
      </Modal.Content>
      <Modal.Footer>asdad</Modal.Footer>
    </Modal>
  );
};
