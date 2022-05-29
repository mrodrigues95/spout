import { useCallback, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { useRouter } from 'next/router';
import Zod, { object, string } from 'zod';
import {
  Button,
  Modal,
  Form,
  useZodForm,
  Text,
  Alert,
  Divider,
} from '@spout/toolkit';
import {
  useIsRedirecting,
  useModalStepper,
  useTimeout,
} from '../../../../hooks';
import { useToast } from '../../..';
import { CreateOrJoinClassroomJoinMutation } from './__generated__/CreateOrJoinClassroomJoinMutation.graphql';
import { CreateOrJoinClassroomCreateMutation } from './__generated__/CreateOrJoinClassroomCreateMutation.graphql';

const joinClassroomSchema = object({
  code: string().length(22, '- Invalid code (must be 22 characters)'),
});

interface JoinClassroomProps {
  onClose(refreshQuery?: boolean): void;
}

const JoinClassroom = ({ onClose }: JoinClassroomProps) => {
  const router = useRouter();
  const [joinClassroom, isInFlight] =
    useMutation<CreateOrJoinClassroomJoinMutation>(
      graphql`
        mutation CreateOrJoinClassroomJoinMutation(
          $input: JoinClassroomInput!
        ) {
          joinClassroom(input: $input) {
            classroom {
              id
              name
              teacher {
                id
              }
            }
            errors {
              ... on Error {
                __typename
                message
              }
            }
          }
        }
      `,
    );
  const isRedirecting = useIsRedirecting();
  const [inviteError, setInviteError] = useState({
    title: '',
    description: '',
    show: false,
  });
  const { handleError } = useToast();

  const form = useZodForm({
    schema: joinClassroomSchema,
  });

  const onSubmit = useCallback(
    ({ code }: Zod.infer<typeof joinClassroomSchema>) => {
      joinClassroom({
        variables: { input: { code } },
        onError: () => handleError(),
        onCompleted: ({ joinClassroom: { classroom, errors } }) => {
          if (!errors) {
            onClose(true);
            router.push(`/classrooms/${classroom!.id}/activity`);
            return;
          }

          const error = errors[0];
          switch (error.__typename) {
            case 'ClassroomNotFoundError':
              setInviteError({
                title: 'Classroom not found',
                description: 'This classroom no longer exists.',
                show: true,
              });
              return;
            case 'ClassroomInviteExpiredError':
              setInviteError({
                title: 'Invalid invite',
                description: 'This invite has expired or is no longer valid.',
                show: true,
              });
              return;
            default:
              return;
          }
        },
      });
    },
    [onClose, joinClassroom, handleError, router],
  );

  return (
    <>
      <Modal.Header
        title="Join a classroom"
        description="Enter your invite code below."
        dismiss
      />
      <Form form={form} onSubmit={onSubmit} className="space-y-0">
        <Modal.Body>
          {inviteError.show && (
            <Alert
              severity="error"
              title={inviteError.title}
              description={inviteError.description}
            />
          )}
          <Form.Input
            label="Invite code"
            placeholder="inzpizH6VkuHNhSVVqvH3Q"
            {...form.register('code')}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="tertiary" onClick={() => onClose()}>
            Cancel
          </Button>
          <Form.SubmitButton
            disabled={isRedirecting}
            loading={isInFlight}
            loadingText="Joining..."
            size="sm"
            className="font-semibold"
          >
            Join
          </Form.SubmitButton>
        </Modal.Footer>
      </Form>
    </>
  );
};

const createClassroomSchema = object({
  name: string()
    .min(1, '- Invalid name')
    .max(64, '- Invalid name (max. 64 characters)'),
});

interface CreateClassroomProps {
  onJoinClassroomClick(): void;
  onClose(refreshQuery?: boolean): void;
}

const CreateClassroom = ({
  onClose,
  onJoinClassroomClick,
}: CreateClassroomProps) => {
  const router = useRouter();
  const [createClassroom, isInFlight] =
    useMutation<CreateOrJoinClassroomCreateMutation>(
      graphql`
        mutation CreateOrJoinClassroomCreateMutation(
          $input: CreateClassroomInput!
        ) {
          createClassroom(input: $input) {
            classroom {
              id
              name
              teacher {
                id
              }
            }
          }
        }
      `,
    );
  const isRedirecting = useIsRedirecting();
  const { handleError } = useToast();

  const form = useZodForm({
    schema: createClassroomSchema,
  });

  const onSubmit = useCallback(
    ({ name }: Zod.infer<typeof createClassroomSchema>) => {
      createClassroom({
        variables: { input: { name } },
        onError: () => handleError(),
        onCompleted: ({ createClassroom }) => {
          onClose(true);
          router.push(`/classrooms/${createClassroom!.classroom!.id}/activity`);
        },
      });
    },
    [onClose, createClassroom, handleError, router],
  );

  return (
    <>
      <Modal.Header
        title="Create Your Classroom"
        description="Classrooms help you better manage your discussions with students."
        dismiss
      />
      <Form form={form} onSubmit={onSubmit} className="space-y-0">
        <Modal.Body>
          <Form.Input
            label="Classroom Name"
            placeholder="PROG3120 - Programming Fundamentals"
            {...form.register('name')}
          />
          <Divider className="w-2/3" />
          <div className="space-x-2.5 text-center">
            <Text as="span" size="sm">
              Have an invite code already?
            </Text>
            <Button
              size="xs"
              variant="secondary"
              onClick={onJoinClassroomClick}
            >
              Join
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="tertiary" onClick={() => onClose()}>
            Cancel
          </Button>
          <Form.SubmitButton
            disabled={isRedirecting}
            loading={isInFlight}
            loadingText="Creating..."
            size="sm"
            className="font-semibold"
          >
            Create Classroom
          </Form.SubmitButton>
        </Modal.Footer>
      </Form>
    </>
  );
};

interface Props {
  refreshQuery(): void;
}

const CreateOrJoinClassroom = ({ refreshQuery }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { timeout } = useTimeout();

  const onClose = useCallback(
    (refresh = false) => {
      if (refresh) refreshQuery();
      setIsOpen(false);
      timeout(() => setCurrentStep(1), 500);
    },
    [timeout, refreshQuery],
  );

  const { currentModalStep } = useModalStepper({
    currentStep,
    modals: [
      {
        modal: (
          <CreateClassroom
            onClose={onClose}
            onJoinClassroomClick={() => setCurrentStep(2)}
          />
        ),
        step: 1,
      },
      {
        modal: <JoinClassroom onClose={onClose} />,
        step: 2,
      },
    ],
  });

  return (
    <>
      <Button
        size="xs"
        className="rounded uppercase"
        onClick={() => setIsOpen(true)}
      >
        Create
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Overlay />
        <Modal.Content>{currentModalStep}</Modal.Content>
      </Modal>
    </>
  );
};

export default CreateOrJoinClassroom;
