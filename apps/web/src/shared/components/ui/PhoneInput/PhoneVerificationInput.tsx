import { useCallback, useMemo, useState } from 'react';
import Zod, { object, string } from 'zod';
import {
  isPossiblePhoneNumber,
  parsePhoneNumber,
  CountryCode,
  PhoneNumber,
} from 'libphonenumber-js/mobile';
import { Button, useZodForm, generateId } from '@spout/toolkit';
import CountryCodePicker from './CountryCodePicker';
import { countriesIndexedByName, Country } from './utils';
import { useSendPhoneVerificationTokenMutation } from './hooks';

const getSchema = (country: Country) =>
  object({
    phoneNumber: string(),
  }).refine(
    (data) =>
      // NOTE: Using `.isValid()` checks strictly for mobile numbers and will
      // fail if its a non-mobile number which is what we want.
      isPossiblePhoneNumber(data.phoneNumber, country.code) &&
      parsePhoneNumber(data.phoneNumber, country.code).isValid(),
    {
      path: ['phoneNumber'],
    },
  );

interface Props {
  onVerificationTokenSent: (phoneNumber: PhoneNumber) => void;
}

const PhoneVerificationInput = ({ onVerificationTokenSent }: Props) => {
  // TODO: Get the users location either via the Geolocation API or from a service
  // like https://members.ip-api.com/.
  const [country, setCountry] = useState<Country>(
    countriesIndexedByName['Canada'],
  );
  const [sendCode, isInFlight] = useSendPhoneVerificationTokenMutation();

  const phoneNumberSchema = useMemo(() => getSchema(country), [country]);

  const form = useZodForm({ schema: phoneNumberSchema });
  const error = form.formState.errors['phoneNumber'];

  const onSubmit = useCallback(
    ({ phoneNumber }: Zod.infer<typeof phoneNumberSchema>) => {
      const parsedPhoneNumber = parsePhoneNumber(
        phoneNumber,
        country.code as CountryCode,
      );

      sendCode({
        phoneNumber: parsedPhoneNumber,
        onSuccess: () => onVerificationTokenSent(parsedPhoneNumber),
        onInvalidPhoneNumber: () =>
          form.setError(
            'phoneNumber',
            {
              type: 'manual',
            },
            { shouldFocus: true },
          ),
      });
    },
    [country.code, sendCode, onVerificationTokenSent, form],
  );

  const errorId = useMemo(() => `spout-phone-error-${generateId()}`, []);

  return (
    <div className="space-y-1">
      {error && (
        <span
          id={errorId}
          className="ml-1 text-sm font-medium italic text-red-600"
          aria-live="polite"
        >
          Invalid phone number
        </span>
      )}
      <div className="relative flex items-center rounded-lg border-2 border-gray-200/80 px-2 py-1.5 text-sm leading-6 text-gray-400 outline-none">
        <CountryCodePicker onChange={setCountry} />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full items-center"
        >
          <label className="w-full">
            <span className="sr-only">Enter phone number</span>
            <input
              type="tel"
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              className="w-full border-none bg-inherit text-gray-900 outline-none focus:ring-0"
              autoComplete="off"
              {...form.register('phoneNumber')}
              required
            />
          </label>
          <Button type="submit" variant="primary" loading={isInFlight}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PhoneVerificationInput;
