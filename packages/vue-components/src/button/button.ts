import { tuple } from '@element-plus/utils'
import { buildProps } from '@element-plus/vue-utils'

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
