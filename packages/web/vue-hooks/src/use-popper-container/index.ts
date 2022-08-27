import { onBeforeMount } from 'vue'
import { generateId, isClient } from '@element-plus-next/utils'

let cachedContainer: HTMLElement

export const POPPER_CONTAINER_ID = `el-popper-container-${generateId()}`

export const POPPER_CONTAINER_SELECTOR = `#${POPPER_CONTAINER_ID}`

const createContainer = () => {
  const container = document.createElement('div')
  container.id = POPPER_CONTAINER_ID
  document.body.appendChild(container)
  return container
}

export const usePopperContainer = () => {
  onBeforeMount(() => {
    if (!isClient) return

    // This is for bypassing the error that when under testing env, we often encounter
    // document.body.innerHTML = '' situation
    // for this we need to disable the caching since it's not really needed
    if (
      process.env.NODE_ENV === 'test' ||
      !cachedContainer ||
      !document.body.querySelector(POPPER_CONTAINER_SELECTOR)
    ) {
      cachedContainer = createContainer()
    }
  })
}
