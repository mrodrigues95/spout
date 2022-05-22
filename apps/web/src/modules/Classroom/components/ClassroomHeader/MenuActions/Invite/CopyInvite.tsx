import { useEffect, useRef, useState } from 'react';
import { graphql, useFragment } from 'react-relay';
import { secondsToMinutes, secondsToHours } from 'date-fns';
import clsx from 'clsx';
import { Button } from '@spout/toolkit';
import {
  CopyInvite_classroom,
  CopyInvite_classroom$key,
} from './__generated__/CopyInvite_classroom.graphql';

const getExpiresMessage = (invite: CopyInvite_classroom) => {
  const { maxAge, maxUses } = invite;

  const date = () => {
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

    return '';
  };

  const uses = maxUses === 1 ? '1 use' : `${maxUses} uses`;

  if (!maxUses && !maxAge) {
    return 'This invite will never expire.';
  } else if (maxUses && maxAge) {
    return `This invite will expire in ${date()}, or after ${uses}.`;
  } else if (maxUses && !maxAge) {
    return `This invite expires after ${uses}.`;
  } else if (!maxUses && maxAge) {
    return `This invite will expire in ${date()}.`;
  } else {
    return '';
  }
};

const fragment = graphql`
  fragment CopyInvite_classroom on ClassroomInvite {
    code
    maxUses
    maxAge
  }
`;

interface Props {
  invite: CopyInvite_classroom$key;
}

const CopyInvite = ({ ...props }: Props) => {
  const invite = useFragment(fragment, props.invite);
  const timeoutRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  if (!invite) return null;

  const onCopy = () => {
    const { clipboard } = navigator;

    const triggerTimeout = () => {
      setIsCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    };

    if (typeof clipboard !== 'undefined') {
      navigator.clipboard
        .writeText(inputRef.current!.value)
        .then(triggerTimeout);
    } else {
      console.warn('Clipboard not supported.');
    }
  };

  return (
    <div className="space-y-1.5">
      <div
        className={clsx(
          'flex items-center justify-center rounded-md border-2 border-gray-200 py-1 pl-3 pr-1 transition duration-150 ease-in-out',
          isCopied
            ? 'border-emerald-600 ring-4 ring-green-200'
            : 'border-gray-200',
        )}
      >
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            className="w-full truncate border-none bg-inherit py-0 pl-0 font-medium text-gray-900 focus:outline-none focus:ring-0"
            value={invite.code}
            onFocus={(e) => e.target.select()}
            readOnly
          />
        </div>
        <Button
          size="sm"
          className={clsx(
            isCopied &&
              'bg-emerald-600 !text-white ring-transparent transition-colors hover:bg-emerald-700 active:bg-emerald-800',
          )}
          onClick={onCopy}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <p className="text-sm text-gray-500">{getExpiresMessage(invite)}</p>
    </div>
  );
};

export default CopyInvite;
