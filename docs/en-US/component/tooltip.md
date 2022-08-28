---
title: Tooltip
lang: en-US
---

# Tooltip

Display prompt information for mouse hover.

## Basic usage

Tooltip has 9 placements.

:::demo Use attribute `content` to set the display content when hover. The attribute `placement` determines the position of the tooltip. Its value is `[orientation]-[alignment]` with four orientations `top`, `left`, `right`, `bottom` and three alignments `start`, `end`, `null`, and the default alignment is null. Take `placement="left-end"` for example, Tooltip will display on the left of the element which you are hovering and the bottom of the tooltip aligns with the bottom of the element.

tooltip/basic

:::

## Theme

Tooltip has two built-in themes: `dark` and `light`.

:::tip

To use customized theme, you will have to known where your tooltip is rendered into, if your tooltip is rendered into the root element, you will need to set the css rule globally.

It is recommended that not using linear gradient background color when you using customized theme and showing the arrow at the same time, because the popup arrow and the content are two different elements,
the popup arrow's style needs to be set individually, and when it comes to the gradient background color, it might seem a little bit weird.

:::

:::demo Set `effect` to modify theme, and the default value is `dark`.

tooltip/theme

:::

## More Content

Display multiple lines of text and set their format.

:::demo Override attribute `content` of `el-tooltip` by adding a slot named `content`.

tooltip/rich-content

:::

## Advanced usage

In addition to basic usages, there are some attributes that allow you to customize your own:

`transition` attribute allows you to customize the animation in which the tooltip shows or hides, and the default value is el-fade-in-linear.

`disabled` attribute allows you to disable `tooltip`. You just need set it to `true`.

In fact, Tooltip is an extension based on [ElPopper](https://github.com/element-plus/element-plus/tree/dev/packages/components/popper), you can use any attribute that are allowed in ElPopper.

:::demo

tooltip/advanced-usage

:::

:::tip

The `router-link` component is not supported in tooltip, please use `vm.$router.push`.

Disabled form elements are not supported for Tooltip, more information can be found at [MDN](https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter). You need to wrap the disabled form element with a container element for Tooltip to work.

:::

## HTML as content

The content attribute can be set to HTML string.

:::warning

Although `content` property supports HTML strings, dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting). So when `raw-content` is on, please make sure `content` is trusted, and **never** assign user-provided `content`.

:::

:::demo

tooltip/html-content

:::

## Virtual triggering

Sometimes we want to render the tooltip on some other trigger element,
we can separate the trigger and the content.

:::tip

Virtual triggering tooltip is controlled component, so that you will have to control the visibility of the tooltip your own
when this happens, **YOU WILL NOT** be able to close the tooltip by clicking somewhere else.

:::

:::demo

tooltip/virtual-trigger

:::

## Singleton

Tooltip can also be singleton, which means you can have multiple trigger with only one tooltip instance, this function is implemented based on `Virtual triggering`

:::tip

Known issue: when using singleton, the popup will be bouncing out from unexpected places

:::

:::demo

tooltip/singleton

:::

## Controlled

Tooltip can be controlled by the parent component, by using `:visible` you can implement two way binding.

:::demo

tooltip/controlled

:::

## Animations

Tooltip can be customized animated, you can set the the desired animation function as you desired.

:::demo

tooltip/animations

:::

## Attributes

| Attribute                                | Description                                                                                                                                                  | Type                       | Accepted Values                                                                                           | Default                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| append-to                                | which element the tooltip CONTENT appends to                                                                                                                 | CSSSelector \| HTMLElement | —                                                                                                         | #el-popper-container-[randomValue]                      |
| effect                                   | Tooltip theme, built-in theme: `dark` / `light`                                                                                                              | string                     | string                                                                                                    | dark                                                    |
| content                                  | display content, can be overridden by `slot#content`                                                                                                         | String                     | —                                                                                                         | —                                                       |
| raw-content                              | whether `content` is treated as HTML string                                                                                                                  | boolean                    | —                                                                                                         | false                                                   |
| placement                                | position of Tooltip                                                                                                                                          | string                     | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom                                                  |
| visible / v-model:visible                | visibility of Tooltip                                                                                                                                        | boolean                    | —                                                                                                         | false                                                   |
| disabled                                 | whether Tooltip is disabled                                                                                                                                  | boolean                    | —                                                                                                         | false                                                   |
| offset                                   | offset of the Tooltip                                                                                                                                        | number                     | —                                                                                                         | 0                                                       |
| transition                               | animation name                                                                                                                                               | string                     | —                                                                                                         | el-fade-in-linear                                       |
| visible-arrow (will deprecate in 2.1.0 ) | whether an arrow is displayed. For more information, check [ElPopper](https://github.com/element-plus/element-plus/tree/dev/packages/components/popper) page | boolean                    | —                                                                                                         | true                                                    |
| popper-options                           | [popper.js](https://popper.js.org/docs/v2/) parameters                                                                                                       | Object                     | refer to [popper.js](https://popper.js.org/docs/v2/) doc                                                  | `{ boundariesElement: 'body', gpuAcceleration: false }` |
| show-after                               | delay of appearance, in millisecond                                                                                                                          | number                     | —                                                                                                         | 0                                                       |
| show-arrow                               | whether the tooltip content has an arrow                                                                                                                     | boolean                    | true / false                                                                                              | true                                                    |
| hide-after                               | delay of disappear, in millisecond                                                                                                                           | number                     | —                                                                                                         | 200                                                     |
| auto-close                               | timeout in milliseconds to hide tooltip                                                                                                                      | number                     | —                                                                                                         | 0                                                       |
| manual                                   | whether to control Tooltip manually. `mouseenter` and `mouseleave` won't have effects if set to `true`                                                       | boolean                    | —                                                                                                         | false                                                   |
| popper-class                             | custom class name for Tooltip's popper                                                                                                                       | string                     | —                                                                                                         | —                                                       |
| enterable                                | whether the mouse can enter the tooltip                                                                                                                      | Boolean                    | —                                                                                                         | true                                                    |
| tabindex                                 | [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of Tooltip                                                          | number                     | —                                                                                                         | 0                                                       |
| teleported                               | whether tooltip content is teleported, if `true` it will be teleported to where `append-to` sets                                                             | boolean                    | true / false                                                                                              | true                                                    |
| trigger                                  | How should the tooltip be triggered (to show)                                                                                                                | string                     | hover / click / focus / contextmenu                                                                       | hover                                                   |
| virtual-triggering                       | Indicates whether virtual triggering is enabled                                                                                                              | boolean                    | —                                                                                                         | false                                                   |
| virtual-ref                              | Indicates the reference element to which the tooltip is attached                                                                                             | HTMLElement                | —                                                                                                         | —                                                       |
| trigger-keys                             | When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of tooltip through the keyboard      | Array                      | —                                                                                                         | `['Enter','Space']`                                     |

## Slots

| Name    | Description                            |
| ------- | -------------------------------------- |
| —       | Tooltip triggering & reference element |
| content | customize content                      |
