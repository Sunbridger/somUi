## ShopSelect 门店选择

### 概述

用于门店的选择

### 代码演示

::: demo shop-select
基础用法
:::

### API

#### ShopSelect
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 选中店铺值, v-model 绑定 | array | — | — |
| shop-data | 所有地区门店数据 | array | — | — |
| props | 配置选项, 具体见下表 | object | — | — |
| show | 是否显示 | boolean | — | false |
| single-city-multiple | 单个城市多选 | boolean | — | false |
| multiple | 设置多选 | boolean | — | false |
| flat-numer | 设置平铺门店数 | number | — | 15 |
| my-shop | 设置我的门店显示，参数格式为{ store, storeName } | object | — | — |
| all-shop | 设置全部门店显示 | object | — | { show: false, disabled: false, title: '全部门店' } |
| is-all | 单选下设置地区全部可选项 | boolean | — | false |

### ShopSelect props
| 参数     | 说明              | 类型   | 可选值 | 默认值 |
| -------- | ----------------- | ------ | ------ | ------ |
| store | 指定选项的子选项店铺值 | string | — | store |
| storeName | 指定选项的子选项店铺名字 | string | — | storeName |
| city    | 指定选项店铺的城市名 | string | — | city |
| cityCode    | 指定选项店铺的城市 code | string | — | cityCode |
| firstLetter | 指定选项店铺城市首字母 | string | — | firstLetter |


#### ShopSelect Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-change | 店铺值改变时触发, 在单选或单城市多选时会传出 city 参数 | value |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |
