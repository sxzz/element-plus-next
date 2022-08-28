// @ts-nocheck
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  onUpdated,
  ref,
  watch,
} from 'vue'
import {
  useDocumentVisibility,
  useResizeObserver,
  useWindowFocus,
} from '@vueuse/core'
import { ArrowLeft, ArrowRight, Close } from '@element-plus/icons-vue'
import { NOOP, capitalize, mutable, throwError } from '@element-plus-next/utils'
import { buildProps, definePropType } from '@element-plus-next/vue-utils'
import { EVENT_CODE } from '@element-plus-next/constants'
import { useNamespace } from '@element-plus-next/vue-hooks'
import { ElIcon } from '../../icon'
import { tabsRootContextKey } from './tabs'
import TabBar from './tab-bar.vue'
import type { CSSProperties, ExtractPropTypes } from 'vue'
import type { TabPanelName, TabsPaneContext } from './tabs'

interface Scrollable {
  next?: boolean
  prev?: number
}

export const tabNavProps = buildProps({
  panes: {
    type: definePropType<TabsPaneContext[]>(Array),
    default: () => mutable([] as const),
  },
  currentName: {
    type: [String, Number],
    default: '',
  },
  editable: Boolean,
  onTabClick: {
    type: definePropType<
      (tab: TabsPaneContext, tabName: TabPanelName, ev: Event) => void
    >(Function),
    default: NOOP,
  },
  onTabRemove: {
    type: definePropType<(tab: TabsPaneContext, ev: Event) => void>(Function),
    default: NOOP,
  },
  type: {
    type: String,
    values: ['card', 'border-card', ''],
    default: '',
  },
  stretch: Boolean,
} as const)

export type TabNavProps = ExtractPropTypes<typeof tabNavProps>

const COMPONENT_NAME = 'ElTabNav'
const TabNav = defineComponent({
  name: COMPONENT_NAME,
  props: tabNavProps,

  setup(props, { expose }) {
    const vm = getCurrentInstance()!

    const rootTabs = inject(tabsRootContextKey)
    if (!rootTabs) throwError(COMPONENT_NAME, `<el-tabs><tab-nav /></el-tabs>`)

    const ns = useNamespace('tabs')
    const visibility = useDocumentVisibility()
    const focused = useWindowFocus()

    const navScroll$ = ref<HTMLDivElement>()
    const nav$ = ref<HTMLDivElement>()
    const el$ = ref<HTMLDivElement>()

    const scrollable = ref<false | Scrollable>(false)
    const navOffset = ref(0)
    const isFocus = ref(false)
    const focusable = ref(true)

    const sizeName = computed(() =>
      ['top', 'bottom'].includes(rootTabs.props.tabPosition)
        ? 'width'
        : 'height'
    )
    const navStyle = computed<CSSProperties>(() => {
      const dir = sizeName.value === 'width' ? 'X' : 'Y'
      return {
        transform: `translate${dir}(-${navOffset.value}px)`,
      }
    })

    const scrollPrev = () => {
      if (!navScroll$.value) return

      const containerSize =
        navScroll$.value[`offset${capitalize(sizeName.value)}`]
      const currentOffset = navOffset.value

      if (!currentOffset) return

      const newOffset =
        currentOffset > containerSize ? currentOffset - containerSize : 0

      navOffset.value = newOffset
    }

    const scrollNext = () => {
      if (!navScroll$.value || !nav$.value) return

      const navSize = nav$.value[`offset${capitalize(sizeName.value)}`]
      const containerSize =
        navScroll$.value[`offset${capitalize(sizeName.value)}`]
      const currentOffset = navOffset.value

      if (navSize - currentOffset <= containerSize) return

      const newOffset =
        navSize - currentOffset > containerSize * 2
          ? currentOffset + containerSize
          : navSize - containerSize

      navOffset.value = newOffset
    }

    const scrollToActiveTab = async () => {
      const nav = nav$.value
      if (!scrollable.value || !el$.value || !navScroll$.value || !nav) return

      await nextTick()

      const activeTab = el$.value.querySelector('.is-active')
      if (!activeTab) return

      const navScroll = navScroll$.value
      const isHorizontal = ['top', 'bottom'].includes(
        rootTabs.props.tabPosition
      )
      const activeTabBounding = activeTab.getBoundingClientRect()
      const navScrollBounding = navScroll.getBoundingClientRect()
      const maxOffset = isHorizontal
        ? nav.offsetWidth - navScrollBounding.width
        : nav.offsetHeight - navScrollBounding.height
      const currentOffset = navOffset.value
      let newOffset = currentOffset

      if (isHorizontal) {
        if (activeTabBounding.left < navScrollBounding.left) {
          newOffset =
            currentOffset - (navScrollBounding.left - activeTabBounding.left)
        }
        if (activeTabBounding.right > navScrollBounding.right) {
          newOffset =
            currentOffset + activeTabBounding.right - navScrollBounding.right
        }
      } else {
        if (activeTabBounding.top < navScrollBounding.top) {
          newOffset =
            currentOffset - (navScrollBounding.top - activeTabBounding.top)
        }
        if (activeTabBounding.bottom > navScrollBounding.bottom) {
          newOffset =
            currentOffset +
            (activeTabBounding.bottom - navScrollBounding.bottom)
        }
      }
      newOffset = Math.max(newOffset, 0)
      navOffset.value = Math.min(newOffset, maxOffset)
    }

    const update = () => {
      if (!nav$.value || !navScroll$.value) return

      const navSize = nav$.value[`offset${capitalize(sizeName.value)}`]
      const containerSize =
        navScroll$.value[`offset${capitalize(sizeName.value)}`]
      const currentOffset = navOffset.value

      if (containerSize < navSize) {
        const currentOffset = navOffset.value
        scrollable.value = scrollable.value || {}
        scrollable.value.prev = currentOffset
        scrollable.value.next = currentOffset + containerSize < navSize
        if (navSize - currentOffset < containerSize) {
          navOffset.value = navSize - containerSize
        }
      } else {
        scrollable.value = false
        if (currentOffset > 0) {
          navOffset.value = 0
        }
      }
    }

    const changeTab = (e: KeyboardEvent) => {
      const code = e.code

      const { up, down, left, right } = EVENT_CODE
      if (![up, down, left, right].includes(code)) return

      // 左右上下键更换tab
      const tabList = Array.from(
        (e.currentTarget as HTMLDivElement).querySelectorAll<HTMLDivElement>(
          '[role=tab]:not(.is-disabled)'
        )
      )
      const currentIndex = tabList.indexOf(e.target as HTMLDivElement)

      let nextIndex: number
      if (code === left || code === up) {
        // left
        if (currentIndex === 0) {
          // first
          nextIndex = tabList.length - 1
        } else {
          nextIndex = currentIndex - 1
        }
      } else {
        // right
        if (currentIndex < tabList.length - 1) {
          // not last
          nextIndex = currentIndex + 1
        } else {
          nextIndex = 0
        }
      }
      tabList[nextIndex].focus() // 改变焦点元素
      tabList[nextIndex].click() // 选中下一个tab
      setFocus()
    }

    const setFocus = () => {
      if (focusable.value) isFocus.value = true
    }
    const removeFocus = () => (isFocus.value = false)

    watch(visibility, (visibility) => {
      if (visibility === 'hidden') {
        focusable.value = false
      } else if (visibility === 'visible') {
        setTimeout(() => (focusable.value = true), 50)
      }
    })
    watch(focused, (focused) => {
      if (focused) {
        setTimeout(() => (focusable.value = true), 50)
      } else {
        focusable.value = false
      }
    })

    useResizeObserver(el$, update)

    onMounted(() => setTimeout(() => scrollToActiveTab(), 0))
    onUpdated(() => update())

    expose({
      scrollToActiveTab,
      removeFocus,
    })

    watch(
      () => props.panes,
      () => vm.update(),
      { flush: 'post' }
    )

    return () => {
      const scrollBtn = scrollable.value
        ? [
            <span
              class={[
                ns.e('nav-prev'),
                ns.is('disabled', !scrollable.value.prev),
              ]}
              onClick={scrollPrev}
            >
              <ElIcon>
                <ArrowLeft />
              </ElIcon>
            </span>,
            <span
              class={[
                ns.e('nav-next'),
                ns.is('disabled', !scrollable.value.next),
              ]}
              onClick={scrollNext}
            >
              <ElIcon>
                <ArrowRight />
              </ElIcon>
            </span>,
          ]
        : null

      const tabs = props.panes.map((pane, index) => {
        const disabled = pane.props.disabled
        const tabName = pane.props.name ?? pane.index ?? `${index}`
        const closable = !disabled && (pane.isClosable || props.editable)
        pane.index = `${index}`

        const btnClose = closable ? (
          <ElIcon
            class="is-icon-close"
            // `onClick` not exist when generate dts
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onClick={(ev: MouseEvent) => props.onTabRemove(pane, ev)}
          >
            <Close />
          </ElIcon>
        ) : null

        const tabLabelContent = pane.slots.label?.() || pane.props.label
        const tabindex = !disabled && pane.active ? 0 : -1

        return (
          <div
            ref={`tab-${tabName}`}
            class={[
              ns.e('item'),
              ns.is(rootTabs.props.tabPosition),
              ns.is('active', pane.active),
              ns.is('disabled', disabled),
              ns.is('closable', closable),
              ns.is('focus', isFocus.value),
            ]}
            id={`tab-${tabName}`}
            key={`tab-${tabName}`}
            aria-controls={`pane-${tabName}`}
            role="tab"
            aria-selected={pane.active}
            tabindex={tabindex}
            onFocus={() => setFocus()}
            onBlur={() => removeFocus()}
            onClick={(ev: MouseEvent) => {
              removeFocus()
              props.onTabClick(pane, tabName, ev)
            }}
            onKeydown={(ev: KeyboardEvent) => {
              if (
                closable &&
                (ev.code === EVENT_CODE.delete ||
                  ev.code === EVENT_CODE.backspace)
              ) {
                props.onTabRemove(pane, ev)
              }
            }}
          >
            {...[tabLabelContent, btnClose]}
          </div>
        )
      })

      return (
        <div
          ref={el$}
          class={[
            ns.e('nav-wrap'),
            ns.is('scrollable', !!scrollable.value),
            ns.is(rootTabs.props.tabPosition),
          ]}
        >
          {scrollBtn}
          <div class={ns.e('nav-scroll')} ref={navScroll$}>
            <div
              class={[
                ns.e('nav'),
                ns.is(rootTabs.props.tabPosition),
                ns.is(
                  'stretch',
                  props.stretch &&
                    ['top', 'bottom'].includes(rootTabs.props.tabPosition)
                ),
              ]}
              ref={nav$}
              style={navStyle.value}
              role="tablist"
              onKeydown={changeTab}
            >
              {...[
                !props.type ? <TabBar tabs={[...props.panes]} /> : null,
                tabs,
              ]}
            </div>
          </div>
        </div>
      )
    }
  },
})

export type TabNavInstance = InstanceType<typeof TabNav>
export default TabNav
