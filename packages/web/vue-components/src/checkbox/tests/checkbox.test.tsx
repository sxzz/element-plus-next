import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { ElFormItem } from '../../form'
import Checkbox from '../src/checkbox.vue'
import CheckboxButton from '../src/checkbox-button.vue'
import CheckboxGroup from '../src/checkbox-group.vue'

import type { CheckboxValueType } from '../src/checkbox'

describe('Checkbox', () => {
  test('create', async () => {
    const checked = ref(false)
    const wrapper = mount(() => <Checkbox v-model={checked.value} label="a" />)

    expect(wrapper.classes()).toContain('el-checkbox')
    expect(wrapper.classes()).not.toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('is-checked')
    await wrapper.trigger('click')
    expect(wrapper.classes('is-checked')).toBe(false)
  })

  describe('no v-model', () => {
    test('checkbox without label', async () => {
      const checked = ref(false)
      const wrapper = mount(() => <Checkbox checked={checked.value} />)

      expect(wrapper.classes('is-checked')).toBe(false)
    })

    test('checkbox with label attribute', async () => {
      const checked = ref(false)
      const wrapper = mount(() => (
        <Checkbox checked={checked.value} label="a" />
      ))

      expect(wrapper.classes('is-checked')).toBe(false)
    })
  })

  describe('disabled', () => {
    test('checkbox without label', async () => {
      const checked = ref(false)
      const wrapper = mount(() => (
        <ElFormItem label="test">
          <Checkbox v-model={checked.value} disabled />
        </ElFormItem>
      ))

      const checkbox = wrapper.findComponent(Checkbox)
      expect(checkbox.classes()).toContain('is-disabled')
      expect(checked.value).toBe(false)
      await checkbox.trigger('click')
      await nextTick()
      expect(checkbox.classes()).toContain('is-disabled')
      expect(checked.value).toBe(false)
    })

    test('checkbox with label attribute', async () => {
      const checked = ref(false)
      const wrapper = mount(() => (
        <Checkbox v-model={checked.value} disabled label="a" />
      ))

      expect(wrapper.classes()).toContain('is-disabled')
      expect(checked.value).toBe(false)
      await wrapper.trigger('click')
      await nextTick()
      expect(wrapper.classes()).toContain('is-disabled')
      expect(checked.value).toBe(false)
    })
  })

  describe('change event', () => {
    test('checkbox without label', async () => {
      const checked = ref(false)
      const data = ref()
      const onChange = (val: CheckboxValueType) => (data.value = val)
      const wrapper = mount(() => (
        <ElFormItem label="test">
          <Checkbox v-model={checked.value} onChange={onChange} />
        </ElFormItem>
      ))

      await wrapper.findComponent(Checkbox).trigger('click')
      expect(data.value).toBe(true)
    })

    test('checkbox with label attribute', async () => {
      const checked = ref(false)
      const data = ref()
      const onChange = (val: CheckboxValueType) => (data.value = val)
      const wrapper = mount(() => (
        <Checkbox v-model={checked.value} onChange={onChange} label="Foobar" />
      ))

      await wrapper.trigger('click')
      expect(data.value).toBe(true)
    })

    test('checkbox with label as slot content', async () => {
      const checked = ref(false)
      const data = ref()
      const onChange = (val: CheckboxValueType) => (data.value = val)
      const wrapper = mount(() => (
        <Checkbox v-model={checked.value} onChange={onChange}>
          Foobar
        </Checkbox>
      ))

      await wrapper.trigger('click')
      expect(data.value).toBe(true)
    })
  })

  test('checkbox group', async () => {
    const checkList = ref([])
    const wrapper = mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value}>
            <Checkbox label="a" ref="a" />
            <Checkbox label="b" ref="b" />
            <Checkbox label="c" ref="c" />
            <Checkbox label="d" ref="d" />
          </CheckboxGroup>
        )
      },
    })

    expect(checkList.value.length).toBe(0)

    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(checkList.value.length).toBe(1)
    expect(checkList.value).toContain('a')

    await wrapper.findComponent({ ref: 'b' }).trigger('click')
    expect(checkList.value.length).toBe(2)
    expect(checkList.value).toContain('a')
    expect(checkList.value).toContain('b')
  })

  test('checkbox group without modelValue', async () => {
    const checkList = ref([])
    const wrapper = mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value}>
            <Checkbox label="a" ref="a" />
            <Checkbox label="b" ref="b" />
            <Checkbox label="c" ref="c" />
            <Checkbox label="d" ref="d" />
          </CheckboxGroup>
        )
      },
    })

    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(checkList.value.length).toBe(1)
    expect(checkList.value).toContain('a')
  })

  test('checkbox group change', async () => {
    const checkList = ref([])
    const data = ref<CheckboxValueType[]>([])
    const onChange = (val: CheckboxValueType[]) => (data.value = val)
    const wrapper = mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value} onChange={onChange}>
            <Checkbox label="a" ref="a" />
            <Checkbox label="b" ref="b" />
          </CheckboxGroup>
        )
      },
    })

    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    await nextTick()
    expect(data.value.length).toBe(1)
    expect(data.value).toEqual(['a'])
  })

  test('nested group', async () => {
    const checkList = ref([])
    const wrapper = mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value}>
            <Checkbox label="a" ref="a" />
            <Checkbox label="b" ref="b" />
            <Checkbox label="c" ref="c" />
            <Checkbox label="d" ref="d" />
          </CheckboxGroup>
        )
      },
    })

    expect(checkList.value.length).toBe(0)
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(checkList.value).toEqual(['a'])
  })

  describe('true false label', () => {
    test('without label', async () => {
      const checked = ref('a')
      const wrapper = mount(() => (
        <ElFormItem label="test">
          <Checkbox true-label="a" false-label={3} v-model={checked.value} />
        </ElFormItem>
      ))

      const checkbox = wrapper.findComponent(Checkbox)
      await checkbox.trigger('click')
      await nextTick()
      expect(checked.value).toBe(3)
      await checkbox.trigger('click')
      await nextTick()
      expect(checked.value).toBe('a')
    })

    test('with label attribute', async () => {
      const checked = ref('a')
      const wrapper = mount(() => (
        <Checkbox
          label="Foobar"
          true-label="a"
          false-label={3}
          v-model={checked.value}
        />
      ))

      await wrapper.trigger('click')
      await nextTick()
      expect(checked.value).toBe(3)
      await wrapper.trigger('click')
      await nextTick()
      expect(checked.value).toBe('a')
    })

    test('with label as slot content', async () => {
      const checked = ref('a')
      const wrapper = mount(() => (
        <Checkbox true-label="a" false-label={3} v-model={checked.value}>
          Foobar
        </Checkbox>
      ))

      await wrapper.trigger('click')
      await nextTick()
      expect(checked.value).toBe(3)
      await wrapper.trigger('click')
      await nextTick()
      expect(checked.value).toBe('a')
    })
  })

  test('check', () => {
    const checked = ref(false)
    const checklist = ref([])
    mount(() => (
      <div>
        <Checkbox v-model={checked.value} checked />
        <CheckboxGroup v-model={checklist.value}>
          <Checkbox checked label="a" />
        </CheckboxGroup>
      </div>
    ))

    expect(checked.value).toBe(true)
    expect(checklist.value).toEqual(['a'])
  })

  test('label', async () => {
    const checklist = ref([])
    const wrapper = mount(() => (
      <CheckboxGroup v-model={checklist.value}>
        <Checkbox label="">all</Checkbox>
        <Checkbox label="a">a</Checkbox>
        <Checkbox label="b">b</Checkbox>
      </CheckboxGroup>
    ))

    const checkbox = wrapper.find('.el-checkbox')
    await checkbox.trigger('click')
    expect(checklist.value[0]).toEqual('')
  })
})

describe('check-button', () => {
  test('create', async () => {
    const checked = ref(false)
    const wrapper = mount(() => (
      <CheckboxButton v-model={checked.value} label="a" />
    ))

    expect(wrapper.classes()).toContain('el-checkbox-button')
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('is-checked')
    await wrapper.trigger('click')
    expect(wrapper.classes('is-checked')).toBe(false)
  })

  test('disabled', async () => {
    const checked = ref(false)
    const wrapper = mount(() => (
      <CheckboxButton v-model={checked.value} disabled label="a" />
    ))

    expect(wrapper.classes()).toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('change event', async () => {
    const checked = ref(false)
    const data = ref()
    const onChange = (val: CheckboxValueType) => (data.value = val)
    const wrapper = mount(() => (
      <CheckboxButton v-model={checked.value} onChange={onChange} />
    ))

    await wrapper.trigger('click')
    expect(data.value).toBe(true)
  })

  test('button group change', async () => {
    const checkList = ref([])
    const data = ref<CheckboxValueType[]>([])
    const onChange = (val: CheckboxValueType[]) => (data.value = val)
    const wrapper = mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value} onChange={onChange}>
            <CheckboxButton label="a" ref="a" />
            <CheckboxButton label="b" ref="b" />
            <CheckboxButton label="c" ref="c" />
            <CheckboxButton label="d" ref="d" />
          </CheckboxGroup>
        )
      },
    })

    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(data.value).toEqual(['a'])
    await wrapper.findComponent({ ref: 'b' }).trigger('click')
    expect(data.value).toEqual(['a', 'b'])
  })

  test('button group props', () => {
    const checkList = ref(['a', 'b'])
    const wrapper = mount({
      setup() {
        return () => (
          <CheckboxGroup
            v-model={checkList.value}
            size="large"
            fill="#ff0000"
            text-color="#000"
          >
            <CheckboxButton label="a" ref="a" />
            <CheckboxButton label="b" ref="b" />
            <CheckboxButton label="c" ref="c" />
            <CheckboxButton label="d" ref="d" />
          </CheckboxGroup>
        )
      },
    })

    const checkbox = wrapper.findComponent({ ref: 'a' })
    expect(checkList.value.length).toBe(2)
    expect(checkbox.classes()).contains('is-checked')
    expect(
      checkbox.find('.el-checkbox-button__inner').attributes('style')
    ).contains('border-color: #ff0000;')
  })

  test('button group tag', () => {
    const checkList = ref(['a', 'b'])
    const wrapper = mount(() => (
      <CheckboxGroup v-model={checkList.value} tag="tr">
        <CheckboxButton label="a" ref="a" />
        <CheckboxButton label="b" ref="b" />
        <CheckboxButton label="c" ref="c" />
        <CheckboxButton label="d" ref="d" />
      </CheckboxGroup>
    ))

    expect(wrapper.find('tr').classes('el-checkbox-group')).toBeTruthy()
  })

  test('button group min and max', async () => {
    const checkList = ref(['a', 'b'])
    const wrapper = mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value} min={2} max={3}>
            <CheckboxButton label="a" ref="a" />
            <CheckboxButton label="b" ref="b" />
            <CheckboxButton label="c" ref="c" />
            <CheckboxButton label="d" ref="d" />
            <CheckboxButton label="e" ref="e" />
          </CheckboxGroup>
        )
      },
    })

    expect(checkList.value.length).toBe(2)

    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(checkList.value.length).toBe(2)

    await wrapper.findComponent({ ref: 'c' }).trigger('click')
    expect(checkList.value.length).toBe(3)
    expect(checkList.value).toEqual(['a', 'b', 'c'])

    expect(wrapper.findComponent({ ref: 'd' }).vm.isDisabled).toBe(true)
    expect(wrapper.findComponent({ ref: 'e' }).vm.isDisabled).toBe(true)

    checkList.value = []
    await nextTick()
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    await wrapper.findComponent({ ref: 'd' }).trigger('click')
    expect(checkList.value).toEqual(['a', 'd'])
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(checkList.value).toEqual(['a', 'd'])
    expect(wrapper.findComponent({ ref: 'a' }).vm.isDisabled).toBe(true)
  })

  test('nested group', async () => {
    const checkList = ref([])
    const wrapper = mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value}>
            <CheckboxButton label="a" ref="a" />
            <CheckboxButton label="b" ref="b" />
            <CheckboxButton label="c" ref="c" />
            <CheckboxButton label="d" ref="d" />
          </CheckboxGroup>
        )
      },
    })

    expect(checkList.value.length).toBe(0)
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(checkList.value).toEqual(['a'])
  })

  describe('checked prop', () => {
    test('check', () => {
      const checked = ref(false)
      const checklist = ref([])
      mount(() => (
        <div>
          <Checkbox v-model={checked.value} checked />
          <CheckboxGroup v-model={checklist.value}>
            <CheckboxButton checked label="a" />
          </CheckboxGroup>
        </div>
      ))

      expect(checked.value).toBe(true)
      expect(checklist.value).toEqual(['a'])
    })

    test('checked', () => {
      const wrapper = mount(() => <Checkbox checked />)

      expect(wrapper.find('.el-checkbox').classes()).contains('is-checked')
    })
  })

  describe('form item accessibility integration', () => {
    test('checkbox, no label, automatic label attachment', async () => {
      const wrapper = mount(() => (
        <ElFormItem label="test">
          <Checkbox />
        </ElFormItem>
      ))

      const formItem = await wrapper.findComponent(ElFormItem)
      const checkbox = await wrapper.findComponent(Checkbox)
      const formItemLabel = formItem.find('.el-form-item__label')
      const checkboxInput = checkbox.find('.el-checkbox__original')
      expect(checkboxInput.attributes('id')).toBe(
        formItemLabel.attributes('for')
      )
    })

    test('checkbox with label, form item is group', async () => {
      const wrapper = mount(() => (
        <ElFormItem label="test">
          <Checkbox label="Foo" />
        </ElFormItem>
      ))

      const formItem = await wrapper.findComponent(ElFormItem)
      const checkbox = await wrapper.findComponent(Checkbox)
      const checkboxLabel = checkbox.find('.el-checkbox__label')
      const checkboxInput = checkbox.find('.el-checkbox__original')
      expect(checkboxLabel.element.textContent).toBe('Foo')
      expect(checkboxInput.attributes('id')).toBeFalsy()
      expect(formItem.attributes('role')).toBe('group')
    })

    test('single checkbox group in form item', async () => {
      const wrapper = mount(() => (
        <ElFormItem label="test">
          <CheckboxGroup>
            <Checkbox label="Foo" />
            <Checkbox label="Bar" />
          </CheckboxGroup>
        </ElFormItem>
      ))

      const formItem = await wrapper.findComponent(ElFormItem)
      const checkboxGroup = await wrapper.findComponent(CheckboxGroup)
      const formItemLabel = formItem.find('.el-form-item__label')
      expect(formItem.attributes('role')).toBeFalsy()
      expect(checkboxGroup.attributes('role')).toBe('group')
      expect(formItemLabel.attributes('for')).toBe(
        checkboxGroup.attributes('id')
      )
      expect(formItemLabel.attributes('id')).toBe(
        checkboxGroup.attributes('aria-labelledby')
      )
    })

    test('single checkbox group in form item, override label', async () => {
      const wrapper = mount(() => (
        <ElFormItem label="test">
          <CheckboxGroup label="Foo">
            <Checkbox label="Foo" />
            <Checkbox label="Bar" />
          </CheckboxGroup>
        </ElFormItem>
      ))

      const formItem = await wrapper.findComponent(ElFormItem)
      const checkboxGroup = await wrapper.findComponent(CheckboxGroup)
      const formItemLabel = formItem.find('.el-form-item__label')
      expect(formItemLabel.attributes('for')).toBe(
        checkboxGroup.attributes('id')
      )
      expect(checkboxGroup.attributes('role')).toBe('group')
      expect(checkboxGroup.attributes()['aria-label']).toBe('Foo')
      expect(checkboxGroup.attributes()['aria-labelledby']).toBeFalsy()
    })

    test('multiple checkbox groups in form item', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <ElFormItem label="test">
              <CheckboxGroup label="Foo" ref="checkboxGroup1">
                <Checkbox label="Foo" />
                <Checkbox label="Bar" />
              </CheckboxGroup>
              <CheckboxGroup label="Bar" ref="checkboxGroup2">
                <Checkbox label="Foo" />
                <Checkbox label="Bar" />
              </CheckboxGroup>
            </ElFormItem>
          )
        },
      })

      const formItem = await wrapper.findComponent(ElFormItem)
      const checkboxGroup1 = await wrapper.findComponent({
        ref: 'checkboxGroup1',
      })
      const checkboxGroup2 = await wrapper.findComponent({
        ref: 'checkboxGroup2',
      })
      const formItemLabel = formItem.find('.el-form-item__label')
      expect(formItem.attributes('role')).toBe('group')
      expect(formItem.attributes()['aria-labelledby']).toBe(
        formItemLabel.attributes('id')
      )
      expect(checkboxGroup1.attributes('role')).toBe('group')
      expect(checkboxGroup1.attributes()['aria-label']).toBe('Foo')
      expect(checkboxGroup1.attributes()['aria-labelledby']).toBeFalsy()
      expect(checkboxGroup2.attributes('role')).toBe('group')
      expect(checkboxGroup2.attributes()['aria-label']).toBe('Bar')
      expect(checkboxGroup2.attributes()['aria-labelledby']).toBeFalsy()
    })
  })
})
