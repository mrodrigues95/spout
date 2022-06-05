import { useMemo, useState } from 'react';
import { Meta } from '@storybook/react';
import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useTableInstance,
} from '@tanstack/react-table';
import { makeData, Person } from './mock';
import { Table } from './table';

export default {
  component: Table,
  title: 'Table',
} as Meta;

const table = createTable().setRowType<Person>();

export const Primary = () => {
  const [data] = useState(() => makeData(100));

  const columns = useMemo(
    () => [
      table.createDataColumn('firstName', {
        header: () => 'First Name',
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('lastName', {
        header: () => 'Last Name',
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('age', {
        header: () => 'Age',
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('visits', {
        header: () => 'Visit',
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('status', {
        header: 'Status',
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('progress', {
        header: 'Profile Progress',
        footer: (props) => props.column.id,
      }),
    ],
    [],
  );

  const instance = useTableInstance(table, {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Table>
      <Table.Header>
        {instance.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Column key={header.id} header={header}>
                {header.isPlaceholder ? null : header.renderHeader()}
              </Table.Column>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {instance
          .getRowModel()
          .rows.slice(0, 10)
          .map((row) => (
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

export const Sorting = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data] = useState(() => makeData(100));

  const columns = useMemo(
    () => [
      table.createDataColumn('firstName', {
        header: () => 'First Name',
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('lastName', {
        header: () => 'Last Name',
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('age', {
        header: () => 'Age',
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('visits', {
        header: () => 'Visit',
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('status', {
        header: 'Status',
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('progress', {
        header: 'Profile Progress',
        footer: (props) => props.column.id,
      }),
    ],
    [],
  );

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
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
        {instance
          .getRowModel()
          .rows.slice(0, 10)
          .map((row) => (
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
