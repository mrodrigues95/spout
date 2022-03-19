// import { useCallback, useState } from 'react';
// import { graphql, useMutation } from 'react-relay';
// import Zod, { object, string } from 'zod';
// import { useRouter } from 'next/router';
// import { Button, Title, Text, Modal, Form, useZodForm } from '@spout/toolkit';
// import { useSettings } from '../SettingsProvider';
// import { useToast, PhoneInput } from '../../../../shared/components';

import { useState } from 'react';
import { Button, Title, Text, Modal } from '@spout/toolkit';
import { PhoneInput } from '../../../../shared/components';

const SettingsChangePhoneNumber = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center">
      <div className="flex-1">
        <Title as="h2" variant="h5" className="font-medium">
          Phone Number
        </Title>
        <Text size="sm">
          There is currently no phone number associated with your account.
        </Text>
      </div>
      <Button onClick={() => setIsOpen(true)}>Change Phone Number</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Modal.Content className="w-[18rem] sm:w-[30rem]">
          <Modal.Header
            title="Add a Phone Number"
            description="Your phone number can be used to log in and enable two-factor authentication."
          />
          <Modal.Body>
            <PhoneInput />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default SettingsChangePhoneNumber;
