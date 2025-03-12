import type { ApiErrors } from '@/api'
import type { SignInRequest } from '@/api/__generated/model/static'
import { api } from '@/api'
import { Form } from '@/components'
import { GitHub, Google } from '@/components/icons'
import { Twitter } from '@/components/icons/Twitter'
import { notification } from '@/utils'
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
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignIn,
})

function handleError(error: ApiErrors['authService']['signIn']) {
  if (error.family === 'AUTH' && error.code === 'ACCOUNT_OR_PASSWORD_MISMATCH') {
    notification.error({ message: '账号或密码错误' })
  }
}

function SignIn() {
  const navigate = Route.useNavigate()

  const signIn = useMutation({
    mutationFn: api.authService.signIn,
    onSuccess() {
      notification.success({ message: '欢迎回来' })
      navigate({ to: '/' })
    },
  })

  return (
    <Paper withBorder shadow="xs" radius="md" p="xl" w="100%" maw="26rem">
      <Title order={3} mb={2}>登录</Title>
      <Text c="dimmed" size="xs" mb="md">
        使用您的手机号或者邮箱登录
      </Text>
      <Form<SignInRequest> onSubmit={async (body) => {
        try {
          await signIn.mutateAsync({ body })
        }
        catch (e: unknown) {
          const error = e as ApiErrors['authService']['signIn']
          handleError(error)
        }
      }}
      >
        <Stack>
          <TextInput name="account" required label="账号" placeholder="手机号/邮箱" />
          <PasswordInput name="password" required label="密码" />
          <Group justify="space-between">
            <Checkbox size="sm" defaultChecked label="记住我" />
            <Anchor size="sm" href="https://mantine.dev/" target="_blank">
              忘记密码
            </Anchor>
          </Group>
          <Button type="submit" fullWidth loading={signIn.isPending}>登录</Button>
        </Stack>
      </Form>
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
