import { CircleClose } from '@element-plus/icons-vue'
import { isValidComponentSize } from '@element-plus-next/vue-utils'
import { useTooltipContentProps } from '../../tooltip'

import type { Component, PropType } from 'vue'
import type { ComponentSize } from '@element-plus-next/constants'
import type { OptionType } from './select.types'
import type { Options } from '../../popper'

export const SelectProps = {
  allowCreate: Boolean,
  autocomplete: {
    type: String as PropType<'none' | 'both' | 'list' | 'inline'>,
    default: 'none',
  },
  automaticDropdown: Boolean,
  clearable: Boolean,
  clearIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: CircleClose,
  },
  effect: {
    type: String as PropType<'light' | 'dark' | string>,
    default: 'light',
  },
  collapseTags: Boolean,
  collapseTagsTooltip: {
    type: Boolean,
    default: false,
  },
  defaultFirstOption: Boolean,
  disabled: Boolean,
  estimatedOptionHeight: {
    type: Number,
    default: undefined,
  },
  filterable: Boolean,
  filterMethod: Function,
  height: {
    type: Number,
    default: 170, // 5 items by default
  },
  itemHeight: {
    type: Number,
    default: 34,
  },
  id: String,
  loading: Boolean,
  loadingText: String,
  label: String,
  modelValue: [Array, String, Number, Boolean, Object] as PropType<
    any[] | string | number | boolean | Record<string, any> | any
  >,
  multiple: Boolean,
  multipleLimit: {
    type: Number,
    default: 0,
  },
  name: String,
  noDataText: String,
  noMatchText: String,
  remoteMethod: Function,
  reserveKeyword: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array as PropType<OptionType[]>,
    required: true,
  },
  placeholder: {
    type: String,
  },
  teleported: useTooltipContentProps.teleported,
  persistent: {
    type: Boolean,
    default: true,
  },
  popperClass: {
    type: String,
    default: '',
  },
  popperOptions: {
    type: Object as PropType<Partial<Options>>,
    default: () => ({} as Partial<Options>),
  },
  remote: Boolean,
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false,
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
}

export const OptionProps = {
  data: Array,
  disabled: Boolean,
  hovering: Boolean,
  item: Object,
  index: Number,
  style: Object,
  selected: Boolean,
  created: Boolean,
}
