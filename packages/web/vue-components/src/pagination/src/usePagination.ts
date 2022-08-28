import { inject } from 'vue'
import { elPaginationKey } from '@element-plus-next/vue-context'

export const usePagination = () => inject(elPaginationKey, {})
