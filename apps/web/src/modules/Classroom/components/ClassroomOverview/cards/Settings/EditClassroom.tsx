import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Form } from '@spout/toolkit';
import { SettingsContext, modals } from './Settings';

const EditClassroom = () => {
  const form = useForm();
  const { setModal } = useContext(SettingsContext)!;

  return (
    <Form form={form} onSubmit={() => console.log('test')}>
      <Modal.Header title="Edit" description="Update classroom details below" />
      <Modal.Footer className="!justify-between">
        <Button
          variant="unstyled"
          className="font-medium"
          onClick={() => setModal(modals['home'])}
        >
          Back
        </Button>
        <Form.SubmitButton size="sm" className="font-semibold">
          Update
        </Form.SubmitButton>
      </Modal.Footer>
    </Form>
  );
};

export default EditClassroom;
