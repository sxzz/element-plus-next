import { inject } from 'vue'
import { elPaginationKey } from './pagination'

export const usePagination = () => inject(elPaginationKey, {})
