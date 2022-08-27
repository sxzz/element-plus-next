import type { Primitive } from 'type-fest'

export const tuple = <T extends Primitive[]>(...args: T) => args
export const unique = <T>(arr: T[]) => [...new Set(arr)]

type Many<T> = T | ReadonlyArray<T>
// TODO: rename to `ensureArray`
/** like `_.castArray`, except falsy value returns empty array. */
export const castArray = <T>(arr: Many<T>): T[] => {
  if (!arr && (arr as any) !== 0) return []
  return Array.isArray(arr) ? arr : [arr]
}

// TODO: remove import alias
// avoid naming conflicts
export { castArray as ensureArray } from 'lodash-unified'

// v3 TODO
// export const ensureArray = <T = any>(arr: any): T[] => {
//   if (!arr && arr !== 0) return []
//   return Array.isArray(arr) ? arr : [arr]
// }
// export { castArray } from 'lodash-unified'
