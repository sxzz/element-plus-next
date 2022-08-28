import { withInstall } from '@element-plus-next/vue-utils'
import Popper from './src/popper.vue'

import ElPopperArrow from './src/arrow.vue'
import ElPopperTrigger from './src/trigger.vue'
import ElPopperContent from './src/content.vue'

export { ElPopperArrow, ElPopperTrigger, ElPopperContent }

export const ElPopper = withInstall(Popper)
export default ElPopper

export * from './src/popper'
export * from './src/trigger'
export * from './src/content'
export * from './src/arrow'
export * from './src/context'

export type { Placement, Options } from '@popperjs/core'
export type ElPopperArrowInstance = InstanceType<typeof ElPopperArrow>
export type ElPopperArrowTrigger = InstanceType<typeof ElPopperTrigger>
export type ElPopperArrowContent = InstanceType<typeof ElPopperContent>
