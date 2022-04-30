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
        variant="secondary"
        rightIcon={
          <FontAwesomeIcon
            icon={faChevronRight}
            className="h-5 w-5 -rotate-90 transform text-black"
          />
        }
      >
        {value ? value.name : 'Select'}
      </Select.Button>
      <Select.Options>
        {people.map((person, idx) => (
          <Select.Option
            key={idx}
            value={person}
            label={person.name}
            selectedIcon={<FontAwesomeIcon icon={faCheck} size="xs" />}
          />
        ))}
      </Select.Options>
    </Select>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
