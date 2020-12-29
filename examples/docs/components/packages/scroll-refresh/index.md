## ScrollRefresh 上拉加载/下拉刷新

### 概述

下拉刷新一般隐藏于导航栏下，下拉整个页面时出现, 刷新作用于整个页面，当前页面所有数据重新加载
底部加载，底部上滑时出现加载动画，用于加载更多数据

### 代码演示

::: demo scroll-refresh
上拉加载/下拉刷新组件
:::

### 下拉刷新

### API

#### ScrollRefresh
| 参数        | 说明   | 类型     | 可选值        | 默认值 |
| ----------- | -------------------- | -------- | ------------- | ------ |
| offset-h    | 下拉触发 pullDown 方法的阈值，即距离顶部的滚动距离，超过该距离时，手指离开触摸屏则下拉刷新，单位为 px | — |  number/string | — | 60 |
| pull-down    | 下拉加载方法，达到下拉阈值即会触发  | function | — | — |
| max-pull-down | 下拉的最大距离， 达到之后不能继续往下拉 | number/string | — | 120 |
| show-back-top | 是否允许显示返回顶部按钮（超出两屏时显示出来）| boolean  | — | false  |
| bottom-distance | 上拉触发 pullUp 方法的阈值，即剩余滚动内容的长度，单位为px | number/string | — | 50 |
| pull-up | 上拉加载方法，达到上拉阈值时即会触发 | function | — | — |
| prevent-default | 是否`阻止`初始化自动调用下拉加载方法 | boolean | — | false  |


#### ScrollRefresh Slot
| name         | 说明                                             |
| ------------ | ------------------------------------------------ |
| pull-text    | 文档顶部下滑时的提示区域，提示文字               |
| pull-icon    | 文档顶部下滑时的提示区域，提示图标               |
| drop-text    | 下滑距离达到触发pullDwon方法时的提示区，提示文字 |
| drop-icon    | 下滑距离达到触发pullDwon方法时的提示区, 提示图标 |
| loading-text | 开始刷新时，提示文字                             |
| loading-icon | 开始刷新时，提示图标                             |
| spinner   | 上拉加载时的loading区域，默认为空              |
| no-more   | 上拉加载完成，无更多数据时的提示区域，默认为空 |
| no-result | 上拉加载无数据时提示区域，默认为空             |


#### ScrollRefresh Methods
| event       | 说明  |
| ----------- | ------ |
| pullDown(e) | 下拉刷新pullDown方法默认参数为一个对象e，对象中含有一个方法refreshed(),当刷新完成时需调用e.refreshed()通知组件回到初始状态 |
| pullUp(e) | 上拉加载方法，默认参数对对象e,含有两个方法：loaded() 与 completed(), 当页数据加载完成时，调用 e.loaded(),spinner 不再显示；所有数据加载完成时，调用 e.completed(), pullUp 方法不会再触发 |

#### ScrollRefresh Event
| 事件名         | 说明   | 使用方法                    |
| -------------- | -------------------------------------- | --------------------------- |
| loadmore:reset | 当上拉条件改变时，父组件通知子组件更新 | vm.$emit('loadmore:reset'); |
