import { Button, Checkbox, createTheme, PasswordInput, TextInput } from '@mantine/core'

const formItemStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
} as const

export const theme = createTheme({
  /* Put your mantine theme override here */
  components: {
    Button: Button.extend({
      defaultProps: {
        loaderProps: {
          type: 'dots',
        },
      },
    }),
    TextInput: TextInput.extend({
      styles: {
        root: {
          ...formItemStyles,
        },
      },
    }),
    PasswordInput: PasswordInput.extend({
      styles: {
        root: {
          ...formItemStyles,
        },
      },
    }),
    Checkbox: Checkbox.extend({
      styles: {
        label: {
          paddingInlineStart: '0.5rem',
        },
      },
    }),
  },
})
