import { componentSizes, datePickTypes } from '@element-plus-dev/constants'
import type { ComponentSize, DatePickType } from '@element-plus-dev/constants'

export const isValidComponentSize = (val: string): val is ComponentSize | '' =>
  ['', ...componentSizes].includes(val)

export const isValidDatePickType = (val: string): val is DatePickType =>
  ([...datePickTypes] as string[]).includes(val)
