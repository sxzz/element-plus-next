import { buildProps, definePropType } from '@element-plus-next/vue-utils'
import { tooltipV2RootProps } from './root'
import { tooltipV2TriggerProps } from './trigger'
import { tooltipV2ArrowProps } from './arrow'
import { tooltipV2ContentProps } from './content'

import type { ExtractPropTypes, TeleportProps, TransitionProps } from 'vue'

// DO NOT REMOVE
// @ts-expect-error fix TS2742 https://github.com/microsoft/TypeScript/issues/42873#issuecomment-1193972441
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Placement, Strategy, VirtualElement } from '@floating-ui/dom'

export const tooltipV2Props = buildProps({
  ...tooltipV2RootProps,
  ...tooltipV2ArrowProps,
  ...tooltipV2TriggerProps,
  ...tooltipV2ContentProps,
  alwaysOn: Boolean,
  fullTransition: Boolean,
  transitionProps: {
    type: definePropType<TransitionProps | null>(Object),
    default: null,
  },
  teleported: Boolean,
  to: {
    type: definePropType<TeleportProps['to']>(String),
    default: 'body',
  },
} as const)

export type TooltipV2Props = ExtractPropTypes<typeof tooltipV2Props>
