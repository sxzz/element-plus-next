import { defineComponent, renderSlot, watch } from 'vue'
import { buildProps, definePropType } from '@element-plus-next/vue-utils'
import { provideGlobalConfig } from '@element-plus-next/vue-context'
import { useSizeProp } from '@element-plus-next/vue-hooks'
import type {
  GlobalConfig,
  GlobalConfigMessage,
} from '@element-plus-next/vue-context'
import type { ExtractPropTypes, InjectionKey, Ref } from 'vue'

export const messageConfig: GlobalConfigMessage = {}

export const configProviderProps = buildProps({
  // Controlling if the users want a11y features.
  a11y: {
    type: Boolean,
    default: true,
  },

  locale: {
    type: definePropType<GlobalConfig['locale']>(Object),
  },

  size: useSizeProp,

  button: {
    type: definePropType<GlobalConfig['button']>(Object),
  },

  experimentalFeatures: {
    type: definePropType<GlobalConfig['experimentalFeatures']>(Object),
  },

  // Controls if we should handle keyboard navigation
  keyboardNavigation: {
    type: Boolean,
    default: true,
  },

  message: {
    type: definePropType<GlobalConfig['message']>(Object),
  },

  zIndex: Number,

  namespace: {
    type: String,
    default: 'el',
  },
} as const)
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

const ConfigProvider = defineComponent({
  name: 'ElConfigProvider',
  props: configProviderProps,

  setup(props, { slots }) {
    watch(
      () => props.message,
      (val) => {
        Object.assign(messageConfig, val ?? {})
      },
      { immediate: true, deep: true }
    )
    const config = provideGlobalConfig(props)
    return () => renderSlot(slots, 'default', { config: config?.value })
  },
})
export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>

export type ConfigProviderContext = Partial<ConfigProviderProps>

export const configProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol('configProviderContextKey')

export default ConfigProvider
