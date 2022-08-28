import { withInstall, withInstallDirective } from '@element-plus-next/vue-utils'

import Popover from './src/popover.vue'
import PopoverDirective, { VPopover } from './src/directive'

export const ElPopoverDirective = withInstallDirective(
  PopoverDirective,
  VPopover
)

export const ElPopover = withInstall(Popover, {
  directive: ElPopoverDirective,
})
export default ElPopover

export * from './src/popover'
