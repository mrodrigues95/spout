import { Meta } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button';
import { Modal } from './modal';

export default {
  component: Modal,
  title: 'Modal',
} as Meta;

export const Primary = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Toggle Modal
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header
            title="Title"
            description="This is a description"
            dismiss
          />
          <Modal.Body>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export const WithoutFooter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Toggle Modal
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header
            title="Title"
            description="This is a description"
            dismiss
          />
          <Modal.Body>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
