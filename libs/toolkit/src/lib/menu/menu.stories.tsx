import { Story, Meta } from '@storybook/react';
import { Portal } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Button } from '../button';
import { Menu, MenuProps } from './menu';
import { usePopper } from '../../hooks';

export default {
  component: Menu,
  title: 'Menu',
} as Meta;

const Template: Story<MenuProps> = () => {
  const [trigger, container] = usePopper({
    placement: 'right-start',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });

  return (
    <Menu>
      <Menu.Button variant="tertiary" ref={trigger}>
        Click me!
      </Menu.Button>
      <Portal>
        <Menu.Items ref={container}>
          <Menu.Group>
            <Menu.Item>
              {({ active }) => (
                <Button
                  leftIcon={<FontAwesomeIcon icon={faGear} />}
                  variant="tertiary"
                  size="sm"
                  className={clsx(
                    'block',
                    active
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-white text-gray-500',
                  )}
                  fullWidth
                >
                  Settings
                </Button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Button
                  leftIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
                  variant="tertiary"
                  size="sm"
                  className={clsx(
                    'block',
                    active
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-white text-gray-500',
                  )}
                  fullWidth
                >
                  Logout
                </Button>
              )}
            </Menu.Item>
          </Menu.Group>
        </Menu.Items>
      </Portal>
    </Menu>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
