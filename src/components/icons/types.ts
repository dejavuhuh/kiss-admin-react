import type { BoxProps, ElementProps } from '@mantine/core'

export interface IconProps extends BoxProps, ElementProps<'svg', 'display' | 'opacity'> {
  size?: number | string
}
