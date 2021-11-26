import { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Select, SelectProps } from './select';

export default {
  component: Select,
  title: 'Select',
} as Meta;

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];

const Template: Story<SelectProps> = () => {
  const [value, setValue] = useState(people[0]);

  return (
    <Select label="People" value={value} onChange={setValue}>
      <Select.Button
        label={value ? value.name : 'Select'}
        variant={value ? 'default' : 'placeholder'}
        icon={
          <FontAwesomeIcon
            icon={faChevronRight}
            className="w-5 h-5 text-black transform -rotate-90"
          />
        }
      />
      <Select.Options>
        {people.map((person, idx) => (
          <Select.Option
            key={idx}
            value={person}
            label={person.name}
            selectedIcon={
              <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
            }
          />
        ))}
      </Select.Options>
    </Select>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
