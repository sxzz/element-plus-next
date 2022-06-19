import { tuple } from '@element-plus-next/utils'
import { buildProps } from '@element-plus-next/vue-utils'

export const buttonTypes = tuple(
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  'text',
  ''
)

export const buttonNativeTypes = tuple('button', 'submit', 'reset')

export const buttonProps = buildProps({
  type: {
    type: String,
    values: buttonTypes,
    default: '',
  },

  disabled: Boolean,
} as const)
