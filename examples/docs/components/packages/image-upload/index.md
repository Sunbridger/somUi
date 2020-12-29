## ImageUpload 图片上传

### 概述

用于图片上传，4.1.1版本不可用，建议升级到该版本以上

### 代码演示

::: demo image-upload
基础用法， 请在移动端查看 touch 效果
:::

### API

#### ImageUpload
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| img-list | 图片数组 | array | — | — |
| max | 最大上传数量 | number | — | 12 |
| name | 图片名称（可选） | string | — | - |
| cover | 上传按钮上的示例图片地址（可选） | string | — | - |
| width | 上传按钮或图片展示的宽度 | number | — | 105 |
| height | 上传按钮或图片展示的高度 | number | — | 79 |
| quality | 指定压缩图片时的质量 | number | 0-1 | 0.5 |
| deletable | 是否显示删除按钮 | boolean | — | false |
| lazy | 图片是否懒加载 | boolean | — | true |
| only-camera | 是否只支持拍照上传 | boolean | — | false |
| action | oss-image action操作参数 [oss-api](https://help.aliyun.com/document_detail/44686.html?spm=5176.doc44688.6.930.8NEtAn)| object或array | — | {action: 'quality', q: 75} |
| agreement | 是否去掉图片请求协议，采用自适应协议 | boolean | — | true |

#### ImageUpload Events
| 事件名      | 说明          | 参数                           |
|---------- |-------------- |--------------------------------  |
| success | 所有图片上传结束后触发 | 所有上传成功的图片数组|
| error | 每一张图片上传失败时都会触发 | {success: 0, msg: ''} 或 {message: ''} 或 Error: xxx |


### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 韩永斌 |