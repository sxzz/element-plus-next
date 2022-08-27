import type { InjectionKey, Ref } from 'vue'

export type CarouselItemStates = {
  hover: boolean
  translate: number
  scale: number
  active: boolean
  ready: boolean
  inStage: boolean
  animating: boolean
}

export type CarouselItemContext = {
  // v3 TODO: rename any
  props: any
  states: CarouselItemStates
  uid: number | undefined
  translateItem: (index: number, activeIndex: number, oldIndex?: number) => void
}

export type CarouselContext = {
  root: Ref<HTMLElement | undefined>
  items: Ref<CarouselItemContext[]>
  isCardType: Ref<boolean>
  isVertical: Ref<boolean>
  loop: boolean
  addItem: (item: CarouselItemContext) => void
  removeItem: (uid: number | undefined) => void
  setActiveItem: (index: number) => void
}

export const carouselContextKey: InjectionKey<CarouselContext> =
  Symbol('carouselContextKey')
