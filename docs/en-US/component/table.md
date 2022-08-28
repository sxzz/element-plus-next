---
title: Table
lang: en-US
---

# Table

Display multiple data with similar format. You can sort, filter, compare your data in a table.

## Basic table

Basic table is just for data display.

:::demo After setting attribute `data` of `el-table` with an object array, you can use `prop` (corresponding to a key of the object in `data` array) in `el-table-column` to insert data to table columns, and set the attribute `label` to define the column name. You can also use the attribute `width` to define the width of columns.

table/basic

:::

## Striped Table

Striped table makes it easier to distinguish different rows.

:::demo Attribute `stripe` accepts a `Boolean`. If `true`, table will be striped.

table/striped

:::

## Table with border

:::demo By default, Table has no vertical border. If you need it, you can set attribute `border` to `true`.

table/with-border

:::

## Table with status

You can highlight your table content to distinguish between "success, information, warning, danger" and other states.

:::demo Use `row-class-name` in `el-table` to add custom classes to a certain row. Then you can style it with custom classes.

table/with-status

:::

## Table with fixed header

When there are too many rows, you can use a fixed header.

:::demo By setting the attribute `height` of `el-table`, you can fix the table header without any other codes.

table/fixed-header

:::

## Table with fixed column

When there are too many columns, you can fix some of them.

:::demo Attribute `fixed` is used in `el-table-column`, it accepts a `Boolean`. If `true`, the column will be fixed at left. It also accepts two string literals: 'left' and 'right', both indicating that the column will be fixed at corresponding direction.

table/fixed-column

:::

## Table with fixed columns and header

When you have huge chunks of data to put in a table, you can fix the header and columns at the same time.

:::demo Fix columns and header at the same time by combining the above two examples.

table/fixed-column-and-header

:::

## Fluid-height Table with fixed header (and columns)

When the the data is dynamically changed, you might want the table to have a maximum height rather than a fixed height and to show the scroll bar if needed.

:::demo By setting the attribute `max-height` of `el-table`, you can fix the table header. The table body scrolls only if the height of the rows exceeds the max height value.

table/fixed-header-with-fluid-header

:::

## Grouping table head

When the data structure is complex, you can use group header to show the data hierarchy.

:::demo Only need to place el-table-column inside a el-table-column, you can achieve group header.

table/grouping-header

:::

## Single select

Single row selection is supported.

:::demo Table supports single row selection. You can activate it by adding the `highlight-current-row` attribute. An event called `current-change` will be triggered when row selection changes, and its parameters are the rows after and before this change: `currentRow` and `oldCurrentRow`. If you need to display row index, you can add a new `el-table-column` with its `type` attribute assigned to `index`, and you will see the index starting from 1.

table/single-select

:::

## Multiple select

You can also select multiple rows.

:::demo Activating multiple selection is easy: simply add an `el-table-column` with its `type` set to `selection`. Apart from multiple selection, this example also uses `show-overflow-tooltip`. By default, if the content is too long, it will break into multiple lines. If you want to keep it in one line, use attribute `show-overflow-tooltip`, which accepts a `Boolean` value. When set `true`, the extra content will show in tooltip when hover on the cell.

table/multi-select

:::

## Sorting

Sort the data to find or compare data quickly.

:::demo Set attribute `sortable` in a certain column to sort the data based on this column. It accepts `Boolean` with a default value `false`. Set table attribute `default-sort` to determine default sort column and order. To apply your own sorting rules, use `sort-method` or `sort-by`. If you need remote sorting from backend, set `sortable` to `custom`, and listen to the `sort-change` event on Table. In the event handler, you have access to the sorting column and sorting order so that you can fetch sorted table data from API. In this example we use another attribute named `formatter` to format the value of certain columns. It accepts a function which has two parameters: `row` and `column`. You can handle it according to your own needs.

table/sort

:::

## Filter

Filter the table to find desired data.

:::demo Set attribute `filters` and `filter-method` in `el-table-column` makes this column filterable. `filters` is an array, and `filter-method` is a function deciding which rows are displayed. It has three parameters: `value`, `row` and `column`.

table/filter

:::

## Custom column template

Customize table column so it can be integrated with other components.

:::demo You have access to the following data: row, column, $index and store (state management of Table) by [slot](https://v3.vuejs.org/guide/component-slots.html).

table/custom-column

:::

## Table with custom header

Customize table header so it can be even more customized.

:::demo You can customize how the header looks by header [slots](https://v3.vuejs.org/guide/component-slots.html).

table/custom-header

:::

## Expandable row

When the row content is too long and you do not want to display the horizontal scroll bar, you can use the expandable row feature.

:::demo Activate expandable row by adding type="expand" and slot. The template for el-table-column will be rendered as the contents of the expanded row, and you can access the same attributes as when you are using `slot` in custom column templates.

table/expandable-row

:::

## Tree data and lazy mode

:::demo You can display tree structure data. When row contains the `children` field, it is treated as nested data. For rendering nested data, the prop `row-key` is required. Also, child row data can be loaded asynchronously. Set `lazy` property of Table to true and the function `load`. Specify `hasChildren` attribute in row to determine which row contains children. Both `children` and `hasChildren` can be configured via `tree-props`.

table/tree-and-lazy

:::

## Summary row

For table of numbers, you can add an extra row at the table footer displaying each column's sum.

:::demo You can add the summary row by setting `show-summary` to `true`. By default, for the summary row, the first column does not sum anything up but always displays 'Sum' (you can configure the displayed text using `sum-text`), while other columns sum every number in that column up and display them. You can of course define your own sum behaviour. To do so, pass a method to `summary-method`, which returns an array, and each element of the returned array will be displayed in the columns of the summary row. The second table of this example is a detailed demo.

table/summary

:::

## Rowspan and colspan

Configuring rowspan and colspan allows you to merge cells

:::demo Use the `span-method` attribute to configure rowspan and colspan. It accepts a method, and passes an object to that method including current row `row`, current column `column`, current row index `rowIndex` and current column index `columnIndex`. The method should return an array of two numbers, the first number being `rowspan` and second `colspan`. It can also return an object with `rowspan` and `colspan` props.

table/rowspan-and-colspan

:::

## Custom index

You can customize row index in `type=index` columns.

:::demo To customize row indices, use `index` attribute on `el-table-column` with `type=index`. If it is assigned to a number, all indices will have an offset of that number. It also accepts a method with each index (starting from `0`) as parameter, and the returned value will be displayed as index.

table/custom-index

:::

## Table Layout

The [table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) property sets the algorithm used to lay out table cells, rows, and columns.

:::demo

table/table-layout

:::

## Table Attributes

| Attribute                               | Description                                                                                                                                                                                                                                                                 | Type                                                        | Accepted Values                 | Default                                                                        |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------ |
| data                                    | Table data                                                                                                                                                                                                                                                                  | array                                                       | —                               | —                                                                              |
| height                                  | Table's height. By default it has an `auto` height. If its value is a number, the height is measured in pixels; if its value is a string, the value will be assigned to element's style.height, the height is affected by external styles                                   | string / number                                             | —                               | —                                                                              |
| max-height                              | Table's max-height. The legal value is a number or the height in px.                                                                                                                                                                                                        | string / number                                             | —                               | —                                                                              |
| stripe                                  | whether Table is striped                                                                                                                                                                                                                                                    | boolean                                                     | —                               | false                                                                          |
| border                                  | whether Table has vertical border                                                                                                                                                                                                                                           | boolean                                                     | —                               | false                                                                          |
| size                                    | size of Table                                                                                                                                                                                                                                                               | string                                                      | large / default /small          | —                                                                              |
| fit                                     | whether width of column automatically fits its container                                                                                                                                                                                                                    | boolean                                                     | —                               | true                                                                           |
| show-header                             | whether Table header is visible                                                                                                                                                                                                                                             | boolean                                                     | —                               | true                                                                           |
| highlight-current-row                   | whether current row is highlighted                                                                                                                                                                                                                                          | boolean                                                     | —                               | false                                                                          |
| current-row-key                         | key of current row, a set only prop                                                                                                                                                                                                                                         | string / number                                             | —                               | —                                                                              |
| row-class-name                          | function that returns custom class names for a row, or a string assigning class names for every row                                                                                                                                                                         | function(\{ row, rowIndex \}) / string                      | —                               | —                                                                              |
| row-style                               | function that returns custom style for a row, or an object assigning custom style for every row                                                                                                                                                                             | function(\{ row, rowIndex \}) / object                      | —                               | —                                                                              |
| cell-class-name                         | function that returns custom class names for a cell, or a string assigning class names for every cell                                                                                                                                                                       | function(\{ row, column, rowIndex, columnIndex \}) / string | —                               | —                                                                              |
| cell-style                              | function that returns custom style for a cell, or an object assigning custom style for every cell                                                                                                                                                                           | function(\{ row, column, rowIndex, columnIndex \}) / object | —                               | —                                                                              |
| header-row-class-name                   | function that returns custom class names for a row in table header, or a string assigning class names for every row in table header                                                                                                                                         | function(\{ row, rowIndex }\) / string                      | —                               | —                                                                              |
| header-row-style                        | function that returns custom style for a row in table header, or an object assigning custom style for every row in table header                                                                                                                                             | function(\{ row, rowIndex \}) / object                      | —                               | —                                                                              |
| header-cell-class-name                  | function that returns custom class names for a cell in table header, or a string assigning class names for every cell in table header                                                                                                                                       | function(\{ row, column, rowIndex, columnIndex \}) / string | —                               | —                                                                              |
| header-cell-style                       | function that returns custom style for a cell in table header, or an object assigning custom style for every cell in table header                                                                                                                                           | function(\{ row, column, rowIndex, columnIndex \}) / object | —                               | —                                                                              |
| row-key                                 | key of row data, used for optimizing rendering. Required if `reserve-selection` is on or display tree data. When its type is String, multi-level access is supported, e.g. `user.info.id`, but `user.info[0].id` is not supported, in which case `Function` should be used. | function(row) / string                                      | —                               | —                                                                              |
| empty-text                              | Displayed text when data is empty. You can customize this area with `#empty`                                                                                                                                                                                                | string                                                      | —                               | No Data                                                                        |
| default-expand-all                      | whether expand all rows by default, works when the table has a column type="expand" or contains tree structure data                                                                                                                                                         | boolean                                                     | —                               | false                                                                          |
| expand-row-keys                         | set expanded rows by this prop, prop's value is the keys of expand rows, you should set row-key before using this prop                                                                                                                                                      | array                                                       | —                               | —                                                                              |
| default-sort                            | set the default sort column and order. property `prop` is used to set default sort column, property `order` is used to set default sort order                                                                                                                               | object                                                      | `order`: ascending / descending | if `prop` is set, and `order` is not set, then `order` is default to ascending |
| tooltip-effect                          | tooltip `effect` property                                                                                                                                                                                                                                                   | string                                                      | dark / light                    | dark                                                                           |
| show-summary                            | whether to display a summary row                                                                                                                                                                                                                                            | boolean                                                     | —                               | false                                                                          |
| sum-text                                | displayed text for the first column of summary row                                                                                                                                                                                                                          | string                                                      | —                               | Sum                                                                            |
| summary-method                          | custom summary method                                                                                                                                                                                                                                                       | function(\{ columns, data \})                               | —                               | —                                                                              |
| span-method                             | method that returns rowspan and colspan                                                                                                                                                                                                                                     | function(\{ row, column, rowIndex, columnIndex \})          | —                               | —                                                                              |
| select-on-indeterminate                 | controls the behavior of master checkbox in multi-select tables when only some rows are selected (but not all). If true, all rows will be selected, else deselected.                                                                                                        | boolean                                                     | —                               | true                                                                           |
| indent                                  | horizontal indentation of tree data                                                                                                                                                                                                                                         | number                                                      | —                               | 16                                                                             |
| lazy                                    | whether to lazy loading data                                                                                                                                                                                                                                                | boolean                                                     | —                               | —                                                                              |
| load                                    | method for loading child row data, only works when `lazy` is true                                                                                                                                                                                                           | function(row, treeNode, resolve)                            | —                               | —                                                                              |
| tree-props                              | configuration for rendering nested data                                                                                                                                                                                                                                     | object                                                      | —                               | `{ hasChildren: 'hasChildren', children: 'children' }`                         |
| table-layout                            | Sets the algorithm used to lay out table cells, rows, and columns                                                                                                                                                                                                           | string                                                      | fixed / auto                    | fixed                                                                          |
| scrollbar-always-on                     | always show scrollbar                                                                                                                                                                                                                                                       | boolean                                                     | —                               | false                                                                          |
| flexible <VersionTag version="2.2.1" /> | ensure main axis minimum-size doesn't follow the content                                                                                                                                                                                                                    | boolean                                                     | —                               | false                                                                          |

## Table Events

| Event Name         | Description                                                                                                                                  | Parameters                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| select             | triggers when user clicks the checkbox in a row                                                                                              | selection, row                    |
| select-all         | triggers when user clicks the checkbox in table header                                                                                       | selection                         |
| selection-change   | triggers when selection changes                                                                                                              | selection                         |
| cell-mouse-enter   | triggers when hovering into a cell                                                                                                           | row, column, cell, event          |
| cell-mouse-leave   | triggers when hovering out of a cell                                                                                                         | row, column, cell, event          |
| cell-click         | triggers when clicking a cell                                                                                                                | row, column, cell, event          |
| cell-dblclick      | triggers when double clicking a cell                                                                                                         | row, column, cell, event          |
| cell-contextmenu   | triggers when user right clicks on a cell                                                                                                    | row, column, cell, event          |
| row-click          | triggers when clicking a row                                                                                                                 | row, column, event                |
| row-contextmenu    | triggers when user right clicks on a row                                                                                                     | row, column, event                |
| row-dblclick       | triggers when double clicking a row                                                                                                          | row, column, event                |
| header-click       | triggers when clicking a column header                                                                                                       | column, event                     |
| header-contextmenu | triggers when user right clicks on a column header                                                                                           | column, event                     |
| sort-change        | triggers when Table's sorting changes                                                                                                        | `{ column, prop, order }`         |
| filter-change      | column's key. If you need to use the filter-change event, this attribute is mandatory to identify which column is being filtered             | filters                           |
| current-change     | triggers when current row changes                                                                                                            | currentRow, oldCurrentRow         |
| header-dragend     | triggers after changing a column's width by dragging the column header's border                                                              | newWidth, oldWidth, column, event |
| expand-change      | triggers when user expands or collapses a row (for expandable table, second param is expandedRows; for tree Table, second param is expanded) | row, (expandedRows \| expanded)   |

## Table Methods

| Method             | Description                                                                                                                                                       | Parameters                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| clearSelection     | used in multiple selection Table, clear user selection                                                                                                            | —                                                     |
| getSelectionRows   | returns the currently selected rows                                                                                                                               |                                                       |
| toggleRowSelection | used in multiple selection Table, toggle if a certain row is selected. With the second parameter, you can directly set if this row is selected                    | row, selected                                         |
| toggleAllSelection | used in multiple selection Table, toggle select all and deselect all                                                                                              | —                                                     |
| toggleRowExpansion | used in expandable Table or tree Table, toggle if a certain row is expanded. With the second parameter, you can directly set if this row is expanded or collapsed | row, expanded                                         |
| setCurrentRow      | used in single selection Table, set a certain row selected. If called without any parameter, it will clear selection.                                             | row                                                   |
| clearSort          | clear sorting, restore data to the original order                                                                                                                 | —                                                     |
| clearFilter        | clear filters of the columns whose `columnKey` are passed in. If no params, clear all filters                                                                     | columnKeys                                            |
| doLayout           | refresh the layout of Table. When the visibility of Table changes, you may need to call this method to get a correct layout                                       | —                                                     |
| sort               | sort Table manually. Property `prop` is used to set sort column, property `order` is used to set sort order                                                       | prop: string, order: string                           |
| scrollTo           | scrolls to a particular set of coordinates                                                                                                                        | (options: ScrollToOptions \| number, yCoord?: number) |
| setScrollTop       | set vertical scroll position                                                                                                                                      | top                                                   |
| setScrollLeft      | set horizontal scroll position                                                                                                                                    | left                                                  |

## Table Slots

| Name   | Description                                                                                                                                                                                   | Subtags      |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| -      | customize default content                                                                                                                                                                     | Table-column |
| append | Contents to be inserted after the last row. You may need this slot if you want to implement infinite scroll for the table. This slot will be displayed above the summary row if there is one. | —            |
| empty  | you can customize content when data is empty.                                                                                                                                                 | —            |

## Table-column Attributes

| Attribute             | Description                                                                                                                                                                                                         | Type                                    | Accepted Values                                                                                                                  | Default                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| type                  | type of the column. If set to `selection`, the column will display checkbox. If set to `index`, the column will display index of the row (staring from 1). If set to `expand`, the column will display expand icon. | string                                  | selection / index / expand                                                                                                       | —                                 |
| index                 | customize indices for each row, works on columns with `type=index`                                                                                                                                                  | number / function(index)                | —                                                                                                                                | —                                 |
| label                 | column label                                                                                                                                                                                                        | string                                  | —                                                                                                                                | —                                 |
| column-key            | column's key. If you need to use the filter-change event, you need this attribute to identify which column is being filtered                                                                                        | string                                  | —                                                                                                                                | —                                 |
| prop                  | field name. You can also use its alias: `property`                                                                                                                                                                  | string                                  | —                                                                                                                                | —                                 |
| width                 | column width                                                                                                                                                                                                        | string / number                         | —                                                                                                                                | —                                 |
| min-width             | column minimum width. Columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion                                                                          | string / number                         | —                                                                                                                                | —                                 |
| fixed                 | whether column is fixed at left / right. Will be fixed at left if `true`                                                                                                                                            | string / boolean                        | true / 'left' / 'right'                                                                                                          | —                                 |
| render-header         | render function for table header of this column                                                                                                                                                                     | function(\{ column, $index \})          | —                                                                                                                                | —                                 |
| sortable              | whether column can be sorted. Remote sorting can be done by setting this attribute to 'custom' and listening to the `sort-change` event of Table                                                                    | boolean / string                        | true / false / 'custom'                                                                                                          | false                             |
| sort-method           | sorting method, works when `sortable` is `true`. Should return a number, just like Array.sort                                                                                                                       | function(a, b)                          | —                                                                                                                                | —                                 |
| sort-by               | specify which property to sort by, works when `sortable` is `true` and `sort-method` is `undefined`. If set to an Array, the column will sequentially sort by the next property if the previous one is equal        | function(row, index) / string / array   | —                                                                                                                                | —                                 |
| sort-orders           | the order of the sorting strategies used when sorting the data, works when `sortable` is `true`. Accepts an array, as the user clicks on the header, the column is sorted in order of the elements in the array     | array                                   | the elements in the array need to be one of the following: `ascending`, `descending` and `null` (restores to the original order) | ['ascending', 'descending', null] |
| resizable             | whether column width can be resized, works when `border` of `el-table` is `true`                                                                                                                                    | boolean                                 | —                                                                                                                                | true                              |
| formatter             | function that formats cell content                                                                                                                                                                                  | function(row, column, cellValue, index) | —                                                                                                                                | —                                 |
| show-overflow-tooltip | whether to hide extra content and show them in a tooltip when hovering on the cell                                                                                                                                  | boolean                                 | —                                                                                                                                | false                             |
| align                 | alignment                                                                                                                                                                                                           | string                                  | left / center / right                                                                                                            | left                              |
| header-align          | alignment of the table header. If omitted, the value of the above `align` attribute will be applied                                                                                                                 | string                                  | left / center / right                                                                                                            | —                                 |
| class-name            | class name of cells in the column                                                                                                                                                                                   | string                                  | —                                                                                                                                | —                                 |
| label-class-name      | class name of the label of this column                                                                                                                                                                              | string                                  | —                                                                                                                                | —                                 |
| selectable            | function that determines if a certain row can be selected, works when `type` is 'selection'                                                                                                                         | function(row, index)                    | —                                                                                                                                | —                                 |
| reserve-selection     | whether to reserve selection after data refreshing, works when `type` is 'selection'. Note that `row-key` is required for this to work                                                                              | boolean                                 | —                                                                                                                                | false                             |
| filters               | an array of data filtering options. For each element in this array, `text` and `value` are required                                                                                                                 | array[{ text, value }]                  | —                                                                                                                                | —                                 |
| filter-placement      | placement for the filter dropdown                                                                                                                                                                                   | string                                  | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end  | —                                 |
| filter-multiple       | whether data filtering supports multiple options                                                                                                                                                                    | boolean                                 | —                                                                                                                                | true                              |
| filter-method         | data filtering method. If `filter-multiple` is on, this method will be called multiple times for each row, and a row will display if one of the calls returns `true`                                                | function(value, row, column)            | —                                                                                                                                | —                                 |
| filtered-value        | filter value for selected data, might be useful when table header is rendered with `render-header`                                                                                                                  | array                                   | —                                                                                                                                | —                                 |

## Table-column Slots

| Name   | Description                                                                        |
| ------ | ---------------------------------------------------------------------------------- |
| —      | Custom content for table columns. The scope parameter is `{ row, column, $index }` |
| header | Custom content for table header. The scope parameter is `{ column, $index }`       |

## FAQ

#### How to use image preview in the table?

```vue
<el-table-column label="Thumbnail" width="180">
    <template #default="scope">
        <div style="display: flex; align-items: center">
            <el-image :preview-src-list="srcList"/>
        </div>
    </template>
</el-table-column>
```

PS: since the fixed column is implement by sticky, when you have fixed columns in table, please add the `preview-teleported` attribute in image

#### Why column is not rendered when use DOM templates?

Typical issue: [#5046](https://github.com/element-plus/element-plus/issues/5046) [#5862](https://github.com/element-plus/element-plus/issues/5862) [#6919](https://github.com/element-plus/element-plus/issues/6919)

This is because the HTML spec only allows a few specific elements to omit closing tags, the most common being `<input>` and `<img>`. For all other elements, if you omit the closing tag, the native HTML parser will think you never terminated the opening tag

For more details please refer to [vue docs](https://vuejs.org/guide/essentials/component-basics.html#self-closing-tags)
