import { forwardRef, Suspense, useMemo } from 'react';
import {
  graphql,
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay';
import { useRouter } from 'next/router';
import { Components, Virtuoso } from 'react-virtuoso';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExternalLinkAlt,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { FileIcon, IconLink, Spinner, Text, Tooltip } from '@spout/toolkit';
import {
  Avatar,
  EmptyFallback,
  ErrorBoundary,
  ErrorFallback,
} from '../../../../shared/components';
import { formatBytesToHumanReadable } from '../../../../shared/utils';
import { AttachmentsQuery } from './__generated__/AttachmentsQuery.graphql';
import { Attachments_files$key } from './__generated__/Attachments_files.graphql';
import { Attachments_attachment$key } from './__generated__/Attachments_attachment.graphql';

interface AttachmentProps {
  index: number;
  file: Attachments_attachment$key;
}

const Attachment = ({ index, file }: AttachmentProps) => {
  const data = useFragment(
    graphql`
      fragment Attachments_attachment on File {
        name
        contentLength
        location
        createdAt
        uploadedBy {
          name
          avatarUrl
          profileColor
        }
      }
    `,
    file,
  );

  const isOdd = index % 2 === 0;

  return (
    <div className={clsx('space-y-3 p-2', isOdd ? 'bg-gray-100' : 'bg-white')}>
      <div className="flex grow-0 justify-between space-x-2">
        <div className="inline-flex min-w-0 items-center space-x-2">
          <FileIcon fileName={data.name} />
          <div className="min-w-0">
            <Text
              weight="semibold"
              size="sm"
              truncate
              className="-mb-1 text-gray-900"
            >
              {data.name}
            </Text>
            <Text size="xs" color="muted" truncate as="span">
              {formatBytesToHumanReadable(data.contentLength)}
            </Text>
          </div>
        </div>
        <Tooltip label="View Attachment">
          <IconLink
            className="mb-auto"
            size="xs"
            aria-label="View Attachment"
            variant="danger"
            rel="noreferrer"
            target="_blank"
            icon={<FontAwesomeIcon icon={faExternalLinkAlt} />}
            href={data.location!}
          />
        </Tooltip>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Text size="xs" className="shrink-0 text-gray-900" weight="semibold">
          {format(new Date(data.createdAt), 'MMM d, yyyy')}
        </Text>
        <div className="inline-flex min-w-0 items-center space-x-1 ">
          <Avatar
            src={data.uploadedBy.avatarUrl}
            name={data.uploadedBy.name}
            profileColor={data.uploadedBy.profileColor}
            size="xs"
          />
          <Text size="xs" weight="medium" truncate>
            {data.uploadedBy.name}
          </Text>
        </div>
      </div>
    </div>
  );
};

interface AttachmentsListProps {
  files: Attachments_files$key;
}

const AttachmentsList = ({ ...props }: AttachmentsListProps) => {
  const { data, loadPrevious, hasPrevious, isLoadingPrevious } =
    usePaginationFragment(
      graphql`
        fragment Attachments_files on Query
        @argumentDefinitions(
          id: { type: "ID!" }
          count: { type: "Int!" }
          cursor: { type: "String" }
        )
        @refetchable(queryName: "AttachmentsPaginationQuery") {
          files(
            last: $count
            before: $cursor
            where: {
              messageFiles: {
                some: { message: { discussion: { id: { eq: $id } } } }
              }
              and: { isDeleted: { eq: false }, uploadStatus: { eq: COMPLETED } }
            }
            order: { createdAt: DESC }
          ) @connection(key: "Attachments_file_files") {
            edges {
              node {
                ...Attachments_attachment
              }
            }
            pageInfo {
              startCursor
            }
          }
        }
      `,
      props.files,
    );

  const files = useMemo(
    () => (data.files?.edges ?? []).map((edge) => edge.node),
    [data.files?.edges],
  );

  if (!files.length) {
    return <EmptyFallback icon={<FontAwesomeIcon icon={faFolderOpen} />} />;
  }

  return (
    <Virtuoso
      data={files}
      endReached={hasPrevious ? () => loadPrevious(50) : undefined}
      itemContent={(index, file) => <Attachment index={index} file={file} />}
      components={{
        Footer: () =>
          isLoadingPrevious ? (
            <Spinner
              className="py-4"
              variant="circle"
              size="sm"
              scheme="black"
              center
            />
          ) : null,
        Item: ({ children, ...props }) => (
          <li {...props} role="listitem">
            {children}
          </li>
        ),
        List: forwardRef(function List(props, ref) {
          return (
            <ul
              {...props}
              // @ts-ignore: `Virtuoso/List` interface is not polymorphic and expects a `div`.
              ref={ref}
              role="list"
            />
          );
        }) as Components['List'],
      }}
      className="overflow-x-hidden rounded-md"
    />
  );
};

interface Props {
  fetchKey: number;
}

// TODO: Refresh attachments when a file is uploaded.
const Attachments = ({ fetchKey }: Props) => {
  const router = useRouter();
  const data = useLazyLoadQuery<AttachmentsQuery>(
    graphql`
      query AttachmentsQuery($id: ID!, $count: Int!, $cursor: String) {
        ...Attachments_files @arguments(id: $id, count: $count, cursor: $cursor)
      }
    `,
    { id: router.query.discussionId as string, count: 50 },
    { fetchPolicy: 'store-and-network', fetchKey },
  );

  return <AttachmentsList files={data} />;
};

const AttachmentsWithSuspense = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <ErrorFallback
          heading="We couldn't load any attachments."
          action={resetErrorBoundary}
        />
      )}
    >
      {({ fetchKey }) => (
        <Suspense fallback={<Spinner center size="lg" className="flex-1" />}>
          <Attachments fetchKey={fetchKey} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default AttachmentsWithSuspense;
