import { buildProps, iconPropType } from '@element-plus-next/vue-utils'
import type { ExtractPropTypes } from 'vue'
import type Breadcrumb from './breadcrumb.vue'

export const breadcrumbProps = buildProps({
  separator: {
    type: String,
    default: '/',
  },
  separatorIcon: {
    type: iconPropType,
    default: '',
  },
} as const)
export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
export type BreadcrumbInstance = InstanceType<typeof Breadcrumb>
