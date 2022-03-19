import { useCallback, useMemo, useState } from 'react';
import { object, string } from 'zod';
import { isValidPhoneNumber, CountryCode } from 'libphonenumber-js';
import { Button, useZodForm, generateId } from '@spout/toolkit';
import CountryCodePicker from './CountryCodePicker';
import { countriesIndexedByName, Country } from './utils';

const getSchema = (country: Country) =>
  object({
    phoneNumber: string(),
  }).refine(
    (data) => isValidPhoneNumber(data.phoneNumber, country.code as CountryCode),
    {
      path: ['phoneNumber'],
    },
  );

const PhoneInput = () => {
  // TODO: Get the users location either via the Geolocation API or from a service
  // like https://members.ip-api.com/.
  const [country, setCountry] = useState<Country>(
    countriesIndexedByName['United States'],
  );
  const errorId = useMemo(() => `spout-phone-error-${generateId()}`, []);

  const form = useZodForm({ schema: getSchema(country) });
  const error = form.formState.errors['phoneNumber'];

  const onSubmit = useCallback(() => console.log('test'), []);

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
          <Button type="submit" variant="primary">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PhoneInput;
