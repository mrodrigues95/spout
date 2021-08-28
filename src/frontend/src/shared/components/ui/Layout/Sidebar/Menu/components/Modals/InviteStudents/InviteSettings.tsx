import { useState, useEffect, useCallback } from 'react';
import { hoursToSeconds, minutesToSeconds } from 'date-fns';
import { CheckIcon, ChevronIcon } from '~/shared/assets';
import { InviteSettingsType } from '.';
import Select from '../../../../../../Select';

export type MaxAge = { label: string; value: number };
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

export type MaxUses = { label: string; value: number | null };
const MAX_USES = {
  unlimited: { label: 'Unlimited', value: null },
  one: { label: '1 use', value: 1 },
  five: { label: '5 uses', value: 5 },
  ten: { label: '10 uses', value: 10 },
  twentyFive: { label: '25 uses', value: 25 },
  fifty: { label: '50 uses', value: 50 },
  oneHundred: { label: '100 uses', value: 100 },
} as { [key: string]: MaxUses };

interface Props {
  setSettings: (settings: InviteSettingsType) => void;
}

const InviteSettings = ({ setSettings }: Props) => {
  const [maxAge, setMaxAge] = useState<MaxAge | null>(null);
  const [maxUses, setMaxUses] = useState<MaxUses | null>(null);

  const reset = useCallback(() => {
    setMaxAge(null);
    setMaxUses(null);
  }, []);

  useEffect(() => {
    setSettings({ maxAge, maxUses, reset });
  }, [maxAge, maxUses, reset, setSettings]);

  return (
    <>
      <h5 className="font-bold mb-1 uppercase">Settings</h5>
      <form className="space-y-2">
        <Select
          label="Expire after"
          value={maxAge}
          onChange={setMaxAge}
        >
          <Select.Button
            label={maxAge ? maxAge.label : 'Select'}
            variant={maxAge ? 'default' : 'placeholder'}
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
        <Select
          label="Max number of uses"
          value={maxUses}
          onChange={setMaxUses}
        >
          <Select.Button
            label={maxUses ? maxUses.label : 'Select'}
            variant={maxUses ? 'default' : 'placeholder'}
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
      </form>
    </>
  );
};

export default InviteSettings;
