import { mutable } from '@element-plus-next/utils'
import { buildProps, definePropType } from '@element-plus-next/vue-utils'
import type { ExtractPropTypes } from 'vue'
import type { TabsPaneContext } from './tabs'
import type TabBar from './tab-bar.vue'

export const tabBarProps = buildProps({
  tabs: {
    type: definePropType<TabsPaneContext[]>(Array),
    default: () => mutable([] as const),
  },
} as const)

export type TabBarProps = ExtractPropTypes<typeof tabBarProps>
export type TabBarInstance = InstanceType<typeof TabBar>
