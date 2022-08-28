import { withInstall } from '@element-plus-next/vue-utils'
import TooltipV2 from './src/tooltip.vue'

// DO NOT REMOVE
// @ts-expect-error fix TS2742 https://github.com/microsoft/TypeScript/issues/42873#issuecomment-1193972441
// eslint-disable-next-line @typescript-eslint/no-unused-vars, import/no-duplicates
import type { Placement, Strategy, VirtualElement } from '@floating-ui/dom'

export const ElTooltipV2 = withInstall(TooltipV2)
export * from './src/arrow'
export * from './src/content'
export * from './src/root'
export * from './src/tooltip'
export * from './src/trigger'

export default ElTooltipV2
