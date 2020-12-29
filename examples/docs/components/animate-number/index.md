## AnimateNumber 数字动画

### 概述

数字动画。

### 代码演示

::: demo animate-number
数字动画组件
:::

### API

#### AnimateNumber
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 动画类型选择(1为数字过渡，2为数字滚动) | number | 1/2 | 1 |
| number | 需要变换的数字(string用于保持小数位，type为2时才会用到) | number/string | — | 0 |
| duration | 变换时间(毫秒) | number | — | 1000 |
| handler | 数字处理函数(type为1时必须传，处理过渡时的小数位问题) | function | — | undefined |
| height | 滚动数字高度(type为2时必须传，解决数字滚动后不整齐的问题；单位为px) | number | — | 30 |
| animation | 是否使用动画(false的时候不会进行动画，直接变成结果。type 1和2的时候均可) | boolean | — | true |
| last-show | 该次变化后最终显示。如果没有该值，默认显示经过handler处理的结果；如果有，则变化完毕后显示该值(type为1时可以使用) | number/string | — | — |

