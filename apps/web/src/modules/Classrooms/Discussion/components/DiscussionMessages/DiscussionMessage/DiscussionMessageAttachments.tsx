import { useState } from 'react';
import {
  faChevronDown,
  faChevronUp,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure } from '@headlessui/react';
import { Button, FileIcon, IconLink, Tooltip } from '@spout/toolkit';
import clsx from 'clsx';
import { formatBytesToHumanReadable } from '../../../../../../shared/utils';
import { BaseDiscussionMessage } from '../../../utils/messages';

type Attachments = BaseDiscussionMessage['attachments'];

interface DiscussionMessageAttachmentProps {
  isMyMessage: boolean;
  attachment: Attachments[number];
}

const DiscussionMessageAttachment = ({
  isMyMessage,
  attachment,
}: DiscussionMessageAttachmentProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <li
      className={clsx(
        'relative flex max-w-[12rem] select-none rounded-md bg-white p-3',
        isMyMessage ? 'shadow-lg' : 'shadow-sm ring-1 ring-gray-900/10',
      )}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {isActive && (
        <div
          className={clsx(
            'absolute -top-1.5 -right-1.5 inline-flex rounded-md',
            isMyMessage && 'bg-blue-700 ',
          )}
        >
          <Tooltip label="View Attachment">
            <IconLink
              className={clsx(
                'z-10',
                isMyMessage &&
                  'bg-blue-700 text-white hover:bg-blue-800 hover:text-white focus:bg-blue-800 focus:text-white focus:ring',
              )}
              variant="light"
              size="xs"
              aria-label="View Attachment"
              rel="noreferrer"
              target="_blank"
              icon={<FontAwesomeIcon icon={faExternalLinkAlt} />}
              href={attachment.location!}
            />
          </Tooltip>
        </div>
      )}
      <FileIcon fileName={attachment.name} className="pt-1.5 mr-2 text-3xl" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{attachment.name}</p>
        <p className="truncate text-sm text-gray-500">
          {formatBytesToHumanReadable(attachment.contentLength)} -{' '}
          {attachment.extension}
        </p>
      </div>
    </li>
  );
};

interface Props {
  isMyMessage: boolean;
  attachments: Attachments;
}

const DiscussionMessageAttachments = ({ isMyMessage, attachments }: Props) => {
  if (!attachments.length) return null;

  return (
    <article
      className={clsx(
        'flex flex-col pt-4',
        isMyMessage ? 'items-end' : 'items-start',
      )}
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              as={Button}
              className={clsx(
                'space-x-2 uppercase',
                isMyMessage &&
                  'bg-blue-700 text-white hover:bg-blue-800 hover:text-white focus:bg-blue-800 focus:text-white focus:ring',
              )}
              variant="light"
              size="xs"
            >
              <span>Attachments</span>
              <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
            </Disclosure.Button>
            {open && (
              <Disclosure.Panel>
                <ul
                  className={clsx(
                    'flex flex-wrap gap-3 py-2',
                    isMyMessage ? 'justify-end' : 'justify-start',
                  )}
                  role="list"
                >
                  {attachments.map((attachment) => (
                    <DiscussionMessageAttachment
                      key={attachment.id}
                      isMyMessage={isMyMessage}
                      attachment={attachment}
                    />
                  ))}
                </ul>
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>
    </article>
  );
};

export default DiscussionMessageAttachments;
