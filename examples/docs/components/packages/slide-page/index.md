## SlidePage 滑动页面

### 概述

用于当页面过长或过宽时，实现滑动连接展示

### 代码演示

::: demo slide-page
slide-page
:::

### API

#### SlidePage
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| slide-way | 滑动的方式，子元素无 fixed 布局请使用 transform | string | normal/transform | normal |
| slide-type | 上下滑动还是左右滑动 | string | top/left | top |
| page-value | 单个页面的大小，即单次滑动的距离 | number | — | 第一个子元素的宽度或高度 |
| next-show | 是否显示到下一页面的箭头 | boolean | — | true |
| animate-time | 转场动画时间 | number | — | 500 |
| is-springback | 是否有回弹效果 | boolean | — | false |
| springback-distance | 回弹效果距离 | number | — | 50 |

#### SlidePage Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| pageindex | 当前页面序号 | {pageIndex：当前页面序号；fromIndex：跳转来源页面序号} |

