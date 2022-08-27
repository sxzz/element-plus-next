// move to @element-plus-next/utils
import { componentSizeMap } from '@element-plus-next/constants'

import type { ComponentSize } from '@element-plus-next/constants'

export const getComponentSize = (size?: ComponentSize) => {
  return componentSizeMap[size || 'default']
}
