export {
  camelize,
  capitalize,
  hyphenate,
  hyphenate as kebabCase, // alias
} from '@vue/shared'

// v3 TODO use dep
// export { default as escapeStringRegexp } from 'escape-string-regexp'

/**
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
 */
export const escapeStringRegexp = (string = '') =>
  string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
