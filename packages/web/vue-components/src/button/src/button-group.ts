import { buttonProps } from './button'

import type { ExtractPropTypes, InjectionKey } from 'vue'
import type buttonGroup from './button-group.vue'

export const buttonGroupProps = {
  size: buttonProps.size,
  type: buttonProps.type,
} as const
export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>

export type ButtonGroupInstance = InstanceType<typeof buttonGroup>

export interface ButtonGroupContext {
  size?: ButtonGroupProps['size']
  type?: ButtonGroupProps['type']
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol(
  'buttonGroupContextKey'
)
