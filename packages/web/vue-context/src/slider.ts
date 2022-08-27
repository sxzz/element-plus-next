import type { ComputedRef, InjectionKey, Ref } from 'vue'

// v3 TODO: remove any
export interface SliderContext
  extends Record<string, any> /* ToRefs<SliderProps> */ {
  precision: ComputedRef<number>
  sliderSize: Ref<number>
  emitChange: () => void
  resetSize: () => void
  updateDragging: (val: boolean) => void
}

export const sliderContextKey: InjectionKey<SliderContext> =
  Symbol('sliderContextKey')
