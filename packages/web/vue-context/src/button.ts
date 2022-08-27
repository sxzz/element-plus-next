import type { InjectionKey } from 'vue'

export interface ButtonGroupContext {
  // v3 TODO
  size?: any
  type?: any
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol(
  'buttonGroupContextKey'
)
