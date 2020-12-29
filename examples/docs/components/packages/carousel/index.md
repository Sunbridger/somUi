## Carousel 走马灯

### 概述

页面控件告诉用户当前共打开了多少个视图，还有他们正处在其中哪一个

:::tip
**注意：** 引用时记得引入 carousel-item ( import CarouselItem from '@souche-ui/som-carousel/lib/carousel-item.js' );
:::

### 代码演示

::: demo carousel
基础用法
:::

### API

#### Carousel
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| list | 图片列表 | array | — | — |
| direction | 方向 | string | horizontal/vertical | horizontal |
| show-dots | 是否显示提示点 | boolean | — | true |
| show-desc-mask | 是否显示描述半透明遮罩 | boolean | — | true |
| dots-position | 提示点位置 | string | left/center/right | right |
| dots-class | 提示 className | string | — | — |
| auto | 是否自动轮播 | boolean | — | false |
| loop | 是否循环 | boolean | — | false |
| interval | 轮播停留时长 | number | — | 3000 |
| threshold | 当滑动超过这个距离时才滑动 | number | — | 50 |
| duration | 切换动画时间 | number | — | 300 |
| height | 高度值。如果为 `100%` 宽度并且知道宽高比，可以设置 `aspect-ratio` 自动计算高度 | string | — | 180px |
| aspect-ratio | 用以根据当前可用宽度计算高度值 | number | — | — |
| min-moving-distance | 超过这个距离时才滑动 | number | — | 0 |
| v-model | index 绑定，使用 `v-model`，一般不需要绑定 | number | — | 0 |

#### Carousel Slot
| 参数 | 说明          |
|---------- |-------------- |
| default | carousel-item 的内容插槽 |

#### Carousel Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-index-change | 轮播 index 变化时触发 | currentIndex |
| on-get-height | 高度获取后触发 | height |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

