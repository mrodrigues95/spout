import { useCallback, useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { generateId, Spinner, Form, Modal } from '@spout/toolkit';
import {
  CreateClassroomInviteMutation,
  CreateClassroomInviteMutationVariables,
} from './__generated__/Invite.generated';
import { ClassroomActionCard } from '../ClassroomCard';
import { Props as OverviewProps } from '../../../ClassroomOverview';
import { ClassroomOverviewContext } from '../../ClassroomOverviewProvider';
import InviteSettings, {
  InviteSettings as InviteSettingsType,
} from './InviteSettings';
import CopyInvite from './CopyInvite';

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

interface Props extends Pick<OverviewProps, 'classroom'> {}

const Invite = ({ classroom }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { classroomInvite, setClassroomInvite } = useContext(
    ClassroomOverviewContext
  )!;

  const [createInvite, { data, loading, error }] = useMutation<
    CreateClassroomInviteMutation,
    CreateClassroomInviteMutationVariables
  >(mutation, {
    onCompleted: (data) => {
      setClassroomInvite(data.createClassroomInvite.invite);
      form.reset();
    },
  });

  const form = useForm<Pick<InviteSettingsType, 'maxAge' | 'maxUses'>>({
    defaultValues,
  });

  useEffect(() => {
    // Create invite on initial mount.
    if (!data && !loading && !error) {
      createInvite({
        variables: {
          input: {
            classroomId: classroom.id,
            code: classroomInvite?.code,
          },
        },
      });
    }
  }, [data, loading, error, createInvite, classroomInvite, classroom]);

  const onSubmit = useCallback(
    ({ maxAge, maxUses }: InviteSettingsType) =>
      createInvite({
        variables: {
          input: {
            classroomId: classroom.id,
            maxAge: maxAge?.value,
            maxUses: maxUses?.value,
          },
        },
      }),
    [createInvite, classroom]
  );

  const labelId = `spout-classroom-invite-label-${generateId()}`;
  const descId = `spout-classroom-invite-desc-${generateId()}`;

  return (
    <>
      <ClassroomActionCard
        aria-labelledby={labelId}
        aria-describedby={descId}
        title="Invite"
        icon={<FontAwesomeIcon icon={faEnvelope} className="text-green-600" />}
        description={`Invite people to ${classroom.name}`}
        className="col-start-2"
        onClick={() => setIsOpen(true)}
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Form form={form} onSubmit={onSubmit}>
          <Modal.Content>
            <Modal.Header
              title={`Invite students to ${classroom.name}`}
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
    </>
  );
};

export default Invite;
