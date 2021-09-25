import { useCallback, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { Spinner, Form, Modal } from '@spout/toolkit';
import { MenuContext } from '../../../MenuProvider';
import {
  CreateClassroomInviteMutation,
  CreateClassroomInviteMutationVariables,
} from './__generated__/index.generated';
import CopyInvite from './CopyInvite';
import InviteSettings, {
  InviteSettings as InviteSettingsType,
} from './InviteSettings';

const defaultValues: InviteSettingsType = {
  maxAge: null,
  maxUses: null,
};

const mutation = gql`
  mutation CreateClassroomInviteMutation($input: CreateClassroomInviteInput!) {
    createClassroomInvite(input: $input) {
      invite {
        id
        code
        uses
        maxUses
        maxAge
        expiresAt
        createdAt
      }
    }
  }
`;

const InviteStudents = () => {
  const {
    selectedClassroom,
    currentModal,
    setCurrentModal,
    classroomInvite,
    setClassroomInvite,
  } = useContext(MenuContext)!;

  const form = useForm<Pick<InviteSettingsType, 'maxAge' | 'maxUses'>>({
    defaultValues,
  });

  const [createInvite, { data, loading, error }] = useMutation<
    CreateClassroomInviteMutation,
    CreateClassroomInviteMutationVariables
  >(mutation, {
    onCompleted: (data) => {
      setClassroomInvite(data.createClassroomInvite.invite);
      form.reset();
    },
  });

  useEffect(() => {
    // Create invite on initial mount.
    if (!data && !loading && !error) {
      createInvite({
        variables: {
          input: {
            classroomId: selectedClassroom!.id!,
            code: classroomInvite?.code,
          },
        },
      });
    }
  }, [data, loading, error, createInvite, classroomInvite, selectedClassroom]);

  const onSubmit = useCallback(
    ({ maxAge, maxUses }: InviteSettingsType) =>
      createInvite({
        variables: {
          input: {
            classroomId: selectedClassroom!.id!,
            maxAge: maxAge?.value,
            maxUses: maxUses?.value,
          },
        },
      }),
    [createInvite, selectedClassroom]
  );

  const isOpen = currentModal === 'invite';

  return (
    <Modal isOpen={isOpen} onClose={() => setCurrentModal(null)}>
      <Modal.Overlay />
      <Form form={form} onSubmit={onSubmit}>
        <Modal.Content>
          <Modal.Header
            title={`Invite students to ${selectedClassroom!.name}`}
            description="Add students to your classroom by sharing the invite link below"
            dismiss
          />
          <Modal.Body>
            <div>
              {loading && <Spinner size="sm" srLabel="Generating invite" />}
              {data && (
                <CopyInvite invite={data.createClassroomInvite.invite} />
              )}
            </div>
            <InviteSettings control={form.control} />
          </Modal.Body>
          <Modal.Footer>
            <Form.SubmitButton
              size="sm"
              disabled={!form.formState.isDirty || loading}
              className="font-semibold"
            >
              Generate Invite
            </Form.SubmitButton>
          </Modal.Footer>
        </Modal.Content>
      </Form>
    </Modal>
  );
};

export default InviteStudents;
