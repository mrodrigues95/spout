import { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { RadioGroup, RadioGroupProps } from './radio-group';

export default {
  component: RadioGroup,
  title: 'RadioGroup',
} as Meta;

const Template: Story<RadioGroupProps> = ({ disabled, name }) => {
  const [plan, setPlan] = useState('startup');

  return (
    <RadioGroup
      disabled={disabled}
      name={name}
      className="space-y-2"
      value={plan}
      onChange={setPlan}
    >
      <RadioGroup.Label>Plan</RadioGroup.Label>
      <RadioGroup.Options>
        <RadioGroup.Option value="startup">
          {({ checked }) => (
            <>
              <RadioGroup.OptionLabel checked={checked}>
                Startup
              </RadioGroup.OptionLabel>
              <RadioGroup.Description checked={checked}>
                12GB
              </RadioGroup.Description>
            </>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="business">
          {({ checked }) => (
            <>
              <RadioGroup.OptionLabel checked={checked}>
                Business
              </RadioGroup.OptionLabel>
              <RadioGroup.Description checked={checked}>
                16GB
              </RadioGroup.Description>
            </>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="enterprise">
          {({ checked }) => (
            <>
              <RadioGroup.OptionLabel checked={checked}>
                Enterprise
              </RadioGroup.OptionLabel>
              <RadioGroup.Description checked={checked}>
                32GB
              </RadioGroup.Description>
            </>
          )}
        </RadioGroup.Option>
      </RadioGroup.Options>
    </RadioGroup>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
