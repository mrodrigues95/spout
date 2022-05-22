import { Control, useController } from 'react-hook-form';
import { hoursToSeconds, minutesToSeconds } from 'date-fns';
import z from 'zod';
import {
  Select,
  usePopper,
  defaultPopperOptions,
  customPopperModifiers,
} from '@spout/toolkit';
import { inviteSchema } from './Invite';

export const MAX_AGE = {
  never: { label: 'Never', value: 0 },
  thirtyMinutes: {
    label: '30 minutes',
    value: minutesToSeconds(30),
  },
  oneHour: { label: '1 hour', value: hoursToSeconds(1) },
  sixHours: { label: '6 hours', value: hoursToSeconds(6) },
  twelveHours: { label: '12 hours', value: hoursToSeconds(12) },
  oneDay: { label: '1 day', value: hoursToSeconds(24) },
  sevenDays: { label: '7 days', value: hoursToSeconds(168) },
};

export const MAX_USES = {
  unlimited: { label: 'Unlimited', value: undefined },
  one: { label: '1 use', value: 1 },
  five: { label: '5 uses', value: 5 },
  ten: { label: '10 uses', value: 10 },
  twentyFive: { label: '25 uses', value: 25 },
  fifty: { label: '50 uses', value: 50 },
  oneHundred: { label: '100 uses', value: 100 },
};

const getLabelFromFieldValue = (
  field: typeof MAX_USES | typeof MAX_AGE,
  fieldValue: number | undefined,
) => {
  for (const [, { value, label }] of Object.entries(field)) {
    if (value === fieldValue) return label;
  }

  return '';
};

interface Props {
  control: Control<z.infer<typeof inviteSchema>>;
}

const InviteSettings = ({ control }: Props) => {
  const maxAge = useController({ name: 'maxAge', control });
  const maxUses = useController({ name: 'maxUses', control });

  const [maxAgeTrigger, maxAgeContainer] = usePopper({
    ...defaultPopperOptions,
    strategy: 'absolute',
    modifiers: [
      ...defaultPopperOptions.modifiers,
      customPopperModifiers.sameWidth,
    ],
  });

  const [maxUsesTrigger, maxUsesContainer] = usePopper({
    ...defaultPopperOptions,
    strategy: 'absolute',
    modifiers: [
      ...defaultPopperOptions.modifiers,
      customPopperModifiers.sameWidth,
    ],
  });

  return (
    <fieldset className="space-y-1">
      <legend className="font-semibold uppercase">Settings</legend>
      <Select
        label="Expires after"
        value={maxAge.field.value}
        onChange={maxAge.field.onChange}
      >
        <Select.Button variant="secondary" ref={maxAgeTrigger} fullWidth>
          {getLabelFromFieldValue(MAX_AGE, maxAge.field.value)}
        </Select.Button>
        <Select.Options ref={maxAgeContainer}>
          {Object.entries(MAX_AGE).map(([key, { label, value }]) => (
            <Select.Option key={key} value={value} label={label} />
          ))}
        </Select.Options>
      </Select>
      <Select label="Max number of uses" {...maxUses.field}>
        <Select.Button variant="secondary" ref={maxUsesTrigger} fullWidth>
          {getLabelFromFieldValue(MAX_USES, maxUses.field.value)}
        </Select.Button>

        <Select.Options ref={maxUsesContainer}>
          {Object.entries(MAX_USES).map(([key, { label, value }]) => (
            <Select.Option key={key} value={value} label={label} />
          ))}
        </Select.Options>
      </Select>
    </fieldset>
  );
};

export default InviteSettings;
