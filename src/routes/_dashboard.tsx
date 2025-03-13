import { AppShell, Burger, Group, NavLink, Skeleton, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconFingerprint, IconGauge, IconSettings, IconSitemap, IconUser, IconUserCheck } from '@tabler/icons-react'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  const theme = useMantineTheme()
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  return (
    <AppShell
      layout="alt"
      header={{ height: 52 }}
      navbar={{
        width: 240,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="sm"
      bg={theme.colors.gray[0]}
    >
      <AppShell.Header>
        <Group h="100%" px={14}>
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size={14} />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size={14} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="xs">
        <NavLink
          component={Link}
          to="/dashboard"
          label="仪表盘"
          leftSection={<IconGauge size={16} stroke={1.5} />}
          childrenOffset={28}
        />

        <NavLink
          label="系统管理"
          leftSection={<IconSettings size={16} stroke={1.5} />}
          childrenOffset={28}
          defaultOpened
        >
          <NavLink label="用户管理" component={Link} to="/settings/user" leftSection={<IconUser size={16} stroke={1.5} />} />
          <NavLink label="角色管理" component={Link} to="/settings/role" leftSection={<IconUserCheck size={16} stroke={1.5} />} />
          <NavLink label="部门管理" component={Link} to="/settings/department" leftSection={<IconSitemap size={16} stroke={1.5} />} />
        </NavLink>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
