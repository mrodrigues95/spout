import { useCallback, useRef, useState } from 'react';
import {
  faChevronDown,
  faChevronUp,
  faCloudDownloadAlt,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure } from '@headlessui/react';
import {
  Button,
  FileIcon,
  FILE_EXTENSIONS,
  IconButton,
  Tooltip,
  Spinner,
} from '@spout/toolkit';
import clsx from 'clsx';
import { formatBytesToHumanReadable } from '../../../../../shared/utils';
import { useFileDownload } from '../../../../../shared/hooks';
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
  const {
    generateDownloadSAS,
    loading: fetchingAttachment,
  } = useFileDownload();
  const [isActive, setIsActive] = useState(false);

  const ref = useRef<HTMLAnchorElement>(null);

  const viewAttachment = useCallback(
    async (attachmentId: string) => {
      const { sas } = (await generateDownloadSAS(attachmentId)) || {};
      if (!sas) return;

      // TODO: Is there a better way to handle loading external links like this?
      if (ref.current) {
        ref.current.href = sas;
        ref.current.click();
        ref.current.href = '';
      }
    },
    [generateDownloadSAS]
  );

  const icon = fetchingAttachment ? (
    <Spinner variant="circle" size="xs" scheme="white" />
  ) : (
    <FontAwesomeIcon icon={faExternalLinkAlt} />
  );

  return (
    <li
      className={clsx(
        'relative flex p-3 rounded-md bg-white max-w-[12rem] select-none',
        isMyMessage ? 'shadow-lg' : 'shadow-sm ring-1 ring-gray-900/10',
        fetchingAttachment ? 'cursor-default' : 'cursor-pointer'
      )}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <a
        ref={ref}
        rel="noreferrer"
        target="_blank"
        aria-hidden="true"
        className="hidden"
        tabIndex={-1}
      />
      {isActive && (
        <div className="inline-flex absolute -top-1.5 -right-1.5 bg-blue-700 rounded-md">
          <Tooltip label="View File">
            <IconButton
              className="z-10 text-white bg-blue-700 focus:bg-blue-800 focus:ring hover:bg-blue-800"
              variant="light"
              size="xs"
              aria-label="View File"
              role="link"
              icon={icon}
              disabled={fetchingAttachment}
              onClick={() => viewAttachment(attachment.id)}
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
