import { useState } from 'react';
import {
  faChevronDown,
  faChevronUp,
  faCloudDownloadAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure } from '@headlessui/react';
import {
  Button,
  FileIcon,
  FILE_EXTENSIONS,
  IconButton,
  Tooltip,
} from '@spout/toolkit';
import clsx from 'clsx';
import { formatBytesToHumanReadable } from '../../utils/files';
import {
  File_File,
  Message_Message,
} from '../../utils/__generated__/fragments.generated';

interface DiscussionMessageAttachmentProps {
  isMyMessage: boolean;
  attachment: File_File;
}

const DiscussionMessageAttachment = ({
  isMyMessage,
  attachment,
}: DiscussionMessageAttachmentProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <li
      className={clsx(
        'relative flex p-3 rounded-md bg-white max-w-[12rem] cursor-pointer select-none',
        isMyMessage ? 'shadow-lg' : 'shadow-sm ring-1 ring-gray-900/10'
      )}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {isActive && (
        <div className="inline-flex absolute -top-1.5 -right-1.5">
          <Tooltip label="Download File">
            <IconButton
              className="z-10 bg-blue-700 text-white focus:bg-blue-800 focus:ring hover:bg-blue-800"
              variant="light"
              size="xs"
              aria-label="Download File"
              icon={<FontAwesomeIcon icon={faCloudDownloadAlt} />}
            />
          </Tooltip>
        </div>
      )}
      <FileIcon
        ext={attachment.extension.toLowerCase() as keyof typeof FILE_EXTENSIONS}
        className="text-3xl mt-1.5 mr-2"
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{attachment.name}</p>
        <p className="text-gray-500 truncate text-sm">
          {formatBytesToHumanReadable(attachment.contentLength)}-{' '}
          {attachment.extension}
        </p>
      </div>
    </li>
  );
};

interface Props {
  isMyMessage: boolean;
  attachments: Message_Message['attachments'];
}

const DiscussionMessageAttachments = ({ isMyMessage, attachments }: Props) => {
  return (
    <article
      className={clsx(
        'flex flex-col',
        isMyMessage ? 'items-end' : 'items-start'
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
                  'bg-blue-700 text-white focus:bg-blue-800 focus:ring hover:bg-blue-800'
              )}
              variant="light"
              size="xs"
            >
              <span>Attachments</span>
              <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
            </Disclosure.Button>
            {open && (
              <Disclosure.Panel className="mt-2">
                <ul
                  className={clsx(
                    'flex flex-wrap py-2 gap-3',
                    isMyMessage ? 'justify-end' : 'justify-start'
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
