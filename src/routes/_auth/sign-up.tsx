import type { ApiErrors } from '@/api'
import type { ReceiverType } from '@/api/__generated/model/enums'
import { api } from '@/api'
import { Form } from '@/components'
import { useCountdown } from '@/hooks'
import { notification } from '@/utils'
import {
  Anchor,
  Button,
  Center,
  Group,
  Paper,
  PasswordInput,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { IconDeviceMobile, IconMail } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useRef, useState } from 'react'

export const Route = createFileRoute('/_auth/sign-up')({
  component: SignUp,
})

interface FormValues {
  account: string
  verificationCode: string
  password: string
  confirmPassword: string
}

function handleError(error: ApiErrors['authService']['signUp']) {
  switch (error.family) {
    case 'VERIFICATION_CODE':
      switch (error.code) {
        case 'EXPIRED':
          notification.error({ message: '验证码已过期' })
          break
        case 'MISMATCH':
          notification.error({ message: '验证码错误' })
          break
      }
      break
    case 'AUTH':
      switch (error.code) {
        case 'ACCOUNT_ALREADY_EXISTS':
          notification.error({ message: '账号已存在' })
          break
      }
      break
  }
}

function SignUp() {
  const [accountType, setAccountType] = useState<ReceiverType>('EMAIL')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = Route.useNavigate()

  const countdown = useCountdown({
    initialValue: 60,
  })

  const sendVerificationCode = () => {
    if (inputRef.current?.reportValidity()) {
      const account = inputRef.current.value
      api.verificationCodeService.send({
        body: {
          receiverType: accountType,
          receiver: account,
          purpose: 'SIGN_UP',
        },
      })
      countdown.start()
    }
  }

  const signUp = useMutation({
    mutationFn: api.authService.signUp,
    onSuccess() {
      notification.success({ message: '注册成功' })
      navigate({ to: '/sign-in' })
    },
  })

  return (
    <Paper withBorder shadow="xs" radius="md" p="xl" w="100%" maw="28rem">
      <Title order={3} mb={2}>注册</Title>
      <Text c="dimmed" size="xs" mb="md">
        使用您的手机号或者邮箱注册
      </Text>
      <Form<FormValues> onSubmit={async (values) => {
        try {
          await signUp.mutateAsync({
            body: {
              accountType,
              ...values,
            },
          })
        }
        catch (e: unknown) {
          const error = e as ApiErrors['authService']['signUp']
          handleError(error)
        }
      }}
      >
        <Stack>
          <SegmentedControl
            fullWidth
            data={[
              {
                value: 'PHONE',
                label: (
                  <Center style={{ gap: 8 }}>
                    <IconDeviceMobile size={16} />
                    <span>手机号</span>
                  </Center>
                ),
              },
              {
                value: 'EMAIL',
                label: (
                  <Center style={{ gap: 8 }}>
                    <IconMail size={16} />
                    <span>邮箱</span>
                  </Center>
                ),
              },
            ]}
            value={accountType}
            onChange={value => setAccountType(value as ReceiverType)}
          />
          <Group align="end">
            <TextInput
              ref={inputRef}
              name="account"
              required
              label={accountType === 'PHONE' ? '手机号' : '邮箱'}
              flex={1}
              type={accountType === 'PHONE' ? 'tel' : 'email'}
            />
            <Button onClick={sendVerificationCode} variant="outline" disabled={countdown.value > 0}>
              {countdown.value > 0 ? `${countdown.value}s后重新发送` : '发送验证码'}
            </Button>
          </Group>
          <TextInput name="verificationCode" required label="验证码" />
          <PasswordInput name="password" required label="密码" />
          <PasswordInput name="confirmPassword" required label="确认密码" />
          <Button type="submit" fullWidth loading={signUp.isPending}>注册</Button>
        </Stack>
      </Form>
      <Center inline w="100%" mt="md">
        <Text size="sm">已有账号？</Text>
        <Anchor size="sm" component={Link} to="/sign-in">
          立即登录
        </Anchor>
      </Center>
    </Paper>
  )
}
