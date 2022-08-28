// @ts-nocheck
import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { EVENT_CODE } from '@element-plus-next/constants'
import Tabs from '../src/tabs'
import TabPane from '../src/tab-pane.vue'
import TabNav from '../src/tab-nav'

describe('Tabs.vue', () => {
  test('create', async () => {
    const wrapper = mount(() => (
      <Tabs>
        <TabPane label="label-1">A</TabPane>
        <TabPane label="label-2">B</TabPane>
        <TabPane label="label-3" ref="pane-click">
          C
        </TabPane>
        <TabPane label="label-4">D</TabPane>
      </Tabs>
    ))

    const tabsWrapper = wrapper.findComponent(Tabs)
    const navWrapper = wrapper.findComponent(TabNav)
    const panesWrapper = wrapper.findAllComponents(TabPane)
    await nextTick()

    const navItemsWrapper = navWrapper.findAll('.el-tabs__item')

    expect(navItemsWrapper[0].classes('is-active')).toBe(true)
    expect(panesWrapper[0].classes('el-tab-pane')).toBe(true)
    expect(panesWrapper[0].attributes('id')).toBe('pane-0')
    expect(panesWrapper[0].attributes('aria-hidden')).toEqual('false')
    expect(tabsWrapper.vm.$.exposed.currentName.value).toEqual('0')

    await navItemsWrapper[2].trigger('click')
    expect(navItemsWrapper[0].classes('is-active')).toBe(false)
    expect(panesWrapper[0].attributes('aria-hidden')).toEqual('true')
    expect(navItemsWrapper[2].classes('is-active')).toBe(true)
    expect(panesWrapper[2].attributes('aria-hidden')).toEqual('false')
    expect(tabsWrapper.vm.$.exposed.currentName.value).toEqual('2')
  })

  test('active-name', async () => {
    const activeName = ref('b')
    const handleClick = (tab) => {
      activeName.value = tab.paneName
    }
    const wrapper = mount(() => (
      <Tabs v-model={activeName.value} onTabClick={handleClick}>
        <TabPane name="a" label="label-1">
          A
        </TabPane>
        <TabPane name="b" label="label-2">
          B
        </TabPane>
        <TabPane name="c" label="label-3" ref="pane-click">
          C
        </TabPane>
        <TabPane name="d" label="label-4">
          D
        </TabPane>
      </Tabs>
    ))

    const tabsWrapper = wrapper.findComponent(Tabs)
    const navWrapper = wrapper.findComponent(TabNav)
    const panesWrapper = wrapper.findAllComponents(TabPane)
    await nextTick()

    const navItemsWrapper = navWrapper.findAll('.el-tabs__item')
    expect(navItemsWrapper[1].classes('is-active')).toBe(true)
    expect(panesWrapper[1].classes('el-tab-pane')).toBe(true)
    expect(panesWrapper[1].attributes('id')).toBe('pane-b')
    expect(panesWrapper[1].attributes('aria-hidden')).toEqual('false')
    expect(tabsWrapper.vm.$.exposed.currentName.value).toEqual('b')

    await navItemsWrapper[2].trigger('click')
    expect(navItemsWrapper[1].classes('is-active')).toBe(false)
    expect(panesWrapper[1].attributes('aria-hidden')).toEqual('true')
    expect(navItemsWrapper[2].classes('is-active')).toBe(true)
    expect(panesWrapper[2].attributes('aria-hidden')).toEqual('false')
    expect(tabsWrapper.vm.$.exposed.currentName.value).toEqual('c')
  })

  test('card', async () => {
    const wrapper = mount(() => (
      <Tabs type="card">
        <TabPane label="label-1">A</TabPane>
        <TabPane label="label-2">B</TabPane>
        <TabPane label="label-3" ref="pane-click">
          C
        </TabPane>
        <TabPane label="label-4">D</TabPane>
      </Tabs>
    ))

    const tabsWrapper = wrapper.findComponent(Tabs)
    expect(tabsWrapper.classes('el-tabs--card')).toBe(true)
  })

  test('border card', async () => {
    const wrapper = mount(() => (
      <Tabs type="border-card">
        <TabPane label="label-1">A</TabPane>
        <TabPane label="label-2">B</TabPane>
        <TabPane label="label-3" ref="pane-click">
          C
        </TabPane>
        <TabPane label="label-4">D</TabPane>
      </Tabs>
    ))

    const tabsWrapper = wrapper.findComponent(Tabs)
    expect(tabsWrapper.classes('el-tabs--border-card')).toBe(true)
  })

  test('dynamic', async () => {
    const tabs = ref([
      {
        label: 'tab1',
        name: 'tab1',
      },
      {
        label: 'tab2',
        name: 'tab2',
      },
      {
        label: 'tab3',
        name: 'tab3',
      },
      {
        label: 'tab4',
        name: 'tab4',
      },
    ])
    const wrapper = mount(() => (
      <Tabs type="card" ref="tabs">
        {tabs.value.map((tab) => (
          <TabPane label={tab.label} name={tab.name} key={tab.name}>
            Test Content
          </TabPane>
        ))}
      </Tabs>
    ))

    let navWrapper = wrapper.findComponent(TabNav)
    let panesWrapper = wrapper.findAllComponents(TabPane)
    await nextTick()

    let navItemsWrapper = navWrapper.findAll('.el-tabs__item')

    expect(navItemsWrapper.length).toEqual(4)
    expect(panesWrapper.length).toEqual(4)

    tabs.value.push({ label: 'tab5', name: 'tab5' })

    await nextTick()
    navWrapper = wrapper.findComponent(TabNav)
    panesWrapper = wrapper.findAllComponents(TabPane)
    navItemsWrapper = navWrapper.findAll('.el-tabs__item')

    expect(navItemsWrapper.length).toEqual(5)
    expect(panesWrapper.length).toEqual(5)
  })

  test('editable', async () => {
    const editableTabsValue = ref('2')
    const editableTabs = ref([
      {
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content',
      },
      {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content',
      },
      {
        title: 'Tab 3',
        name: '3',
        content: 'Tab 3 content',
      },
    ])
    const tabIndex = ref(3)
    const handleTabsEdit = (targetName, action) => {
      if (action === 'add') {
        const newTabName = `${++tabIndex.value}`
        editableTabs.value.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content',
        })
        editableTabsValue.value = newTabName
      }
      if (action === 'remove') {
        const tabs = editableTabs.value
        let activeName = editableTabsValue.value
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        editableTabsValue.value = activeName
        editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
      }
    }
    const wrapper = mount(() => (
      <Tabs
        ref="tabs"
        v-model={editableTabsValue.value}
        type="card"
        editable
        onEdit={handleTabsEdit}
      >
        {editableTabs.value.map((tab) => (
          <TabPane key={tab.name} label={tab.title} name={tab.name}>
            {tab.content}
          </TabPane>
        ))}
      </Tabs>
    ))

    const navWrapper = wrapper.findComponent(TabNav)
    let panesWrapper = wrapper.findAllComponents(TabPane)
    await nextTick()

    let navItemsWrapper = navWrapper.findAll('.el-tabs__item')

    expect(navItemsWrapper.length).toEqual(3)
    expect(panesWrapper.length).toEqual(3)
    expect(navItemsWrapper[1].classes('is-active')).toBe(true)

    // remove one tab, check panes length
    await navItemsWrapper[1].find('.is-icon-close').trigger('click')

    panesWrapper = wrapper.findAllComponents(TabPane)
    navItemsWrapper = navWrapper.findAll('.el-tabs__item')
    expect(navItemsWrapper.length).toEqual(2)
    expect(panesWrapper.length).toEqual(2)

    // add one tab, check panes length and current tab
    await wrapper.find('.el-tabs__new-tab').trigger('click')

    panesWrapper = wrapper.findAllComponents(TabPane)
    navItemsWrapper = navWrapper.findAll('.el-tabs__item')

    expect(navItemsWrapper.length).toEqual(3)
    expect(panesWrapper.length).toEqual(3)
    expect(navItemsWrapper[2].classes('is-active')).toBe(true)
  })

  test('addable & closable', async () => {
    const editableTabsValue = ref('2')
    const editableTabs = ref([
      {
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content',
      },
      {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content',
      },
    ])
    const tabIndex = ref(2)
    const addTab = () => {
      const newTabName = `${++tabIndex.value}`
      editableTabs.value.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content',
      })
      editableTabsValue.value = newTabName
    }
    const removeTab = (targetName) => {
      const tabs = editableTabs.value
      let activeName = editableTabsValue.value
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      editableTabsValue.value = activeName
      editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
    }

    const wrapper = mount(() => (
      <Tabs
        ref="tabs"
        v-model={editableTabsValue.value}
        type="card"
        addable
        closable
        onTabAdd={addTab}
        onTabRemove={removeTab}
      >
        {editableTabs.value.map((item) => (
          <TabPane
            label={item.title}
            key={item.name}
            name={item.name}
          ></TabPane>
        ))}
      </Tabs>
    ))

    const navWrapper = wrapper.findComponent(TabNav)
    await nextTick()

    await wrapper.find('.el-tabs__new-tab').trigger('click')

    let navItemsWrapper = navWrapper.findAll('.el-tabs__item')
    let panesWrapper = wrapper.findAllComponents(TabPane)
    expect(navItemsWrapper.length).toEqual(3)
    expect(panesWrapper.length).toEqual(3)
    expect(navItemsWrapper[2].classes('is-active')).toBe(true)

    await navItemsWrapper[2].find('.is-icon-close').trigger('click')

    panesWrapper = wrapper.findAllComponents(TabPane)
    navItemsWrapper = navWrapper.findAll('.el-tabs__item')

    expect(navItemsWrapper.length).toEqual(2)
    expect(panesWrapper.length).toEqual(2)
  })

  test('closable in tab-pane', async () => {
    const wrapper = mount(() => (
      <Tabs type="card" ref="tabs">
        <TabPane label="label-1" closable>
          A
        </TabPane>
        <TabPane label="label-2">B</TabPane>
        <TabPane label="label-3" closable>
          C
        </TabPane>
        <TabPane label="label-4">D</TabPane>
      </Tabs>
    ))

    const navWrapper = wrapper.findComponent(TabNav)
    await nextTick()

    expect(navWrapper.findAll('.is-icon-close').length).toBe(2)
  })

  test('disabled', async () => {
    const wrapper = mount(() => (
      <Tabs type="card" ref="tabs">
        <TabPane label="label-1">A</TabPane>
        <TabPane disabled label="label-2" ref="disabled">
          B
        </TabPane>
        <TabPane label="label-3">C</TabPane>
        <TabPane label="label-4">D</TabPane>
      </Tabs>
    ))

    const navWrapper = wrapper.findComponent(TabNav)
    await nextTick()
    const navItemsWrapper = navWrapper.findAll('.el-tabs__item')
    expect(navItemsWrapper[1].classes('is-active')).toBe(false)

    await navItemsWrapper[1].trigger('click')
    expect(navItemsWrapper[1].classes('is-active')).toBe(false)
  })

  test('tab-position', async () => {
    const wrapper = mount(() => (
      <Tabs ref="tabs" tab-position="left">
        <TabPane label="label-1">A</TabPane>
        <TabPane label="label-2">B</TabPane>
        <TabPane label="label-3" ref="pane-click">
          C
        </TabPane>
        <TabPane label="label-4">D</TabPane>
      </Tabs>
    ))

    const tabsWrapper = wrapper.findComponent(Tabs)
    await nextTick()

    expect(tabsWrapper.classes('el-tabs--left')).toBe(true)
    expect(tabsWrapper.find('.el-tabs__header').classes('is-left')).toBe(true)
    expect(tabsWrapper.find('.el-tabs__nav-wrap').classes('is-left')).toBe(true)
    expect(tabsWrapper.find('.el-tabs__nav').classes('is-left')).toBe(true)
    expect(tabsWrapper.find('.el-tabs__active-bar').classes('is-left')).toBe(
      true
    )
    expect(tabsWrapper.find('.el-tabs__item').classes('is-left')).toBe(true)
  })

  test('stretch', async () => {
    const tabPosition = ref('bottom')
    const wrapper = mount(() => (
      <Tabs ref="tabs" stretch tab-position={tabPosition.value}>
        <TabPane label="label-1">A</TabPane>
        <TabPane label="label-2">B</TabPane>
        <TabPane label="label-3">C</TabPane>
        <TabPane label="label-4">D</TabPane>
      </Tabs>
    ))

    const tabsWrapper = wrapper.findComponent(Tabs)
    await nextTick()

    expect(tabsWrapper.find('.el-tabs__nav').classes('is-stretch')).toBe(true)

    tabPosition.value = 'left'
    await nextTick()

    expect(tabsWrapper.find('.el-tabs__nav').classes('is-stretch')).toBe(false)
  })

  test('tab active bar offset', async () => {
    const tabPosition = ref('bottom')
    const wrapper = mount(() => (
      <Tabs ref="tabs" stretch tab-position={tabPosition.value}>
        <TabPane label="label-1" name="A">
          A
        </TabPane>
        <TabPane label="label-2" name="B">
          B
        </TabPane>
        <TabPane label="label-3" name="C">
          C
        </TabPane>
        <TabPane label="label-4" name="D">
          D
        </TabPane>
      </Tabs>
    ))

    const tabsWrapper = wrapper.findComponent(Tabs)
    await nextTick()
    const mockCRect = vi
      .spyOn(wrapper.find('#tab-C').element, 'getBoundingClientRect')
      .mockReturnValue({ left: 300 } as DOMRect)
    const mockComputedStyle = vi
      .spyOn(window, 'getComputedStyle')
      .mockReturnValue({ paddingLeft: '0px' } as CSSStyleDeclaration)
    await wrapper.find('#tab-C').trigger('click')

    await nextTick()
    expect(tabsWrapper.find('.el-tabs__active-bar').attributes().style).toMatch(
      'translateX(300px)'
    )

    tabPosition.value = 'left'
    await nextTick()
    const mockCYRect = vi
      .spyOn(wrapper.find('#tab-C').element, 'getBoundingClientRect')
      .mockReturnValue({ top: 200 } as DOMRect)
    await wrapper.find('#tab-A').trigger('click')
    await wrapper.find('#tab-C').trigger('click')

    await nextTick()
    expect(tabsWrapper.find('.el-tabs__active-bar').attributes().style).toMatch(
      'translateY(200px)'
    )

    mockCRect.mockRestore()
    mockCYRect.mockRestore()
    mockComputedStyle.mockRestore()
    wrapper.unmount()
  })

  test('horizonal-scrollable', async () => {
    // TODO: jsdom not support `clientWidth`.
  })

  test('vertical-scrollable', async () => {
    // TODO: jsdom not support `clientWidth`.
  })

  test('should work with lazy', async () => {
    const activeName = ref('A')
    const wrapper = mount(() => (
      <Tabs v-model={activeName.value} ref="tabs">
        <TabPane label="label-1" lazy name="A">
          A
        </TabPane>
        <TabPane label="label-2" name="B">
          B
        </TabPane>
        <TabPane label="label-3" name="C">
          C
        </TabPane>
        <TabPane label="label-4" lazy name="D">
          D
        </TabPane>
      </Tabs>
    ))

    const navWrapper = wrapper.findComponent(TabNav)
    await nextTick()
    const navItemsWrapper = navWrapper.findAll('.el-tabs__item')

    expect(wrapper.findAll('.el-tab-pane').length).toBe(3)

    await navItemsWrapper[3].trigger('click')

    expect(wrapper.findAll('.el-tab-pane').length).toBe(4)
  })

  test('before leave', async () => {
    const activeName = ref('tab-B')
    const beforeLeave = () => {
      return new window.Promise((resolve, reject) => {
        reject()
      })
    }
    const wrapper = mount(() => (
      <Tabs ref="tabs" v-model={activeName.value} beforeLeave={beforeLeave}>
        <TabPane name="tab-A" label="label-1">
          A
        </TabPane>
        <TabPane name="tab-B" label="label-2">
          B
        </TabPane>
        <TabPane name="tab-C" label="label-3">
          C
        </TabPane>
        <TabPane name="tab-D" label="label-4">
          D
        </TabPane>
      </Tabs>
    ))

    const navWrapper = wrapper.findComponent(TabNav)
    const panesWrapper = wrapper.findAllComponents(TabPane)
    await nextTick()
    const navItemsWrapper = navWrapper.findAll('.el-tabs__item')

    expect(navItemsWrapper[1].classes('is-active')).toBe(true)
    expect(panesWrapper[1].attributes('style')).toBeFalsy()

    await navItemsWrapper[3].trigger('click')

    expect(navItemsWrapper[1].classes('is-active')).toBe(true)
    expect(panesWrapper[1].attributes('style')).toBeFalsy()
  })

  test('keyboard event', async () => {
    const activeName = ref('second')
    const wrapper = mount(() => (
      <Tabs v-model={activeName.value}>
        <TabPane label="label-1" name="first" disabled>
          A
        </TabPane>
        <TabPane label="label-2" name="second">
          B
        </TabPane>
        <TabPane label="label-3" name="third">
          C
        </TabPane>
        <TabPane label="label-4" name="fourth">
          D
        </TabPane>
      </Tabs>
    ))

    await nextTick()

    await wrapper
      .find('#tab-second')
      .trigger('keydown', { code: EVENT_CODE.right })
    expect(activeName.value).toEqual('third')

    await wrapper
      .find('#tab-third')
      .trigger('keydown', { code: EVENT_CODE.right })
    expect(activeName.value).toEqual('fourth')

    await wrapper
      .find('#tab-fourth')
      .trigger('keydown', { code: EVENT_CODE.right })
    expect(activeName.value).toEqual('second')

    await wrapper
      .find('#tab-second')
      .trigger('keydown', { code: EVENT_CODE.left })
    expect(activeName.value).toEqual('fourth')
  })

  test('resize', async () => {
    // TODO: jsdom not support `clientWidth`.
  })

  test('DOM update finished calculating navOffset', async () => {
    const tabs = ref<string[]>([])
    for (let i = 0; i < 5000; i++) {
      tabs.value.push(i.toString())
    }
    const activeName = ref('0')
    const wrapper = mount(() => (
      <Tabs v-model={activeName.value}>
        {tabs.value.map((item) => (
          <TabPane key={item} label={item} name={item} />
        ))}
      </Tabs>
    ))

    const tabsWrapper = wrapper.findComponent(Tabs)
    await nextTick()

    const mockRect = vi
      .spyOn(wrapper.find('#tab-4999').element, 'getBoundingClientRect')
      .mockReturnValue({ left: 5000 } as DOMRect)
    const mockComputedStyle = vi
      .spyOn(window, 'getComputedStyle')
      .mockReturnValue({ paddingLeft: '0px' } as CSSStyleDeclaration)

    await wrapper.find('#tab-4999').trigger('click')
    await nextTick()

    expect(tabsWrapper.find('.el-tabs__active-bar').attributes().style).toMatch(
      'translateX(5000px)'
    )

    mockRect.mockRestore()
    mockComputedStyle.mockRestore()
    wrapper.unmount()
  })

  test('value type', async () => {
    const activeName = ref(0)
    const handleClick = (tab) => {
      activeName.value = tab.paneName
    }
    const wrapper = mount(() => (
      <Tabs v-model={activeName.value} onTabClick={handleClick}>
        <TabPane name={0} label="label-1">
          A
        </TabPane>
        <TabPane name={1} label="label-2">
          B
        </TabPane>
        <TabPane name={2} label="label-3" ref="pane-click">
          C
        </TabPane>
        <TabPane name={3} label="label-4">
          D
        </TabPane>
      </Tabs>
    ))

    const navWrapper = wrapper.findComponent(TabNav)
    await nextTick()

    const navItemsWrapper = navWrapper.findAll('.el-tabs__item')
    ;[1, 0, 2, 0, 3, 0, 1].forEach((val) => {
      navItemsWrapper[val].trigger('click')
      expect(activeName.value).toEqual(val)
    })
  })
})
