import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import {
  faDesktop,
  faLightbulb,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';

const themes = [
  {
    label: 'Light',
    description: 'Enable light theme',
    icon: <FontAwesomeIcon icon={faLightbulb} />,
  },
  {
    label: 'Dark',
    description: 'Enable dark theme',
    icon: <FontAwesomeIcon icon={faMoon} />,
  },
  {
    label: 'System',
    description: 'Enable system theme',
    icon: <FontAwesomeIcon icon={faDesktop} />,
  },
];

// TODO: Actually implement this.
const ThemeButton = () => {
  const [selected, setSelected] = useState(themes[0]);

  return (
    <RadioGroup value={selected} onChange={setSelected} className="px-2">
      <RadioGroup.Label className="sr-only">Theme</RadioGroup.Label>
      <div className="flex w-full items-center justify-evenly space-x-2 rounded-lg bg-gray-100 p-1">
        {themes.map((theme) => (
          <RadioGroup.Option
            key={theme.label}
            value={theme}
            className={({ active }) =>
              clsx(
                'relative flex flex-1 items-center rounded-lg outline-none',
                active && 'ring',
              )
            }
          >
            {({ checked }) => (
              <>
                <RadioGroup.Label
                  className={clsx(
                    'flex flex-1 cursor-pointer items-center justify-center rounded-lg px-3 py-2 font-medium',
                    checked
                      ? 'bg-white text-gray-900 shadow-md'
                      : 'bg-transparent text-gray-400 shadow-none',
                  )}
                >
                  {theme.icon}
                  <span className="sr-only">{theme.label}</span>
                </RadioGroup.Label>
                <RadioGroup.Description as="span" className="sr-only">
                  {theme.description}
                </RadioGroup.Description>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ThemeButton;
