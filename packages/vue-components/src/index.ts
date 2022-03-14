import { defineComponent, h } from 'vue'

export const ElButton = defineComponent({
  setup(props, { slots }) {
    return () => h('button', { class: 'el-button' }, slots?.default?.())
  },
})
