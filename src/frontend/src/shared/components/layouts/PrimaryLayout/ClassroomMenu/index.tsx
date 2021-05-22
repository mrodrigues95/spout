import { Fragment, ReactElement, useRef, useState } from 'react';
import { Menu, Transition, Portal } from '@headlessui/react';
import { Button } from '~/shared/components';
import mockClassrooms from './utils/mockClassrooms';
import { usePopper } from 'react-popper';

interface MenuButtonProps {
  active: boolean;
  fullWidth: boolean;
  'aria-labelledby': string;
  children: ReactElement;
}

interface Props {
  menuButtonProps: MenuButtonProps;
}

const ClassroomMenu = ({ menuButtonProps }: Props) => {
  const popperElRef = useRef<HTMLDivElement>(null);
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right-start',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });

  return (
    <Menu>
      <Menu.Button as={Button} {...menuButtonProps} ref={setReferenceElement}>
        {menuButtonProps.children}
      </Menu.Button>
      <Portal>
        <div
          style={{ ...styles.popper, margin: 0 }}
          {...attributes.popper}
          ref={popperElRef}
        >
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            beforeEnter={() => setPopperElement(popperElRef.current)}
            afterLeave={() => setPopperElement(null)}
          >
            <Menu.Items as="ul">
              {mockClassrooms.map((classroom) => (
                <Menu.Item as="li" key={classroom.name}>
                  {classroom.name}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </div>
      </Portal>
    </Menu>
  );
};

export default ClassroomMenu;
