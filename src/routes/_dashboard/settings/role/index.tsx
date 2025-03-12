import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx';
import { useMemo } from 'react';
import {
  MantineReactTable,
  type MRT_ColumnDef,
  MRT_Table,
  useMantineReactTable,
} from 'mantine-react-table';
import { MRT_Localization_ZH_HANS } from "mantine-react-table/locales/zh-Hans/index.cjs";
import { Badge, Group, Pill } from '@mantine/core';

export const Route = createFileRoute('/_dashboard/settings/role/')({
  component: RoleManagement,
})

type Person = {
  name: string;
  code: string;
  inherited: string;
  city: string;
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    name: "管理员",
    code: "ADMIN",
    inherited: '261 Battle Ford',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: "管理员",
    code: "ADMIN",
    inherited: '261 Battle Ford',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: "管理员",
    code: "ADMIN",
    inherited: '261 Battle Ford',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: "管理员",
    code: "ADMIN",
    inherited: '261 Battle Ford',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: "管理员",
    code: "ADMIN",
    inherited: '261 Battle Ford',
    city: 'Columbus',
    state: 'Ohio',
  },
];

function RoleManagement() {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: '角色名称',
      },
      {
        accessorKey: 'code',
        header: '角色编码',
      },
      {
        accessorKey: 'inherited', //normal accessorKey
        header: '继承角色',
        Cell: () => <Group gap={'xs'}>
          <Badge variant="light" color="blue">财务</Badge>
          <Badge variant="light" color="blue">核算</Badge>
        </Group>
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: true,
    enableSorting: false,
    enableTopToolbar: false,
    mantineTableProps: {
      highlightOnHover: true,
      withColumnBorders: false,
      withRowBorders: true,
    },
    mantinePaperProps: {
      radius: 'sm',
      withBorder: true,
      shadow: 'xs'
    },
    initialState: {
      density: 'xs'
    },
    paginationDisplayMode: 'pages'
  });

   return <MantineReactTable table={table} localization={MRT_Localization_ZH_HANS} />;
}
