<template>
  <div
    ref="breadcrumb"
    :class="ns.b()"
    aria-label="Breadcrumb"
    role="navigation"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from 'vue'
import { useNamespace } from '@element-plus-next/vue-hooks'
import { breadcrumbContextKey, breadcrumbProps } from './breadcrumb'

defineOptions({
  name: 'ElBreadcrumb',
})

const props = defineProps(breadcrumbProps)

const ns = useNamespace('breadcrumb')
const breadcrumb = ref<HTMLDivElement>()

provide(breadcrumbContextKey, props)

onMounted(() => {
  const items = breadcrumb.value!.querySelectorAll(`.${ns.e('item')}`)
  if (items.length) {
    items[items.length - 1].setAttribute('aria-current', 'page')
  }
})
</script>
