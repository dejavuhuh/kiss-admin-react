import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'

interface NotificationOptions {
  title?: string
  message: string
}

export const notification = {
  error({ title, message }: NotificationOptions) {
    notifications.show({
      color: 'red',
      title,
      message,
      icon: <IconX size={20} />,
    })
  },
  success({ title, message }: NotificationOptions) {
    notifications.show({
      color: 'teal',
      title,
      message,
      icon: <IconCheck size={20} />,
    })
  },
}
