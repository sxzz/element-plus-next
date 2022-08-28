import { isNumber } from '@element-plus-next/utils'
import { buildProps } from '@element-plus-next/vue-utils'
import type { CarouselItemContext } from './carousel-item'
import type { ExtractPropTypes, InjectionKey, Ref } from 'vue'
import type Carousel from './carousel.vue'

export const carouselProps = buildProps({
  initialIndex: {
    type: Number,
    default: 0,
  },
  height: {
    type: String,
    default: '',
  },
  trigger: {
    type: String,
    values: ['hover', 'click'],
    default: 'hover',
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  interval: {
    type: Number,
    default: 3000,
  },
  indicatorPosition: {
    type: String,
    values: ['', 'none', 'outside'],
    default: '',
  },
  indicator: {
    type: Boolean,
    default: true,
  },
  arrow: {
    type: String,
    values: ['always', 'hover', 'never'],
    default: 'hover',
  },
  type: {
    type: String,
    values: ['', 'card'],
    default: '',
  },
  loop: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
  pauseOnHover: {
    type: Boolean,
    default: true,
  },
} as const)

export const carouselEmits = {
  change: (current: number, prev: number) => [current, prev].every(isNumber),
}

export type CarouselProps = ExtractPropTypes<typeof carouselProps>
export type CarouselEmits = typeof carouselEmits

export type CarouselInstance = InstanceType<typeof Carousel>

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
