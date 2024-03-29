<template>
  <li
    v-if="divided"
    role="separator"
    :class="ns.bem('menu', 'item', 'divided')"
    v-bind="$attrs"
  />
  <li
    :ref="itemRef"
    v-bind="{ ...dataset, ...$attrs }"
    :aria-disabled="disabled"
    :class="[ns.be('menu', 'item'), ns.is('disabled', disabled)]"
    :tabindex="tabIndex"
    :role="role"
    @click="(e) => $emit('clickimpl', e)"
    @focus="handleFocus"
    @keydown="handleKeydown"
    @mousedown="handleMousedown"
    @pointermove="(e) => $emit('pointermove', e)"
    @pointerleave="(e) => $emit('pointerleave', e)"
  >
    <el-icon v-if="icon"><component :is="icon" /></el-icon>
    <slot />
  </li>
</template>

<script lang="ts">
// @ts-nocheck
import { computed, defineComponent, inject } from 'vue'
import { useNamespace } from '@element-plus-next/vue-hooks'
import { composeEventHandlers } from '@element-plus-next/utils'
import { composeRefs } from '@element-plus-next/vue-utils'
import { EVENT_CODE } from '@element-plus-next/constants'
import {
  ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY,
  ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY,
} from '../../roving-focus-group'
import { COLLECTION_ITEM_SIGN } from '../../collection'
import { ElIcon } from '../../icon'
import {
  DROPDOWN_COLLECTION_ITEM_INJECTION_KEY,
  dropdownItemProps,
} from './dropdown'
import { DROPDOWN_INJECTION_KEY } from './tokens'

export default defineComponent({
  name: 'DropdownItemImpl',
  components: {
    ElIcon,
  },
  props: dropdownItemProps,
  emits: ['pointermove', 'pointerleave', 'click', 'clickimpl'],
  setup(_, { emit }) {
    const ns = useNamespace('dropdown')

    const { role: menuRole } = inject(DROPDOWN_INJECTION_KEY, undefined)!

    const { collectionItemRef: dropdownCollectionItemRef } = inject(
      DROPDOWN_COLLECTION_ITEM_INJECTION_KEY,
      undefined
    )!

    const { collectionItemRef: rovingFocusCollectionItemRef } = inject(
      ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY,
      undefined
    )!

    const {
      rovingFocusGroupItemRef,
      tabIndex,
      handleFocus,
      handleKeydown: handleItemKeydown,
      handleMousedown,
    } = inject(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, undefined)!

    const itemRef = composeRefs(
      dropdownCollectionItemRef,
      rovingFocusCollectionItemRef,
      rovingFocusGroupItemRef
    )

    const role = computed<string>(() => {
      if (menuRole.value === 'menu') {
        return 'menuitem'
      } else if (menuRole.value === 'navigation') {
        return 'link'
      }
      return 'button'
    })

    const handleKeydown = composeEventHandlers((e: KeyboardEvent) => {
      const { code } = e
      if (code === EVENT_CODE.enter || code === EVENT_CODE.space) {
        e.preventDefault()
        e.stopImmediatePropagation()
        emit('clickimpl', e)
        return true
      }
    }, handleItemKeydown)

    return {
      ns,
      itemRef,
      dataset: {
        [COLLECTION_ITEM_SIGN]: '',
      },
      role,
      tabIndex,
      handleFocus,
      handleKeydown,
      handleMousedown,
    }
  },
})
</script>
