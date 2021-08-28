import { useContext, useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { MenuContext, Modals } from '../../../MenuProvider';
import {
  CreateClassroomInviteMutation,
  CreateClassroomInviteMutationVariables,
} from './__generated__/index.generated';
import Modal from '../../../../../../Modal';
import Button from '../../../../../../Button';
import Spinner from '../../../../../../Spinner';
import CopyInvite from './CopyInvite';
import InviteSettings, { MaxAge, MaxUses } from './InviteSettings';

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

export interface InviteSettingsType {
  maxAge: MaxAge | null;
  maxUses: MaxUses | null;
  reset: (() => void) | null;
}

const InviteStudents = () => {
  const [settings, setSettings] = useState<InviteSettingsType>({
    maxAge: null,
    maxUses: null,
    reset: null,
  });
  const {
    selectedClassroom,
    currentModal,
    setCurrentModal,
    classroomInvite,
    setClassroomInvite,
  } = useContext(MenuContext)!;

  const isOpen = currentModal === Modals.InviteStudents;
  const { maxAge, maxUses, reset } = settings;

  const [createInvite, { data, loading, error }] = useMutation<
    CreateClassroomInviteMutation,
    CreateClassroomInviteMutationVariables
  >(mutation, {
    onCompleted: (data) => {
      setClassroomInvite(data.createClassroomInvite.invite);
      if (reset) reset();
    },
  });

  useEffect(() => {
    if (!data && !loading && !error) {
      createInvite({
        variables: {
          input: {
            classroomId: selectedClassroom!.id!,
            code: classroomInvite?.code,
            maxAge: maxAge?.value,
            maxUses: maxUses?.value,
          },
        },
      });
    }
  }, [
    data,
    loading,
    error,
    createInvite,
    classroomInvite,
    maxAge,
    maxUses,
    selectedClassroom,
  ]);

  return (
    <Modal isOpen={isOpen} onClose={() => setCurrentModal(null)}>
      <Modal.Content>
        <Modal.Header
          title={`Invite students to ${selectedClassroom!.name}`}
          description="Add students to your classroom by sharing the invite link below"
          dismiss
        />
        <div className="my-6">
          {loading && (
            <Spinner className="w-5 h-5 text-black" label="Generating invite" />
          )}
          {data && <CopyInvite invite={data.createClassroomInvite.invite} />}
        </div>
        <InviteSettings setSettings={setSettings} />
      </Modal.Content>
      <Modal.Footer>
        <Button
          className="text-sm"
          rounded="md"
          disabled={(!maxAge && !maxUses) || loading}
          onClick={() => {
            createInvite({
              variables: {
                input: {
                  classroomId: selectedClassroom!.id!,
                  maxAge: maxAge?.value,
                  maxUses: maxUses?.value,
                },
              },
            });
          }}
        >
          Generate Invite
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InviteStudents;
