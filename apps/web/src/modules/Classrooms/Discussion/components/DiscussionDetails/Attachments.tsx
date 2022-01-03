import { forwardRef, useEffect, useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
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
import { FileFragment } from '../../utils/fragments';
import {
  DiscussionFilesQuery,
  DiscussionFilesQueryVariables,
} from './__generated__/Attachments.generated';
import {
  Avatar,
  EmptyFallback,
  ErrorFallback,
} from '../../../../../shared/components/ui';
import { formatBytesToHumanReadable } from '../../../../../shared/utils';
import { File_File } from '../../utils/__generated__/fragments.generated';
import { getTime } from '../../utils/dates';

interface AttachmentProps {
  index: number;
  file: File_File;
}

const Attachment = ({ index, file }: AttachmentProps) => {
  const isOdd = index % 2 === 0;

  return (
    <div className={clsx('p-2 space-y-3', isOdd ? 'bg-gray-100' : 'bg-white')}>
      <div className="flex flex-grow-0 justify-between space-x-2">
        <div className="inline-flex items-center space-x-2 min-w-0">
          <FileIcon fileName={file.name} size="2x" />
          <div className="min-w-0">
            <Text
              weight="semibold"
              size="sm"
              truncate
              className="text-gray-900 -mb-1"
            >
              {file.name}
            </Text>
            <Text size="xs" color="muted" truncate as="span">
              {formatBytesToHumanReadable(file.contentLength)} -{' '}
              {file.extension}
            </Text>
          </div>
        </div>
        <Tooltip label="View Attachment">
          <IconLink
            className="mb-auto"
            size="xs"
            aria-label="View Attachment"
            scheme="red"
            rel="noreferrer"
            target="_blank"
            icon={<FontAwesomeIcon icon={faExternalLinkAlt} />}
            href={file.location!}
          />
        </Tooltip>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Text
          size="xs"
          className="text-gray-900 flex-shrink-0"
          weight="semibold"
        >
          {format(new Date(file.createdAt), 'MMM d, yyyy')}
        </Text>
        <div className="inline-flex items-center space-x-1 min-w-0 ">
          <Avatar
            src={file.uploadedBy.avatarUrl}
            name={file.uploadedBy.name}
            profileColor={file.uploadedBy.profileColor}
            size="xs"
          />
          <Text size="xs" weight="medium" truncate>
            {file.uploadedBy.name}
          </Text>
        </div>
      </div>
    </div>
  );
};

export const query = gql`
  query DiscussionFilesQuery($id: ID!, $before: String) {
    files(
      last: 50
      before: $before
      where: {
        messageFiles: { some: { message: { discussion: { id: { eq: $id } } } } }
        and: { isDeleted: { eq: false }, uploadStatus: { eq: COMPLETED } }
      }
    ) {
      edges {
        node {
          ...File_file
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${FileFragment}
`;

const Attachments = () => {
  const router = useRouter();
  const { data, loading, error, refetch, fetchMore } = useQuery<
    DiscussionFilesQuery,
    DiscussionFilesQueryVariables
  >(query, {
    variables: {
      id: router.query.discussionId as string,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    skip: !router.isReady,
  });

  // TODO: Make composer form
  const files = useMemo(
    () =>
      (data?.files?.edges ?? [])
        .map((edge) => edge.node)
        .sort((x, y) => getTime(x.createdAt) - getTime(y.createdAt))
        .reverse(),
    [data?.files?.edges]
  );

  if (error) return <ErrorFallback action={refetch} />;

  if (!files.length) {
    return <EmptyFallback icon={<FontAwesomeIcon icon={faFolderOpen} />} />;
  }

  const pageInfo = data?.files?.pageInfo;

  return (
    <Virtuoso
      data={files}
      endReached={
        pageInfo?.hasPreviousPage
          ? () =>
              fetchMore({
                variables: {
                  id: router.query.discussionId as string,
                  before: pageInfo.startCursor,
                },
              })
          : undefined
      }
      itemContent={(index, file) => <Attachment index={index} file={file} />}
      components={{
        Footer: () =>
          loading ? (
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

export default Attachments;
