import { Dispatch, Suspense, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import z from 'zod';
import { Form, Modal, Button, useZodForm, Spinner } from '@spout/toolkit';
import {
  ErrorBoundary,
  ErrorFallback,
  useToast,
} from '../../../../../../shared/components';
import InviteSettings, { MAX_AGE, MAX_USES } from './InviteSettings';
import CopyInvite from './CopyInvite';
import { InviteMutation } from './__generated__/InviteMutation.graphql';
import { InviteQuery } from './__generated__/InviteQuery.graphql';
import { Action, ActionType } from '../MenuActions';

export const inviteSchema = z.object({
  maxAge: z.number(),
  maxUses: z.number().optional(),
});

const mutation = graphql`
  mutation InviteMutation($input: CreateClassroomInviteInput!) {
    createClassroomInvite(input: $input) {
      classroomInvite {
        ...CopyInvite_classroom
      }
    }
  }
`;

const query = graphql`
  query InviteQuery($id: ID!) {
    classroomById(id: $id) {
      id
      name
      invites {
        ...CopyInvite_classroom
      }
    }
  }
`;

interface InviteModalProps {
  fetchKey: number;
  close(): void;
}

const InviteModal = ({ fetchKey, close }: InviteModalProps) => {
  const router = useRouter();
  const { classroomById } = useLazyLoadQuery<InviteQuery>(
    query,
    {
      id: router.query.classroomId as string,
    },
    { fetchKey, fetchPolicy: 'store-and-network' },
  );
  const [commit, isInFlight] = useMutation<InviteMutation>(mutation);
  const { handleError } = useToast();

  const form = useZodForm({
    schema: inviteSchema,
    defaultValues: {
      maxAge: MAX_AGE['never'].value,
      maxUses: MAX_USES['unlimited'].value,
    },
  });

  const createInvite = useCallback(
    ({ maxAge, maxUses }: { maxAge?: number; maxUses?: number } = {}) => {
      commit({
        variables: {
          input: {
            classroomId: classroomById.id,
            maxAge,
            maxUses,
          },
        },
        onError: () => handleError(),
        onCompleted: () => form.reset(),
        updater: (store) => {
          const invite = store
            .getRootField('createClassroomInvite')
            .getLinkedRecord('classroomInvite');

          const classroomRecord = store.get(classroomById.id);
          if (!classroomRecord) {
            throw new Error(
              `Unable to get classroom record for classroomId: ${classroomById.id}`,
            );
          }

          const invites = classroomRecord.getLinkedRecords('invites') || [];
          classroomRecord.setLinkedRecords([invite, ...invites], 'invites');
        },
      });
    },
    [classroomById.id, commit, form, handleError],
  );

  useEffect(() => {
    // Create invite right away if none exist.
    if (!classroomById.invites.length) createInvite();
  }, [classroomById.invites.length, createInvite]);

  const onSubmit = useCallback(
    ({ maxAge, maxUses }: z.infer<typeof inviteSchema>) =>
      createInvite({ maxAge, maxUses }),
    [createInvite],
  );

  return (
    <>
      <Modal.Header
        title={`Invite students to ${classroomById.name}`}
        description="Add students to your classroom by sharing the invite code below."
      />
      <Form form={form} onSubmit={onSubmit}>
        <Modal.Body>
          <CopyInvite invite={classroomById.invites[0]} />
          <InviteSettings control={form.control} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="tertiary"
            onClick={close}
            disabled={isInFlight}
          >
            Cancel
          </Button>
          <Form.SubmitButton
            size="sm"
            variant="primary"
            loading={isInFlight}
            loadingText="Creating..."
          >
            Create
          </Form.SubmitButton>
        </Modal.Footer>
      </Form>
    </>
  );
};

interface Props {
  dispatch: Dispatch<Action>;
}

const Invite = ({ dispatch }: Props) => {
  const close = () => dispatch({ type: ActionType.Invite, isOpen: false });

  return (
    <Modal isOpen onClose={close}>
      <Modal.Overlay />
      <Modal.Content>
        <ErrorBoundary
          FallbackComponent={({ resetErrorBoundary }) => (
            <Modal.Body className="py-6">
              <ErrorFallback action={resetErrorBoundary} />
            </Modal.Body>
          )}
        >
          {({ fetchKey }) => (
            <Suspense
              fallback={
                <Modal.Body className="py-6">
                  <Spinner center size="lg" className="flex-1" />
                </Modal.Body>
              }
            >
              <InviteModal close={close} fetchKey={fetchKey} />
            </Suspense>
          )}
        </ErrorBoundary>
      </Modal.Content>
    </Modal>
  );
};

export default Invite;
