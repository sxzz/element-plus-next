import { buildProps } from '@element-plus-next/vue-utils'

import type { ExtractPropTypes, InjectionKey, Ref } from 'vue'

import type { useNamespace } from '@element-plus-next/vue-hooks'

/**
 * TODO: make this under constants or tokens
 */
export const tooltipV2CommonProps = buildProps({
  nowrap: Boolean,
} as const)

export type TooltipV2CommonProps = ExtractPropTypes<typeof tooltipV2CommonProps>

export enum TooltipV2Sides {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

export const tooltipV2Sides = Object.values(TooltipV2Sides)

export const tooltipV2OppositeSide = {
  [TooltipV2Sides.top]: TooltipV2Sides.bottom,
  [TooltipV2Sides.bottom]: TooltipV2Sides.top,
  [TooltipV2Sides.left]: TooltipV2Sides.right,
  [TooltipV2Sides.right]: TooltipV2Sides.left,
} as const

export const tooltipV2ArrowBorders = {
  [TooltipV2Sides.top]: [TooltipV2Sides.left, TooltipV2Sides.top],
  [TooltipV2Sides.bottom]: [TooltipV2Sides.bottom, TooltipV2Sides.right],
  [TooltipV2Sides.left]: [TooltipV2Sides.bottom, TooltipV2Sides.left],
  [TooltipV2Sides.right]: [TooltipV2Sides.top, TooltipV2Sides.right],
} as const

export type TooltipV2Context = {
  onClose: () => void
  onDelayOpen: () => void
  onOpen: () => void
  contentId: Ref<string>
  triggerRef: Ref<HTMLElement | null>
  ns: ReturnType<typeof useNamespace>
}

export type TooltipV2ContentContext = {
  arrowRef: Ref<HTMLElement | null>
}

export const tooltipV2RootKey: InjectionKey<TooltipV2Context> =
  Symbol('tooltipV2')

export const tooltipV2ContentKey: InjectionKey<TooltipV2ContentContext> =
  Symbol('tooltipV2Content')

export const TOOLTIP_V2_OPEN = 'tooltip_v2.open'
