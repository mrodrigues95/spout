import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { hoursToSeconds, minutesToSeconds } from 'date-fns';
import { CheckIcon, ChevronIcon } from '~/shared/assets';
import Select from '../../../../../../Select';

type MaxAge = { label: string; value: number };
const MAX_AGE = {
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
} as { [key: string]: MaxAge };

type MaxUses = { label: string; value: number | null };
const MAX_USES = {
  unlimited: { label: 'Unlimited', value: null },
  one: { label: '1 use', value: 1 },
  five: { label: '5 uses', value: 5 },
  ten: { label: '10 uses', value: 10 },
  twentyFive: { label: '25 uses', value: 25 },
  fifty: { label: '50 uses', value: 50 },
  oneHundred: { label: '100 uses', value: 100 },
} as { [key: string]: MaxUses };

export interface InviteSettings {
  maxAge: MaxAge | null;
  maxUses: MaxUses | null;
}

export interface Props<T extends FieldValues = InviteSettings> {
  control: UseFormReturn<T>['control'];
}

// TODO: Maybe wrap this in `IsolateReRender` for better performance?
// See: https://react-hook-form.com/ts/
const InviteSettings = ({ control }: Props) => {
  return (
    <div>
      <h5 className="font-bold uppercase">Settings</h5>
      <Controller
        control={control}
        defaultValue={null}
        name="maxAge"
        render={({ field: { value, onChange } }) => (
          <Select label="Expire after" value={value} onChange={onChange}>
            <Select.Button
              label={value ? value.label : 'Select'}
              variant={value ? 'default' : 'placeholder'}
              icon={
                <ChevronIcon className="w-5 h-5 text-black transform -rotate-90" />
              }
            />
            <Select.Options>
              {Object.entries(MAX_AGE).map(([key, props]) => (
                <Select.Option
                  key={key}
                  value={props}
                  label={props.label}
                  selectedIcon={<CheckIcon className="w-5 h-5" />}
                />
              ))}
            </Select.Options>
          </Select>
        )}
      />
      <Controller
        control={control}
        defaultValue={null}
        name="maxUses"
        render={({ field: { value, onChange } }) => (
          <Select label="Max number of uses" value={value} onChange={onChange}>
            <Select.Button
              label={value ? value.label : 'Select'}
              variant={value ? 'default' : 'placeholder'}
              icon={
                <ChevronIcon className="w-5 h-5 text-black transform -rotate-90" />
              }
            />
            <Select.Options>
              {Object.entries(MAX_USES).map(([key, props]) => (
                <Select.Option
                  key={key}
                  value={props}
                  label={props.label}
                  selectedIcon={<CheckIcon className="w-5 h-5" />}
                />
              ))}
            </Select.Options>
          </Select>
        )}
      />
    </div>
  );
};

export default InviteSettings;
