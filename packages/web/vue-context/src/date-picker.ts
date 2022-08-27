import type { InjectionKey, SetupContext } from 'vue'

interface DatePickerContext {
  slots: SetupContext['slots']
  // v3 TODO: rename any
  pickerNs: any // UseNamespaceReturn
}

export const ROOT_PICKER_INJECTION_KEY: InjectionKey<DatePickerContext> =
  Symbol()
