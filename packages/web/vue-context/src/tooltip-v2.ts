import type { InjectionKey, Ref } from 'vue'

export type TooltipV2Context = {
  onClose: () => void
  onDelayOpen: () => void
  onOpen: () => void
  contentId: Ref<string>
  triggerRef: Ref<HTMLElement | null>
  // v3 TODO: remove any
  ns: any /* ReturnType<typeof useNamespace> */
}

export type TooltipV2ContentContext = {
  arrowRef: Ref<HTMLElement | null>
}

export const tooltipV2RootKey: InjectionKey<TooltipV2Context> =
  Symbol('tooltipV2')

export const tooltipV2ContentKey: InjectionKey<TooltipV2ContentContext> =
  Symbol('tooltipV2Content')

export const TOOLTIP_V2_OPEN = 'tooltip_v2.open'
