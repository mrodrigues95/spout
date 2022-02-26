import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Form } from '@spout/toolkit';
import { SettingsContext, modals } from './Settings';

const LeaveClassroom = () => {
  const form = useForm();
  const { setModal } = useContext(SettingsContext)!;

  return (
    <Form form={form} onSubmit={() => console.log('test')}>
      <Modal.Header
        title="Leave"
        description="Are you sure you want to leave this classroom?"
        dismiss={false}
      />
      <Modal.Footer className="!justify-between">
        <Button
          variant="unstyled"
          className="font-medium"
          onClick={() => setModal(modals['home'])}
        >
          Back
        </Button>
        <Form.SubmitButton size="sm" className="font-semibold">
          Leave
        </Form.SubmitButton>
      </Modal.Footer>
    </Form>
  );
};

export default LeaveClassroom;
