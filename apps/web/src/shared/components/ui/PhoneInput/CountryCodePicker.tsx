import { Fragment, useCallback, useRef, useState } from 'react';
import { Combobox, Popover, Portal } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Button, usePopper } from '@spout/toolkit';
import { COUNTRIES, countriesIndexedByName, Country } from './utils';

interface CountryAutocompleteProps {
  selectedCountry: Country;
  onChange(selectedCountry: Country): void;
}

const CountryAutocomplete = ({
  selectedCountry,
  onChange,
}: CountryAutocompleteProps) => {
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLUListElement>(null);

  const filteredCountries =
    query === ''
      ? COUNTRIES
      : COUNTRIES.filter((country) =>
          country.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <Combobox as={Fragment} value={selectedCountry} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative flex w-full items-center">
            <Combobox.Input
              className="w-full border-none py-0 pl-0 pr-6 text-sm outline-none focus:ring-0"
              placeholder="Search for a country"
              onChange={(e) => setQuery(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute inset-y-0 right-0 my-auto block text-gray-500"
              size="sm"
            />
          </div>
          {open && (
            <>
              <div className="w-full border-t-2 border-gray-100"></div>
              <Combobox.Options
                className={clsx(
                  'max-h-72 w-72 overflow-y-auto overflow-x-hidden text-sm',
                  ref.current &&
                    ref.current.scrollHeight > ref.current.clientHeight
                    ? 'pr-2'
                    : 'pr-0',
                )}
                ref={ref}
                static
              >
                {!filteredCountries.length && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-3 text-gray-700">
                    No countries found.
                  </div>
                ) : (
                  filteredCountries.map((country) => (
                    <Combobox.Option
                      key={country.name}
                      value={country}
                      className={({ active }) =>
                        clsx(
                          'relative flex w-full cursor-pointer items-center justify-between space-x-2 rounded-lg px-3 py-2 text-left font-medium',
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-white text-gray-500',
                        )
                      }
                    >
                      <span className="truncate">{country.name}</span>
                      <span className="font-semibold text-gray-900">
                        {country.dial_code}
                      </span>
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </>
          )}
        </>
      )}
    </Combobox>
  );
};

interface Props {
  onChange(country: Country): void;
}

const CountryCodePicker = ({ onChange: _onChange }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countriesIndexedByName['United States'],
  );
  const [trigger, container] = usePopper({
    placement: 'bottom-start',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 5] } }],
  });

  const onChange = useCallback(
    (close: () => void, country: Country) => {
      setSelectedCountry(country);
      close();
      _onChange(country);
    },
    [_onChange],
  );

  return (
    <Popover>
      {({ close }) => (
        <>
          <Popover.Button as={Button} size="sm" ref={trigger}>
            {selectedCountry.dial_code}
          </Popover.Button>
          <Portal>
            <Popover.Panel
              className="relative space-y-2 rounded-lg bg-white p-3 shadow-lg ring-1 ring-gray-900 ring-opacity-5"
              ref={container}
              focus
            >
              <CountryAutocomplete
                selectedCountry={selectedCountry}
                onChange={(country) => onChange(close, country)}
              />
            </Popover.Panel>
          </Portal>
        </>
      )}
    </Popover>
  );
};

export default CountryCodePicker;
