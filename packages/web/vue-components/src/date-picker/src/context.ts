import type { UseNamespaceReturn } from '@element-plus-next/vue-hooks'
import type { InjectionKey, SetupContext } from 'vue'

export interface DatePickerContext {
  slots: SetupContext['slots']
  pickerNs: UseNamespaceReturn
}

export const ROOT_PICKER_INJECTION_KEY: InjectionKey<DatePickerContext> =
  Symbol()
