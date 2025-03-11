import { GitHub, Google } from '@/components/icons'
import { Twitter } from '@/components/icons/Twitter'
import {
  ActionIcon,
  Anchor,
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useCountdown } from 'usehooks-ts'

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignIn,
})

function SignIn() {
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
  })

  return (
    <Paper withBorder shadow="xs" radius="md" p="xl" w="100%" maw="26rem">
      <Title order={3} mb={2}>登录</Title>
      <Text c="dimmed" size="xs" mb="md">
        使用您的手机号或者邮箱登录
      </Text>
      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          <TextInput required label="账号" placeholder="手机号/邮箱" />
          <PasswordInput required label="密码" />
          <Group justify="space-between">
            <Checkbox size="sm" defaultChecked label="记住我" />
            <Anchor size="sm" href="https://mantine.dev/" target="_blank">
              忘记密码
            </Anchor>
          </Group>
          <Button type="submit" fullWidth>登录</Button>
        </Stack>
      </form>
      <Divider label="或通过以下方式登录" labelPosition="center" my="md" />
      <Group justify="center">
        <ActionIcon size="lg" variant="default">
          <Google size={14} />
        </ActionIcon>
        <ActionIcon size="lg" variant="default">
          <GitHub size={14} />
        </ActionIcon>
        <ActionIcon size="lg" variant="default">
          <Twitter size={14} color="#00ACEE" />
        </ActionIcon>
      </Group>
      <Center inline w="100%" mt="md">
        <Text size="sm">还没有账号？</Text>
        <Anchor size="sm" component={Link} to="/sign-up">
          立即注册
        </Anchor>
      </Center>
    </Paper>
  )
}
