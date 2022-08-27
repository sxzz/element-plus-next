import { computed, isRef, onScopeDispose, watch } from 'vue'
import {
  addClass,
  getScrollBarWidth,
  getStyle,
  hasClass,
  isClient,
  removeClass,
  throwError,
} from '@element-plus-next/utils'
import { useNamespace } from '../use-namespace'

import type { Ref } from 'vue'

/**
 * Hook that monitoring the ref value to lock or unlock the screen.
 * When the trigger became true, it assumes modal is now opened and vice versa.
 * @param trigger {Ref<boolean>}
 */
export const useLockscreen = (trigger: Ref<boolean>) => {
  if (!isRef(trigger)) {
    throwError(
      '[useLockscreen]',
      'You need to pass a ref param to this function'
    )
  }

  const ns = useNamespace('popup')

  const hiddenCls = computed(() => ns.bm('parent', 'hidden'))

  if (!isClient || hasClass(document.body, hiddenCls.value)) {
    return
  }

  let scrollBarWidth = 0
  let withoutHiddenClass = false
  let bodyWidth = '0'

  const cleanup = () => {
    removeClass(document.body, hiddenCls.value)
    if (withoutHiddenClass) {
      document.body.style.width = bodyWidth
    }
  }
  watch(trigger, (val) => {
    if (!val) {
      cleanup()
      return
    }

    withoutHiddenClass = !hasClass(document.body, hiddenCls.value)
    if (withoutHiddenClass) {
      bodyWidth = document.body.style.width
    }
    scrollBarWidth = getScrollBarWidth(ns.namespace.value)
    const bodyHasOverflow =
      document.documentElement.clientHeight < document.body.scrollHeight
    const bodyOverflowY = getStyle(document.body, 'overflowY')
    if (
      scrollBarWidth > 0 &&
      (bodyHasOverflow || bodyOverflowY === 'scroll') &&
      withoutHiddenClass
    ) {
      document.body.style.width = `calc(100% - ${scrollBarWidth}px)`
    }
    addClass(document.body, hiddenCls.value)
  })
  onScopeDispose(() => cleanup())
}
