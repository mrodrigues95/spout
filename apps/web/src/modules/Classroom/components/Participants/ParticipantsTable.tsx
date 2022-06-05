import { useMemo, useState } from 'react';
import { graphql, usePaginationFragment } from 'react-relay';
import {
  createTable,
  SortingState,
  useTableInstance,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { Badge, Table } from '@spout/toolkit';
import { useConnection } from '../../../../shared/hooks';
import { Avatar } from '../../../../shared/components';
import {
  ParticipantsTable_classroom$data,
  ParticipantsTable_classroom$key,
} from './__generated__/ParticipantsTable_classroom.graphql';

type Participant = NonNullable<
  NonNullable<ParticipantsTable_classroom$data['users']>['edges']
>[number]['node'];

const table = createTable().setRowType<Participant>();

interface ParticipantTableProps {
  classroom: ParticipantsTable_classroom$key;
}

const ParticipantsTable = ({ ...props }: ParticipantTableProps) => {
  const { data: classroom } = usePaginationFragment(
    graphql`
      fragment ParticipantsTable_classroom on Classroom
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 50 }
        cursor: { type: "String" }
        classroomId: { type: "ID!" }
      )
      @refetchable(queryName: "ParticipantsTablePaginationQuery") {
        users(first: $count, after: $cursor)
          @connection(key: "ParticipantsTable_classroom_users") {
          edges {
            node {
              avatarUrl
              name
              profileColor
              email
              isClassroomTeacher(classroomId: $classroomId)
            }
          }
        }
      }
    `,
    props.classroom,
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const participants = useConnection(classroom.users);

  const columns = useMemo(
    () => [
      table.createDataColumn('name', {
        header: () => 'First Name',
        cell: ({ row }) => {
          return (
            <div className="inline-flex items-center space-x-2">
              <Avatar
                src={row.original!.avatarUrl}
                name={row.original!.name}
                profileColor={row.original!.profileColor}
                containerProps={{ className: 'shadow-sm' }}
                size="sm"
              />
              <span className="min-w-0 flex-1 truncate">
                {row.original!.name}
              </span>
            </div>
          );
        },
      }),
      table.createDataColumn('email', {
        header: () => 'Email',
      }),
      table.createDataColumn('isClassroomTeacher', {
        header: () => 'Role',
        cell: ({ cell }) => {
          const isClassroomTeacher = cell.getValue();
          return (
            <Badge scheme={isClassroomTeacher ? 'pink' : 'green'} size="xs">
              {isClassroomTeacher ? 'Instructor' : 'Student'}
            </Badge>
          );
        },
      }),
    ],
    [],
  );

  const instance = useTableInstance(table, {
    data: participants,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table>
      <Table.Header>
        {instance.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Column key={header.id} header={header} isSortable>
                {header.isPlaceholder ? null : header.renderHeader()}
              </Table.Column>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {instance.getRowModel().rows.map((row) => (
          <Table.Row key={row.id} className="odd:bg-white even:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id}>{cell.renderCell()}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ParticipantsTable;
