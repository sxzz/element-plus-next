import { tuple } from '@element-plus-dev/utils'
import { buildProps } from '@element-plus-dev/vue-utils'

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
