import { buildProps } from '@element-plus-next/vue-utils'
import type { ComputedRef, ExtractPropTypes, InjectionKey } from 'vue'
import type Row from './row.vue'

export const RowJustify = [
  'start',
  'center',
  'end',
  'space-around',
  'space-between',
  'space-evenly',
] as const

export const RowAlign = ['top', 'middle', 'bottom'] as const

export const rowProps = buildProps({
  tag: {
    type: String,
    default: 'div',
  },
  gutter: {
    type: Number,
    default: 0,
  },
  justify: {
    type: String,
    values: RowJustify,
    default: 'start',
  },
  align: {
    type: String,
    values: RowAlign,
    default: 'top',
  },
} as const)

export type RowProps = ExtractPropTypes<typeof rowProps>
export type RowInstance = InstanceType<typeof Row>

interface RowContext {
  gutter: ComputedRef<number>
}

export const rowContextKey: InjectionKey<RowContext> = Symbol('rowContextKey')
