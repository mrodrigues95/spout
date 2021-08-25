import { useContext, useEffect, useRef, useState } from 'react';
import { addDays, addHours, addMinutes } from 'date-fns';
import { CheckIcon, ChevronIcon } from '~/shared/assets';
import { MenuContext, Modals } from '../../MenuProvider';
import Modal from '../../../../../Modal';
import Select from '../../../../../Select';
import Button from '../../../../../Button';
import clsx from 'clsx';

const EXPIRE_AFTER = {
  thirtyMinutes: {
    label: '30 minutes',
    getDate: () => addMinutes(new Date(), 30),
  },
  oneHour: { label: '1 hour', getDate: () => addHours(new Date(), 1) },
  sixHours: { label: '6 hours', getDate: () => addHours(new Date(), 6) },
  twelveHours: { label: '12 hours', getDate: () => addHours(new Date(), 12) },
  oneDay: { label: '1 day', getDate: () => addDays(new Date(), 1) },
  sevenDays: { label: '7 days', getDate: () => addDays(new Date(), 7) },
  never: { label: 'Never', getDate: () => null },
} as { [key: string]: { label: string; getDate: () => Date | null } };

const MAX_USES = {
  unlimited: { label: 'Unlimited', value: null },
  one: { label: '1 use', value: 1 },
  five: { label: '5 uses', value: 5 },
  ten: { label: '10 uses', value: 10 },
  twentyFive: { label: '25 uses', value: 25 },
  fifty: { label: '50 uses', value: 50 },
  oneHundred: { label: '100 uses', value: 100 },
} as { [key: string]: { label: string; value: number | null } };

// https://dribbble.com/shots/15544255-Modals-collection
// TODO: Get "Copy" button to work.
// TODO: When clicking "Copy", apply focus styling for a second then fade out.
const InviteStudents = () => {
  const timeoutRef = useRef(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [expireAfter, setExpireAfter] = useState(EXPIRE_AFTER.sevenDays);
  const [maxUses, setMaxUses] = useState(MAX_USES.unlimited);
  const { currentModal, setCurrentModal, selectedClassroom } = useContext(
    MenuContext
  )!;

  const isOpen = currentModal === Modals.InviteStudents;

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <Modal isOpen={isOpen} onClose={() => setCurrentModal(null)}>
      <Modal.Header
        title={`Invite students to ${selectedClassroom?.name}`}
        description="Add students to your classroom by sharing the invite link below"
        dismiss
      />
      <Modal.Content>
        <div
          className={clsx(
            'flex items-center justify-center mb-6 pl-3 pr-1 py-1 rounded-md ring-2 ring-black ring-opacity-5 transition ease-in-out duration-150 hover:ring-opacity-100',
            isFocused
              ? 'ring-purple-600 ring-opacity-100'
              : 'ring-black ring-opacity-5',
            isCopied
              ? 'ring-green-600 ring-opacity-100'
              : 'ring-black ring-opacity-5'
          )}
        >
          <div className="flex-1">
            <input
              type="text"
              className="p-0 w-full text-black font-semibold border-none focus:outline-none focus:ring-0"
              value={`${process.env.NEXT_PUBLIC_APP_URL}/vJKeloP`}
              onFocus={(e) => {
                e.target.select();
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
              readOnly
            />
          </div>
          <Button
            className={clsx(
              'w-24 px-3 py-2 flex-shrink-0 text-sm',
              isCopied
                ? '!bg-green-600 !text-white hover:!bg-green-700 active:!bg-green-800 !ring-transparent'
                : 'bg-purple-200 text-purple-700'
            )}
            variant="purple"
            rounded="lg"
            onClick={() => {
              navigator.clipboard.writeText('test').then(() => {
                setIsCopied(true);
                clearTimeout(timeoutRef.current);
                timeoutRef.current = window.setTimeout(() => {
                  setIsCopied(false);
                }, 1000);
              });
            }}
          >
            {isCopied ? 'Copied' : 'Copy'}
          </Button>
        </div>
        <h5 className="font-bold mb-3 uppercase">Settings</h5>
        <form>
          <h6 className="text-sm font-semibold uppercase text-gray-500">
            Expire after
          </h6>
          <Select value={expireAfter} onChange={setExpireAfter}>
            <Select.Button
              label={expireAfter.label}
              icon={
                <ChevronIcon className="w-5 h-5 text-black transform -rotate-90" />
              }
            />
            <Select.Options>
              {Object.keys(EXPIRE_AFTER).map((date) => (
                <Select.Option
                  key={date}
                  value={EXPIRE_AFTER[date]}
                  label={EXPIRE_AFTER[date].label}
                  selectedIcon={<CheckIcon className="w-5 h-5" />}
                />
              ))}
            </Select.Options>
          </Select>
          <h6 className="mt-2 text-sm font-semibold uppercase text-gray-500">
            Max number of uses
          </h6>
          <Select value={maxUses} onChange={setMaxUses}>
            <Select.Button
              label={maxUses.label}
              icon={
                <ChevronIcon className="w-5 h-5 text-black transform -rotate-90" />
              }
            />
            <Select.Options>
              {Object.keys(MAX_USES).map((amount) => (
                <Select.Option
                  key={amount}
                  value={MAX_USES[amount]}
                  label={MAX_USES[amount].label}
                  selectedIcon={<CheckIcon className="w-5 h-5" />}
                />
              ))}
            </Select.Options>
          </Select>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default InviteStudents;
