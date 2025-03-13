import type { RoleInput } from '@/api/__generated/model/static'
import type { MRT_ColumnDef } from 'mantine-react-table'
import { api } from '@/api'
import { Form } from '@/components'
import { Badge, Box, Button, Flex, Group, Modal, MultiSelect, Pill, Stack, TextInput, Tooltip, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDownload, IconHelp, IconPlus, IconQuestionMark, IconTrash } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'
import {
  MantineReactTable,

  MRT_Table,
  useMantineReactTable,
} from 'mantine-react-table'
import { MRT_Localization_ZH_HANS } from 'mantine-react-table/locales/zh-Hans/index.cjs'
import { useMemo } from 'react'

export const Route = createFileRoute('/_dashboard/settings/role/')({
  component: RoleManagement,
})

interface Person {
  name: string
  code: string
  inherited: number[]
  createdAt: string
}

// nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    name: '管理员',
    code: 'ADMIN',
    inherited: [1, 2, 3],
    createdAt: '2021-09-01 12:00:00',
  },
  {
    name: '管理员',
    code: 'ADMIN',
    inherited: [1, 2, 3],
    createdAt: '2021-09-01 12:00:00',

  },
  {
    name: '管理员',
    code: 'ADMIN',
    inherited: [1, 2, 3],
    createdAt: '2021-09-01 12:00:00',

  },
  {
    name: '管理员',
    code: 'ADMIN',
    inherited: [1, 2, 3],
    createdAt: '2021-09-01 12:00:00',

  },
  {
    name: '管理员',
    code: 'ADMIN',
    inherited: [1, 2, 3],
    createdAt: '2021-09-01 12:00:00',

  },
  {
    name: '管理员',
    code: 'ADMIN',
    inherited: [1, 2, 3],
    createdAt: '2021-09-01 12:00:00',

  },
  {
    name: '管理员',
    code: 'ADMIN',
    inherited: [1, 2, 3],
    createdAt: '2021-09-01 12:00:00',

  },
  {
    name: '管理员',
    code: 'ADMIN',
    inherited: [1, 2, 3],
    createdAt: '2021-09-01 12:00:00',

  },
  {
    name: '管理员',
    code: 'ADMIN',
    inherited: [1, 2, 3],
    createdAt: '2021-09-01 12:00:00',

  },
  {
    name: '管理员',
    code: 'ADMIN',
    inherited: [1, 2, 3],
    createdAt: '2021-09-01 12:00:00',
  },
]

function RoleManagement() {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name', // access nested data with dot notation
        header: '角色名称',
      },
      {
        accessorKey: 'code',
        header: '角色编码',
      },
      {
        accessorKey: 'inherited', // normal accessorKey
        header: '继承角色',
        Cell: () => (
          <Group gap="xs">
            <Badge variant="light" color="blue">财务</Badge>
            <Badge variant="light" color="blue">核算</Badge>
          </Group>
        ),
        editVariant: 'multi-select',
      },
      {
        accessorKey: 'createdAt',
        header: '创建时间',
      },
    ],
    [],
  )
  const [opened, { open, close }] = useDisclosure(false)
  const { colors } = useMantineTheme()

  const createRole = useMutation({
    mutationFn: api.roleService.createRole,
  })

  const table = useMantineReactTable({
    columns,
    data,
    enableColumnActions: true,
    enableColumnFilters: true,
    enablePagination: true,
    enableSorting: true,
    enableTopToolbar: true,
    enableBottomToolbar: true,
    enableRowSelection: true,
    positionToolbarAlertBanner: 'bottom',
    enableDensityToggle: false,
    localization: MRT_Localization_ZH_HANS,
    renderTopToolbarCustomActions: ({ table }) => (
      <Group p={4} gap="xs">
        <Modal opened={opened} onClose={close} title="创建角色">
          <Form<RoleInput> onSubmit={(body) => {
            createRole.mutate({ body })
          }}
          >
            <Stack>
              <TextInput name="name" required label="角色名称" />
              <TextInput name="code" required label="角色编码" />
              <MultiSelect
                defaultValue={[]}
                name="inheritedRoleIds"
                label={(
                  <Flex gap={2} align="center">
                    继承角色
                    <Tooltip label="自动拥有继承角色的所有权限" color={colors.gray[7]} withArrow>
                      <IconHelp color={colors.gray[6]} cursor="help" size={14} />
                    </Tooltip>
                  </Flex>
                )}
              />
              <Group gap="xs" justify="flex-end">
                <Button variant="subtle">
                  取消
                </Button>
                <Button type="submit" loading={createRole.isPending}>
                  创建
                </Button>
              </Group>
            </Stack>
          </Form>
        </Modal>
        <Button
          onClick={open}
          leftSection={<IconPlus size={14} />}
          size="xs"
        >
          创建角色
        </Button>
        <Button
          disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
          variant="light"
          leftSection={<IconDownload size={14} />}
          size="xs"

        >
          批量导出
        </Button>
        <Button
          disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
          color="red"
          variant="light"
          leftSection={<IconTrash size={14} />}
          size="xs"

        >
          批量删除
        </Button>
      </Group>
    ),
    mantineTableProps: {
      highlightOnHover: true,
      withRowBorders: true,
    },
    mantinePaperProps: {
      radius: 'sm',
      withBorder: true,
      shadow: 'xs',
    },
    initialState: {
      density: 'xs',
    },
    paginationDisplayMode: 'pages',
  })

  return (
    <MantineReactTable table={table} />
  )
}
