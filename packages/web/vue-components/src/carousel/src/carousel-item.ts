import { buildProps } from '@element-plus-next/vue-utils'
import type { ExtractPropTypes } from 'vue'
import type CarouselItem from './carousel-item.vue'

export const carouselItemProps = buildProps({
  name: { type: String, default: '' },
  label: {
    type: [String, Number],
    default: '',
  },
} as const)

export type CarouselItemProps = ExtractPropTypes<typeof carouselItemProps>

export type CarouselItemInstance = InstanceType<typeof CarouselItem>

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
  props: CarouselItemProps
  states: CarouselItemStates
  uid: number | undefined
  translateItem: (index: number, activeIndex: number, oldIndex?: number) => void
}
