import { useEffect, useRef, useState } from 'react';
import { secondsToMinutes, secondsToHours } from 'date-fns';
import clsx from 'clsx';
import Button from '../../../../../../Button';
import { ClassroomInvite } from '../../../MenuProvider';

interface Props {
  invite: ClassroomInvite;
}

const getExpiresMessage = (invite: ClassroomInvite) => {
  if (!invite) return '';

  const { maxAge, maxUses } = invite;

  const after = () => {
    if (!maxAge) return '';

    if (secondsToMinutes(maxAge) === 30) {
      return '30 minutes';
    } else if (secondsToHours(maxAge) === 1) {
      return '1 hour';
    } else if (secondsToHours(maxAge) === 6) {
      return '6 hours';
    } else if (secondsToHours(maxAge) === 12) {
      return '12 hours';
    } else if (secondsToHours(maxAge) === 24) {
      return '1 day';
    } else if (secondsToHours(maxAge) === 168) {
      return '7 days';
    }
  };

  const uses = maxUses === 1 ? '1 use' : `${maxUses} uses`;

  if (!maxUses && !maxAge) {
    return 'Your invite will never expire.';
  } else if (maxUses && maxAge) {
    return `Your invite will expire in ${after()}, or after ${uses}.`;
  } else if (maxUses && !maxAge) {
    return `Your invite expires after ${uses}.`;
  } else if (!maxUses && maxAge) {
    return `Your invite will expire in ${after()}.`;
  }
};

const CopyInvite = ({ invite }: Props) => {
  const timeoutRef = useRef(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  if (!invite) return null;

  const onCopy = () => {
    navigator.clipboard.writeText(invite.code).then(() => {
      setIsCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  };

  return (
    <>
      <div
        className={clsx(
          'flex items-center justify-center pl-3 pr-1 py-1 rounded-md ring-2 ring-black ring-opacity-5 transition ease-in-out duration-150 hover:ring-opacity-100',
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
            className="pl-0 py-0 w-full text-black font-semibold border-none truncate focus:outline-none focus:ring-0"
            value={`${process.env.NEXT_PUBLIC_APP_URL}/${invite.code}`}
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
          onClick={onCopy}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <p className="mt-1 text-gray-500 font-medium text-sm">{getExpiresMessage(invite)}</p>
    </>
  );
};

export default CopyInvite;
