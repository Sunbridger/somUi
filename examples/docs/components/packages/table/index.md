## Table 表格

### 概述

用于展示多条结构类似的数据，可以对数据排序、筛选、对比或者其他滴定仪操作。
`注意` 不允许只存在 `fixed` 列的情况，以及动态渲染列数时，注意列的 `key` 值唯一。
`开发者备注` som-table同soui-table基本相同，除了以下几个改动点，其他皆为针对移动端表格的样式适配：
+ 新增`fixable`属性
+ 移除`row-class-name`属性
+ `show-summary`支持`置顶`,可选值true或者bottom表示显示置底，top表示置顶

::: tip
注意： 引用时记得引入 table-column ( import TableColumn from '@souche-ui/som-table/lib/table-column.js' );
:::

### 代码演示

::: demo table
基础用法
:::

### API

#### Table
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data | 显示的数据 | array | — | — |
| height | Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则 Table 的高度受控于外部样式。  | string/number | — | — |
| max-height | Table 的最大高度 | string/number | — | — |
| stripe | 是否为斑马纹 table | boolean | — | false |
| sticky | 是否表头吸顶 | boolean | — | false |
| border | 是否带有纵向边框 | boolean | — | false |
| fit | 列的宽度是否自撑开 | boolean | — | true |
| fixable | 是否使用交互式的列固定 | boolean | — | false |
| show-header | 是否显示表头 | boolean | — | true |
| highlight-current-row | 是否要高亮当前行 | boolean | — | false |
| current-row-key | 当前行的 key，只写属性 | string/number | — | — |
| row-style | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。 | function(row, index)/object | — | — |
| row-key | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能的情况下，该属性是必填的。类型为 string 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`。 | function(row)/string | — | — |
| empty-text | 空数据时显示的文本内容，也可以通过 `slot="empty"` 设置 | string | — | 暂无数据 |
| default-expand-all | 是否默认展开所有行，当 Table 中存在 type="expand" 的 Column 的时候有效 | boolean | — | false |
| expand-row-keys | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。| array | — | — |
| default-sort | 默认的排序列的prop和顺序。它的 `prop` 属性指定默认的排序的列，`order` 指定默认排序的顺序| object | `order`: ascending, descending | 如果只指定了 `prop`, 没有指定 `order`, 则默认顺序是ascending |
| is-sort-back | 是否回到排序初始状态 | boolean | — | true |
| is-reset-scroll | 当表格有滚动状态时，数据改变时是否重置滚动位置 | boolean | — | true |
| no-sort-rows | 不参与排序的行 | array | — | — |
| tooltip-effect | tooltip `effect` 属性 | string | dark/light | dark |
| show-summary | 是否显示合计行，true或者bottom表示显示置底，top表示置顶 | string, boolean | true, top, bottom | — |
| sum-text | 合计行第一列的文本 | string | — | 合计 |
| summary-method | 自定义的合计计算方法 | function({ columns, data }) | — | — |
| cross | hover 时行列背景色都改变，表现为十字交叉，在多列的情况下方便定位 | boolean | — | false |

#### Table Events
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| on-select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| on-select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
| on-selection-change | 当选择项发生变化时会触发该事件 | selection |
| on-cell-mouse-enter | 当单元格 hover 进入时会触发该事件 | row, column, cell, event |
| on-cell-mouse-leave | 当单元格 hover 退出时会触发该事件 | row, column, cell, event |
| on-cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event |
| on-cell-dblclick | 当某个单元格被双击击时会触发该事件 | row, column, cell, event |
| on-row-click | 当某一行被点击时会触发该事件 | row, event, column |
| on-row-contextmenu | 当某一行被鼠标右键点击时会触发该事件 | row, event |
| on-row-dblclick | 当某一行被双击时会触发该事件 | row, event |
| on-header-click | 当某一列的表头被点击时会触发该事件 | column, event |
| on-sort-change | 当表格的排序条件发生变化的时候会触发该事件 | { column, prop, order } |
| on-filter-change | 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。 | filters |
| on-current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow |
| on-header-dragend | 当拖动表头改变了列的宽度的时候会触发该事件 | newWidth, oldWidth, column, event |
| on-expand | 当用户对某一行展开或者关闭的上会触发该事件 | row, expanded |

### Table Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| clearSelection | 用于多选表格，清空用户的选择，当使用 reserve-selection 功能的时候，可能会需要使用此方法 | selection |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） | row, selected |
| setCurrentRow | 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。 | row |

### Table Slot
| name | 说明 |
|------|--------|
| append | 插入至表格最后一行之后的内容，仍然位于 `<tbody>` 标签内。如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。 |

### Table-column Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 对应列的类型。如果设置了 `selection` 则显示多选框；如果设置了 `index` 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮 | string | selection/index/expand | — |
| indeterminate  | 如果设置了 `type = selection`, 设置 checbox 的 indeterminate 状态，只负责样式控制    | boolean   |  — | false   |
| column-key | column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件 | string | — | — |
| label | 显示的标题 | string | — | — |
| prop | 对应列内容的字段名，也可以使用 property 属性 | string | — | — |
| width | 对应列的宽度 | string | — | — |
| min-width | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | string | — | — |
| ellipsis | 设置 `本列` 超过宽度的文本以省略号处理 | boolean | — | false(默认换行) |
| fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string, boolean | true, left, right | — |
| render-header | 列标题 Label 区域渲染使用的 Function | function(h, { column, $index }) | — | — |
| sortable | 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 | boolean, string | true, false, 'custom' | false |
| sort-method | 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个布尔值 | function(a, b) | — | — |
| resizable | 对应列是否可以通过拖动改变宽度（需要在 so-table 上设置 border 属性为真） | boolean | — | true |
| formatter | 用来格式化内容 | function(row, column) | — | — |
| show-overflow-tooltip | 当内容过长被隐藏时显示 tooltip | boolean | — | false |
| align | 对齐方式 | string | left/center/right | left |
| header-align | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | string | left/center/right/top | — |
| class-name | 列的 className | string | — | — |
| label-class-name | 当前列标题的自定义类名 | string | — | — |
| selectable | 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | function(row, index) | — | — |
| reserve-selection | 仅对 type=selection 的列有效，类型为 Boolean，为 true 则代表会保留之前数据的选项，需要配合 Table 的 clearSelection 方法使用。 | boolean | — | false |
| filters | 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。 | array[{ text, value }] | — | — |
| filter-placement | 过滤弹出框的定位 | string | 与 Tooltip 的 `placement` 属性相同 | — |
| filter-multiple | 数据过滤的选项是否多选 | boolean | — | true |
| filter-method | 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。 | function(value, row) | — | — |
| filtered-value | 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。 | array | — | — |


### Table-column Slot
| name | 说明 |
|------|--------|
| — | 自定义列的内容， 参数为 {row, column, $index} |
| header | 自定义表头的内容, 参数为 {column, $index} |

### 贡献者
| 类型       | 参与者                         |
|---------- |--------------------------------  |
| 维护者 | 陈正荣 |
| 设计师 | 刘芳芳 |