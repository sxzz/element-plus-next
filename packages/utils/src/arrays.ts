import type { Primitive } from 'type-fest'

export const tuple = <T extends Primitive[]>(...args: T) => args
export const unique = <T>(arr: T[]) => [...new Set(arr)]

export const ensureArray = <T = any>(arr: any): T[] => {
  if (!arr && arr !== 0) return []
  return Array.isArray(arr) ? arr : [arr]
}
export { castArray } from 'lodash-unified'
