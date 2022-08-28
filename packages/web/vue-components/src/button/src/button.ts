import { Loading } from '@element-plus/icons-vue'
import { useSizeProp } from '@element-plus-next/vue-hooks'
import { buildProps, iconPropType } from '@element-plus-next/vue-utils'
import type { ExtractPropTypes } from 'vue'
import type button from './button.vue'

export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  /**
   * @deprecated
   * Text type will be deprecated in the next major version (3.0.0)
   */
  'text',
  '',
] as const
export const buttonNativeTypes = ['button', 'submit', 'reset'] as const

export const buttonProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  type: {
    type: String,
    values: buttonTypes,
    default: '',
  },
  icon: {
    type: iconPropType,
    default: '',
  },
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: 'button',
  },
  loading: Boolean,
  loadingIcon: {
    type: iconPropType,
    default: () => Loading,
  },
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: undefined,
  },
} as const)
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits

export type ButtonType = ButtonProps['type']
export type ButtonNativeType = ButtonProps['nativeType']

export type ButtonInstance = InstanceType<typeof button>
