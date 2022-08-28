<template>
  <div :class="ns.b()" role="tablist" aria-multiselectable="true">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, watch } from 'vue'
import { ensureArray } from '@element-plus-next/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus-next/constants'
import { useNamespace } from '@element-plus-next/vue-hooks'
import { collapseContextKey } from '@element-plus-next/vue-context'
import { collapseEmits, collapseProps } from './collapse'
import type { CollapseActiveName } from './collapse'

defineOptions({
  name: 'ElCollapse',
})
const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const ns = useNamespace('collapse')
const activeNames = ref(ensureArray(props.modelValue))

const setActiveNames = (_activeNames: CollapseActiveName[]) => {
  activeNames.value = _activeNames
  const value = props.accordion ? activeNames.value[0] : activeNames.value
  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, value)
}

const handleItemClick = (name: CollapseActiveName) => {
  if (props.accordion) {
    setActiveNames([
      (activeNames.value[0] || activeNames.value[0] === 0) &&
      activeNames.value[0] === name
        ? ''
        : name,
    ])
  } else {
    const _activeNames = [...activeNames.value]
    const index = _activeNames.indexOf(name)

    if (index > -1) {
      _activeNames.splice(index, 1)
    } else {
      _activeNames.push(name)
    }
    setActiveNames(_activeNames)
  }
}

watch(
  () => props.modelValue,
  () => (activeNames.value = ensureArray(props.modelValue)),
  { deep: true }
)

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})

defineExpose({
  /** @description active names */
  activeNames,
  /** @description set active names */
  setActiveNames,
})
</script>
