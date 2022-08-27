import type { InjectionKey } from 'vue'

// export interface RadioGroupContext extends RadioGroupProps {
//   changeEvent: (val: RadioGroupProps['modelValue']) => void
// }

// v3 TODO: rename any
type RadioGroupContext = any

// v3 TODO: rename
export const radioGroupKey: InjectionKey<RadioGroupContext> =
  Symbol('radioGroupKey')
