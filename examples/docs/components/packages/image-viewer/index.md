## ImageViewer 图片查看器

### 概述

图片的浏览查看，支持 tabs 分类图片

### 代码演示

::: demo image-viewer
image-viewer
:::

### API

#### ImageViewer
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| list | 图片列表 | Array | — | — |
| title | 图片组的标题 | String | — | 仅当没有预览图并不是质检模式时，默认显示图片的分页数字 |
| checkReport | 是否是质检模式 | Boolean | — | false |
| showPreview | 是否显示预览图 | Boolean | — | false |
| showTabLenth | 分类模式下，是否显示分类的图片数量 | boolean | — | false |
| deletable | 是否显示删除按钮 | boolean | — | false |
| options | [photoswipe.js](http://photoswipe.com/documentation/options.html) 的参数 | Object | — | {loop: false} | — |
| slot | 图标标题自定义内容 | — | — | — |
| action | oss-image action操作参数 [oss-api](https://help.aliyun.com/document_detail/44686.html?spm=5176.doc44688.6.930.8NEtAn) | array | — | [{action: 'interlace', value: 1}, { action: 'quality', Q: 75 }, { action: 'sharpen', value: 100 }, { action: 'auto-orient', value: 1}] | 

#### ImageViewer
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 质检模式下，图片的检测结果 | string | — | — |
| description | 质检模式下，图片检测结果的描述 | string | — | — |
| littleTag | 质检模式下， 图片检测结果的小图标 | string | — | — |
| tab | 分类模式下， 图片的分类 | string | — | — |


#### ImageViewer Slot
| 参数      | 说明          |
|---------- |-------------- |
| default | 图标标题自定义内容 |

#### 组件中的部分方法说明
| 方法名 | 说明 | 方法定义 | 返回值 |
|---------- |------|-------- |--------------------------------   | ---- |
| show | 显示大图的方法 | Function(index, tabIndex)index:图片的下标, tabIndex: 图片类别的下标(`注意`: 在有类别时传入图片下标应为图片在类别中的下标) | 无 |

#### ImageViewer Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-close | 图片关闭时触发 | — |
| on-delete | 图片删除时触发 | index:图片的下标 |


