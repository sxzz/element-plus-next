import { NOOP, mutable } from '@element-plus-next/utils'
import { buildProps, definePropType } from '@element-plus-next/vue-utils'
import { uploadListTypes } from './upload'
import type { ExtractPropTypes } from 'vue'
import type { UploadFile, UploadFiles, UploadHooks } from './upload'
import type UploadList from './upload-list.vue'

export const uploadListProps = buildProps({
  files: {
    type: definePropType<UploadFiles>(Array),
    default: () => mutable([]),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  handlePreview: {
    type: definePropType<UploadHooks['onPreview']>(Function),
    default: NOOP,
  },
  listType: {
    type: String,
    values: uploadListTypes,
    default: 'text',
  },
} as const)

export type UploadListProps = ExtractPropTypes<typeof uploadListProps>
export const uploadListEmits = {
  remove: (file: UploadFile) => !!file,
}
export type UploadListEmits = typeof uploadListEmits
export type UploadListInstance = InstanceType<typeof UploadList>
