import { isClient } from '@element-plus-next/utils'

const globalNodes: HTMLElement[] = []
let target: HTMLElement = isClient ? document.body : (undefined as any)

export function createGlobalNode(id?: string) {
  const el = document.createElement('div')
  if (id !== undefined) {
    el.setAttribute('id', id)
  }

  target.appendChild(el)
  globalNodes.push(el)

  return el
}

export function removeGlobalNode(el: HTMLElement) {
  globalNodes.splice(globalNodes.indexOf(el), 1)
  el.remove()
}

export function changeGlobalNodesTarget(el: HTMLElement) {
  if (el === target) return

  target = el
  globalNodes.forEach((el) => {
    if (el.contains(target) === false) {
      target.appendChild(el)
    }
  })
}
