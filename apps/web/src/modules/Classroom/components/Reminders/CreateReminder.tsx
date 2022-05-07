import { useCallback, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import {
  endOfDay,
  isFuture,
  isToday,
  roundToNearestMinutes,
  set,
} from 'date-fns';
import { useController, useWatch } from 'react-hook-form';
import z from 'zod';
import clsx from 'clsx';
import { faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Divider,
  Form,
  Modal,
  RadioGroup,
  useZodForm,
} from '@spout/toolkit';
import { useToast } from '../../../../shared/components';
import { useReminders } from './RemindersProvider';
import { CreateReminder_classroom$key } from './__generated__/CreateReminder_classroom.graphql';
import {
  CreateReminderMutation,
  ClassroomReminderImportance,
} from './__generated__/CreateReminderMutation.graphql';

const mergeDateTime = (date: Date, time: Date) =>
  set(date, {
    hours: time.getHours(),
    minutes: time.getMinutes(),
  });

const createReminderSchema = z
  .object({
    title: z
      .string()
      .min(1, '- Invalid title')
      .max(128, ' - Maxiumum 128 characters'),
    description: z.union([
      z
        .string()
        .min(1, '- Invalid description')
        .max(256, '- Maxium 256 characters'),
      z.string().optional(),
    ]),
    date: z.date({
      required_error: '- Invalid date',
      invalid_type_error: '- Invalid date',
    }),
    time: z.date({
      required_error: '- Invalid time',
      invalid_type_error: '- Invalid time',
    }),
    importance: z.string(),
  })
  .refine(
    (data) => {
      const dueAt = mergeDateTime(data.date, data.time);
      return isFuture(dueAt);
    },
    {
      message: '- Must be in the future',
      path: ['time'],
    },
  );

const importanceOptions = [
  {
    label: 'Low',
    description: 'Not important',
    value: 'LOW',
  },
  {
    label: 'Medium',
    description: 'Important',
    value: 'MEDIUM',
  },
  {
    label: 'High',
    description: 'Very important',
    value: 'HIGH',
  },
];

const fragment = graphql`
  fragment CreateReminder_classroom on Classroom {
    id
  }
`;

const mutation = graphql`
  mutation CreateReminderMutation($input: CreateClassroomReminderInput!) {
    createClassroomReminder(input: $input) {
      classroomReminder {
        ...Reminder_classroomReminder
      }
    }
  }
`;

interface Props {
  classroom: CreateReminder_classroom$key;
}

const CreateReminder = ({ ...props }: Props) => {
  const classroom = useFragment(fragment, props.classroom);
  const [createReminder, isInFlight] =
    useMutation<CreateReminderMutation>(mutation);
  const [isOpen, setIsOpen] = useState(false);
  const { setShouldRefetch } = useReminders()!;
  const { toast, handleError } = useToast();

  const form = useZodForm({
    schema: createReminderSchema,
    defaultValues: {
      date: new Date(),
      time: new Date(),
      importance: importanceOptions[0].value,
    },
  });

  const closeModal = useCallback(() => {
    setIsOpen(false);
    form.reset();
  }, [form]);

  const onSubmit = useCallback(
    ({
      title,
      description,
      date,
      time,
      importance,
    }: z.infer<typeof createReminderSchema>) => {
      const dueAt = mergeDateTime(date, time);

      createReminder({
        variables: {
          input: {
            classroomId: classroom.id,
            title,
            description,
            dueAt: dueAt.toISOString(),
            importance: importance as ClassroomReminderImportance,
          },
        },
        onError: () => handleError(),
        onCompleted: () => {
          setShouldRefetch(true);
          toast.success('New reminder created');
          closeModal();
        },
      });
    },
    [
      classroom.id,
      closeModal,
      createReminder,
      handleError,
      toast,
      setShouldRefetch,
    ],
  );

  const { field } = useController({
    name: 'importance',
    control: form.control,
  });

  const date = useWatch({ name: 'date', control: form.control });

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        leftIcon={<FontAwesomeIcon icon={faPlus} />}
        onClick={() => setIsOpen(true)}
      >
        New
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal.Overlay />
        <Modal.Content className="w-[35rem]">
          <Modal.Header title="New Reminder" />
          <Form form={form} onSubmit={onSubmit}>
            <Modal.Body>
              <Form.Input
                label="Title"
                placeholder="Title"
                autoFocus
                required
                {...form.register('title')}
              />
              <Form.TextArea
                label="Description"
                placeholder="Description"
                maxRows={10}
                className="resize-none"
                {...form.register('description')}
              />
              <Divider className="!mt-6 w-2/3" />
              <Form.DatePicker
                controller={{
                  name: 'date',
                  control: form.control,
                }}
                inputProps={{
                  label: 'Date',
                  placeholder: 'Date',
                }}
                minDate={new Date()}
              />
              <Form.DatePicker
                controller={{
                  name: 'time',
                  control: form.control,
                }}
                inputProps={{
                  label: 'Time',
                  placeholder: 'Time',
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                minTime={
                  isToday(date)
                    ? roundToNearestMinutes(new Date(), { nearestTo: 15 })
                    : undefined
                }
                maxTime={isToday(date) ? endOfDay(new Date()) : undefined}
                dateFormat="h:mm aa"
              />
              <RadioGroup {...field}>
                <RadioGroup.Label>Importance</RadioGroup.Label>
                <RadioGroup.Options orientation="horizontal">
                  {importanceOptions.map((opt) => (
                    <RadioGroup.Option
                      key={opt.label}
                      value={opt.value}
                      className={({ checked }) =>
                        clsx(
                          'border-0 text-center',
                          checked &&
                            (opt.label === 'Low'
                              ? 'bg-green-100/75 text-green-700'
                              : opt.label === 'Medium'
                              ? 'bg-yellow-100/75 text-yellow-700'
                              : 'bg-red-100/75 text-red-700'),
                        )
                      }
                      icon={
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className={clsx('flex-shrink-0 text-inherit')}
                          size="lg"
                        />
                      }
                    >
                      <span className="text-base font-medium">{opt.label}</span>
                    </RadioGroup.Option>
                  ))}
                </RadioGroup.Options>
              </RadioGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button
                size="sm"
                variant="tertiary"
                onClick={closeModal}
                disabled={isInFlight}
              >
                Cancel
              </Button>
              <Form.SubmitButton
                size="sm"
                variant="primary"
                loading={isInFlight}
              >
                Create
              </Form.SubmitButton>
            </Modal.Footer>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default CreateReminder;
