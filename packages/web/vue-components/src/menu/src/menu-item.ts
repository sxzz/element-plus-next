import { isString } from '@element-plus-next/utils'
import { buildProps, definePropType } from '@element-plus-next/vue-utils'

import type { ExtractPropTypes } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { MenuItemRegistered } from './types'

export const menuItemProps = buildProps({
  index: {
    type: definePropType<string | null>([String, null]),
    default: null,
  },
  route: {
    type: definePropType<RouteLocationRaw>([String, Object]),
  },
  disabled: Boolean,
} as const)
export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>

export const menuItemEmits = {
  click: (item: MenuItemRegistered) =>
    isString(item.index) && Array.isArray(item.indexPath),
}
export type MenuItemEmits = typeof menuItemEmits
