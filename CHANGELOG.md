### 版本变更记录

### [4.5.12](http://git.souche.com/souche-ui/som-ui/compare/v4.5.11...v4.5.12)
2019-1-6

- ImageViewer
    - 修复image-viewer在v-for中点击不生效的问题

### [4.5.11](http://git.souche.com/souche-ui/som-ui/compare/v4.5.10...v4.5.11)
2019-12-12

- Textarea
    - 修复textarea组件required属性无效的情况

### [4.5.8](http://git.souche.com/souche-ui/som-ui/compare/v4.5.7...v4.5.8)
2019-11-15

- image-upload
    - 静态资源协议写死

### [4.5.5](http://git.souche.com/souche-ui/som-ui/compare/v4.5.4...v4.5.5)
2019-10-28

- scroll-prevented
    - 修复scroll-prevented指令生命周期钩子错误使用的问题

### [4.5.4](http://git.souc he.com/souche-ui/som-ui/compare/v4.5.3...v4.5.4)
2019-10-25

- CityPicker/CarPicker
    - 在第一级数据未请求到时的空白页增加loading的slot #60

### [4.5.2](http://git.souche.com/souche-ui/som-ui/compare/v4.5.1...v4.5.2)
2019-10-12

- CityPicker/CarPicker
    - 优化右侧索引条使用体验

- Input
    - 修复type为email/date时placeholder不显示的问题

- ImageViewer
    - 修复list变化后，立即调用show方法（非第一次show），展示的图片未更新的bug

- Filter
    - 修复展开筛选项后将下面内容挤下去的bug

- ImageUpload
    - 修改image-upload引入第三方依赖的方式，修复其与低版本som-ui共存时打包失败的问题

### [4.5.1](http://git.souche.com/souche-ui/som-ui/compare/v4.5.0...v4.5.1)
2019-08-26

- Picker
    - 修复columns选项改变时defaultIndex不生效

### [4.5.0](http://git.souche.com/souche-ui/som-ui/compare/v4.4.2...v4.5.0)
2019-08-21

- 新增组件
    - Keyboard

- Modal
    - 新增点击取消按钮是否关闭弹窗参数，参数名 close-on-cancel

### [4.4.2](http://git.souche.com/souche-ui/som-ui/compare/v4.4.1...v4.4.2)
2019-08-08

- SearchBar
    - 新增 customResMsg slot issue #53

- CityPicker
    - 修复右侧两字导航点击无反应问题 issue #52

- List
    - 新增 list-style api issue #51

- 修复扩展组件主题色无法改变改变问题 issue #50

- Input
    - 修复在输入框页面异常滚动到底部问题 issue #49

- ImageUpload
    - 修复 exif-js 包语法在严格模式下报错 n is not defined 问题
    - 修复某些安卓机型选择相同图片不触发 change 事件上传的问题

- ImageViewer
    - 修复图片缩放失败问题

- docs
    - 增加主题颜色计算规则表文档


### [4.4.1](http://git.souche.com/souche-ui/som-ui/compare/v4.4.0...v4.4.1)
2019-07-26
- Picker
    - 修复多列联动示例
    - 多列 change 事件增加改动列下标参数

- filter
    - 点击单选筛选项时触发 on-item-click 事件通知

- ImageViewer
    - 修复在安卓系统无法长按保存的问题

- CarPicker
    - 新增 hideSideGroup 方法

- Select
    - 支持选中值重置为空

### [4.4.0](http://git.souche.com/souche-ui/som-ui/compare/v4.3.1...v4.4.0)
2019-07-17

- 新增扩展组件
    - VideoUpload
    - VideoPlay

- ImageUpload
    - 新增 cover / name / deletable / agreement 属性 #39
    - 修复图片方向旋转问题  #40
    - 修复图片删除乱序问题 

- Tag
    - 新增 colum 参数 #41

- Toast
    - 新增 top 属性, 支持自定义显示位置  #34

- CarPicker
    - 新增车型过滤 slot  #27
    - 修复绑定默认值出错问题 
    - 支持外部方法获取数据

- CityPicker
    - 修复默认值渲染不正确问题  #28
    - 修复多省份多城市再次打开选中状态消失问题  #29

- Table
    - 修复超过两行不显示 tooltip 问题 #42

- ScrollRefresh
    - 修复横向滚动触发下拉加载问题 #43
    - 新增 max-pull-down 属性， 防止下拉高度过长 #43

- Sticky
    - 修复安卓高度塌陷问题  #33

- Calendar
    - 新增 past 属性，支持选择过去时间模式  #38

- 优化
    - 优化扩展组件打包，移除 oss-image / oss-upload / http-request 的打包
    - 增加 npm 安装统计


### [4.3.1](http://git.souche.com/souche-ui/som-ui/compare/v4.3.0...v4.3.1)
2019-06-06
- 新增扩展组件

    - Table

### [4.3.0](http://git.souche.com/souche-ui/som-ui/compare/v4.2.0...v4.3.0)
2019-06-06
- Rate
    - 支持小数点评分显示（罗宇丽）

- Input
    - 修复小米手机使用 mask 属性光标错位问题 issue #25
    - 必填样式修改，输入框前增加 `*` 标记 issue #21

- CarPicker
    - 修复车系在没有分组时 label 显示为 undefinde 问题，默认值改为车系 issue #24

- CityPicker
    - 修复城市组件直辖市返回到市级 code issue #23

- Filter
    - 修复多选时选项值覆盖问题 issue #20

- ImageUpload
    - 修复图片在支付宝多张上传时显示同一张图片问题 （韩永斌）

- Styles
    - 增加扩展包样式默认变量， 修复安卓 5.0 版本不支持 css4 变量值 bug issue #22

- 优化
    - 升级单测配置，接入 vue-test-utils 工具， 完善单测，单测覆盖率提升到 69.73%



### [4.2.0](http://git.souche.com/souche-ui/som-ui/compare/v4.1.1...v4.2.0)
2019-05-21

- 新增组件
    - Rate

- Sticky
    - 解决高度坍塌问题 issue #14

- Modal 
    - content 支持渲染 html issue #13
    - 新增 cancle-style / confirm-style, 解决取消和确认按钮样式无法单独设定样式 bug (沈德远)

- Select 
    - 增加 picker-title confirm-button-text cancel-button-text label right default 属性 issue #12

- Icons
    - 新增 directory 图标

- IndexList
    - 修复 list-title 样式 issue #19
    - 修复右滑导航栏事件报错 issue #18

- CityPicker
    - 城市选择组件支持外部方法获取数据 (周庆)

- ImageUpload 
    - 新增 quality 参数, 解决低版本toBlob兼容问题,更改图片格式为JPEG (韩永斌)

- 引用颜色变量的 background 使用 background-color 属性, 解决 postcss 插件不打包出常量值问题 issue #16


### [4.1.1](http://git.souche.com/souche-ui/som-ui/compare/v4.1.0...v4.1.1)
2019-04-21

- Select 
    - 修复因满足 select 在list 中 labelWidth 的继承导致原本的 input 组件继承失败的问题 (韩永斌)
    - options 新增空数组默认值， 修复因初始值为空的报错问题 (韩永斌)

- Icons
    - 新增 more / edit / heart 图标

- ImageUpload 
    - 图片压缩算法优化(韩永斌)

### [4.1.0](http://git.souche.com/souche-ui/som-ui/compare/v4.0.10...v4.1.0)
2019-04-19

- 新增组件
    - Select

- Tips 
    - 修复出现位置计算不正确问题（tips position 由 fixed 改为了 absolute) issue #10


### [4.0.10](http://git.souche.com/souche-ui/som-ui/compare/v4.0.9...v4.0.10)
2019-04-12

- Icon 新增 help 图标

- Carousel
    - 增加 touchcancel 监听,解决旧版浏览器滑动卡顿问题 issue #5

- Tips 
    - guide 模式支持自定义 content slot  issue #9

- ScrollRefresh
    - 新增 prevent-default 参数, 阻止自动调用下拉加载方法 issue #8


### [4.0.9](http://git.souche.com/souche-ui/som-ui/compare/v4.0.8...v4.0.9)
2019-03-29

- 支持不配置别名能正常使用包引入[4ee57fd](http://git.souche.com/souche-ui/som-ui/commit/4ee57fd) （wuyunzhu@souche.com）

- Loading 
    - 修复全局加载样式居中. issue #6

- Checkbox
    - fix(checkbox): fix no use nextTick in checkbox group [debaf4b](http://git.souche.com/souche-ui/som-ui/commit/debaf4b) （wuyunzhu@souche.com）

- ShopSelect
    - fix: 修复 shop-select 因引用赋值引发的数据联动改变问题 [75d5437](http://git.souche.com/souche-ui/som-ui/commit/75d5437) （wuyunzhu@souche.com）
    
- Popup
    - feat(popup): add mask-class api [f892ec2](http://git.souche.com/souche-ui/som-ui/commit/f892ec2) （wuyunzhu@souche.com） 

-  Modal
    - fix: optimization modal style and add btn-style api. issue #3

- Reset 
    - 修复 reset.css 样式 box-sizing 为 border-box 

- ListItem
    - 优化 p 行高被覆盖问题 issue #4


### [4.0.8](http://git.souche.com/souche-ui/som-ui/compare/v4.0.7...v4.0.8)
2019-03-12

- Popup 
    - 修复点击 tap-highlight-color 样式未添加 -webkit- 前缀不生效

- Toast 
    - 修复有 icon 时样式不居中问题

- data-picker 
    - 补全 picker 列年月日单位以正确渲染绑定值

- Range
    - 修复 range 图片打包未打入问题[206991c](http://git.souche.com/souche-ui/som-ui/commit/206991c) （wuyunzhu@souche.com） 


### [4.0.7](http://git.souche.com/souche-ui/som-ui/compare/v4.0.6...v4.0.7)
2019-03-08

- 抽离系统 border / shadow 变量, 以支持自定义 [c1369f1](http://git.souche.com/souche-ui/som-ui/commit/c1369f1) （wuyunzhu@souche.com）

- Loading 增加 fullsreen 属性 [736b41f](http://git.souche.com/souche-ui/som-ui/commit/736b41f) （wuyunzhu@souche.com） 


### [4.0.6](http://git.souche.com/souche-ui/som-ui/compare/v4.0.5...v4.0.6)
2019-02-22

- Calendar 
    - 修复不能选择包含禁用日期的时间段对外部赋值时产生的影响 [a2bcc4a](http://git.souche.com/souche-ui/som-ui/commit/a2bcc4a) （wuyunzhu@souche.com）

- Progress
    - 修复进度条背景色 、节点色不正确的样式问题

- Toast
    - 修改样式，支持超过十个字情况换行


### [4.0.5](http://git.souche.com/souche-ui/som-ui/compare/v4.0.4...v4.0.5)
2019-02-20

- Sticky
    - 修复在安卓系统下 js 手动实现 sticky 定位模式不兼容问题 [a65ce78](http://git.souche.com/souche-ui/som-ui/commit/a65ce78) （wuyunzhu@souche.com）

- Progress
    - 进度条支持自定义进度文案 (陈子瑜)

- ShopSelect 
    - 修复门店选择 on-change 事件报错问题 [ec2d102](http://git.souche.com/souche-ui/som-ui/commit/ec2d102) （wuyunzhu@souche.com） 
    - 修复单城市多选下门店显示状态未清除问题 [9a55027](http://git.souche.com/souche-ui/som-ui/commit/9a55027) （wuyunzhu@souche.com） 

- 增加组件文档旧版本入口

- ScrollRefresh
    - 修改上拉和下拉时的动画样式[b324d91](http://git.souche.com/souche-ui/som-ui/commit/b324d91)


### [4.0.4](http://git.souche.com/souche-ui/som-ui/compare/v4.0.3...v4.0.4)
2019-01-17

- ShopSelect
    - 支持参数动态改变
    - on-change 单选或单城市多选时会传出 city 参数 
    
- 完善 CarPicker / CityPicker 文档

### [4.0.3](http://git.souche.com/souche-ui/som-ui/compare/v4.0.2...v4.0.3)
2019-01-15

- ShopSelect 
    - 数据字段名支持可配置 [a1bf426](http://git.souche.com/souche-ui/som-ui/commit/a1bf426) （wuyunzhu@souche.com） 


### [4.0.2](http://git.souche.com/souche-ui/som-ui/compare/v4.0.1...v4.0.2)
2019-01-11

- 组件文档支持自由换肤

- Tips
    - 修复点击外部关闭 tips 不灵敏问题

### [4.0.1](http://git.souche.com/souche-ui/som-ui/compare/v4.0.0...v4.0.1)
2019-01-09

- Toast
    -  支持提示文字 html 化 [8bf53ec](http://git.souche.com/souche-ui/som-ui/commit/8bf53ec) （wuyunzhu@souche.com）
    -  修复 Toast / Loading / Modal 插件引用路径问题，解决因引错 src 路径导致语法未经babel 转义而在低端浏览器报错问题


### [4.0.0](http://git.souche.com/souche-ui/som-ui/compare/v3.6.3...v4.0.0)
2019-01-04

本版本为 h5 组件统一版，合并了Sob 与 Som 组件库，是一次不兼容的版本更新

**基础组件修改**

- 新增以下组件
    WingBank / WhiteSpace / Flexbox / Tabs / TabBar / SegmentedControl / NavBar / Picker / Radio / Checkbox / DatePicker
    / DateTimePicker / TimeRange / Textarea / SearchBar / Badge / Flow / Accordion / Popup / Icon / List / Tag / Progress / Dialog / Modal / Tips / IndexList / Filter / Result 

- 不兼容更新组件
    Loading / Toast / ActionSheet / Button / Switch / Input

- 因两端重合而废弃掉的组件(在本版本中不再包含)
    FormGroup / Confirm / ActionTip / Alert / BlankPage

**扩展组件修改**

- 新增以下扩展组件
    Calendar / ImageUpload / Carousel / ShopSelect

- 废弃扩展组件
    CarSelectorC / CarSelectorB / CitySelectorC / CitySelectorB / picker(请用新基础组件) / DatePicker (请用新基础组件) / Tooltip (请用新基础组件 tips)

- ImageViewer 
    - 修复多次点击初始化多个展览馆问题
    - 解决图片过大调用  oss-image 处理失败问题

- 组件库统一换肤, 定制主题接入 lemon 换肤方案


### [3.6.3](http://git.souche.com/souche-ui/som-ui/compare/v3.6.2...v3.6.3)
2018-12-18

- 修改 postcss 配置，转换样式语法兼容安卓端至 4.4


### [3.6.1](http://git.souche.com/souche-ui/som-ui/compare/v3.6.0...v3.6.1)
2018-11-30

- feat: 兼容selector-b和car-picker使用一套子组件 [5fdac21](http://git.souche.com/souche-ui/som-ui/commit/5fdac21) （xuyue@hunktimes.com）
- feat: 车系选择器优化，文档补充 [6ac136b](http://git.souche.com/souche-ui/som-ui/commit/6ac136b) （xuyue@hunktimes.com） 


### [3.6.0](http://git.souche.com/souche-ui/som-ui/compare/v3.5.18...v3.6.0)
2018-11-27

- feat: 城市选择器实现 [506898a](http://git.souche.com/souche-ui/som-ui/commit/506898a) （xuyue@hunktimes.com） 


### [3.5.16](http://git.souche.com/souche-ui/som-ui/compare/v3.5.15...v3.5.16)
2018-11-02

- feat: toast font-size 改为16px [c2110dd](http://git.souche.com/souche-ui/som-ui/commit/c2110dd) （434485492@qq.com） 


### [3.5.14](http://git.souche.com/souche-ui/som-ui/compare/v3.5.13...v3.5.14)
2018-10-24

- feat: 解决冲突 [468afa8](http://git.souche.com/souche-ui/som-ui/commit/468afa8) （admin@admindeMacBook-Air-4.local）
- feat: 增加picker组件及时间组件更多案例 [c748e39](http://git.souche.com/souche-ui/som-ui/commit/c748e39) （admin@admindeMacBook-Air-4.local）
- feat: 日期组件注释 [7c5783c](http://git.souche.com/souche-ui/som-ui/commit/7c5783c) （admin@admindeMacBook-Air-4.local） 


### [3.5.12](http://git.souche.com/souche-ui/som-ui/compare/v3.5.11...v3.5.12)

2018-10-09
- feat: 移除播放元素 [838ea02](http://git.souche.com/souche-ui/som-ui/commit/838ea02) （wangkuan@souche.com）
- feat: 视频播放增加自动播放功能 [bdfb1ef](http://git.souche.com/souche-ui/som-ui/commit/bdfb1ef) （wangkuan@souche.com） 


### [3.5.9](http://git.souche.com/souche-ui/som-ui/compare/v3.5.8...v3.5.9)
2018-08-30

- feat: imageViewer 新增 slot 属性 [52e780d](http://git.souche.com/souche-ui/som-ui/commit/52e780d) （wuyunzhu@souche.com） 


### [3.5.8](http://git.souche.com/souche-ui/som-ui/compare/v3.5.7...v3.5.8)
2018-08-23

- feat: 更改scroll-refresh 文档 [9d1851e](http://git.souche.com/souche-ui/som-ui/commit/9d1851e) （434485492@qq.com） 


### [3.5.3](http://git.souche.com/souche-ui/som-ui/compare/v3.5.2...v3.5.3)
2018-07-31

- fix(image-viewer): 修复 tab 无法切换 [6f518e7](http://git.souche.com/souche-ui/som-ui/commit/6f518e7) （wuyunzhu@souche.com） 


### [3.4.11](http://git.souche.com/souche-ui/som-ui/compare/v3.4.9...v3.4.11)
2018-07-12

- fix(imageViewer): 修复 指令版不能动态更新问题 [5b03a4e](http://git.souche.com/souche-ui/som-ui/commit/5b03a4e) （wuyunzhu@souche.com） 

### [3.4.8](http://git.souche.com/souche-ui/som-ui/compare/v3.4.7...v3.4.8)
2018-06-04

- fix: 修复图片参数动态变化更新问题 [2c076ab](http://git.souche.com/souche-ui/som-ui/commit/2c076ab) （wuyunzhu@souche.com） 


### [3.4.6](http://git.souche.com/souche-ui/som-ui/compare/v3.4.5...v3.4.6)
2018-06-01

- feat: 日期初始时间是否禁止 [75d85a0](http://git.souche.com/souche-ui/som-ui/commit/75d85a0) （leng_bw@163.com） 


### [3.4.5](http://git.souche.com/souche-ui/som-ui/compare/v3.4.4...v3.4.5)
2018-05-31

- feat: 增加时分文档 [11280e3](http://git.souche.com/souche-ui/som-ui/commit/11280e3) （leng_bw@163.com） 

### [3.4.4](http://git.souche.com/souche-ui/som-ui/compare/v3.4.3...v3.4.4)
2018-05-30

- feat: 增加日期不能选文档 [aa1e622](http://git.souche.com/souche-ui/som-ui/commit/aa1e622) （leng_bw@163.com） 

### [3.4.2](http://git.souche.com/souche-ui/som-ui/compare/v3.4.0...v3.4.2)
2018-05-21

- feat: 日期组件增加不能选样式 [c1aa681](http://git.souche.com/souche-ui/som-ui/commit/c1aa681) （leng_bw@163.com） 
- feat: city-selector-c 支持全省 [8761267](http://git.souche.com/souche-ui/som-ui/commit/8761267) （434485492@qq.com） 



### [3.3.10](http://git.souche.com/souche-ui/som-ui/compare/v3.3.9...v3.3.10)
2018-05-16

- feat: confrim 增加点击蒙层事件 [566744c](http://git.souche.com/souche-ui/som-ui/commit/566744c) （434485492@qq.com） 


### [3.3.9](http://git.souche.com/souche-ui/som-ui/compare/v3.3.8...v3.3.9)
2018-05-14

- feat: add-showAllProvince [4d7d8c2](http://git.souche.com/souche-ui/som-ui/commit/4d7d8c2) （434485492@qq.com） 


### [3.3.8](http://git.souche.com/souche-ui/som-ui/compare/v3.3.7...v3.3.8)
2018-05-14

- feat: 写死直辖市的cityCode [06fcee3](http://git.souche.com/souche-ui/som-ui/commit/06fcee3) （434485492@qq.com） 


### [3.3.6](http://git.souche.com/souche-ui/som-ui/compare/v3.3.5...v3.3.6)
2018-04-17

- fix: 修复comfirm 颜色bug [0c923ac](http://git.souche.com/souche-ui/som-ui/commit/0c923ac) （434485492@qq.com） 


### [3.3.5](http://git.souche.com/souche-ui/som-ui/compare/v3.3.4...v3.3.5)
2018-04-16

- feat: date-picker命名调整 [171579f](http://git.souche.com/souche-ui/som-ui/commit/171579f) （leng_bw@163.com） 


### [3.3.4](http://git.souche.com/souche-ui/som-ui/compare/v3.3.3...v3.3.4)
2018-04-13

- fix(image-viewer): 修改显示图片下标不准确问题 [01378cd](http://git.souche.com/souche-ui/som-ui/commit/01378cd) （wuyunzhu@souche.com） 


### [3.3.1](http://git.souche.com/souche-ui/som-ui/compare/v3.3.0...v3.3.1)
2018-03-28

- datePicker
    - feat: 时间组件分类 [0e1c867](http://git.souche.com/souche-ui/som-ui/commit/0e1c867) （leng_bw@163.com）
    - feat: 时间组件 [4c7782b](http://git.souche.com/souche-ui/som-ui/commit/4c7782b) （leng_bw@163.com）
    - feat: 日期选择组件 [eea0f35](http://git.souche.com/souche-ui/som-ui/commit/eea0f35) （leng_bw@163.com）
    - fix: datepicker调整 [db8427d](http://git.souche.com/souche-ui/som-ui/commit/db8427d) （leng_bw@163.com） 


### [3.3.0](http://git.souche.com/souche-ui/som-ui/compare/v3.2.1...v3.3.0)
2018-03-24

- 新增扩展组件
    - datePicker

### [3.2.1](http://git.souche.com/souche-ui/som-ui/compare/v3.2.0...v3.2.1)
2018-03-21

- feat: 开启eslitn [091b909](http://git.souche.com/souche-ui/som-ui/commit/091b909) （wangkuan@souche.com）
- feat: 视频播放支持局部播放 [0abe211](http://git.souche.com/souche-ui/som-ui/commit/0abe211) （wangkuan@souche.com） 


### [3.2.0](http://git.souche.com/souche-ui/som-ui/compare/v3.1.5...v3.2.0)
2018-03-16

- feat: selector-c 二级菜单滑动优化 [3eafe07](http://git.souche.com/souche-ui/som-ui/commit/3eafe07) （434485492@qq.com）
- ref: 修改tooltip属性 primaryColor => theme [3d06ec7](http://git.souche.com/souche-ui/som-ui/commit/3d06ec7) （434485492@qq.com）
- ref: 修改 tooltip 分组 [f8646c0](http://git.souche.com/souche-ui/som-ui/commit/f8646c0) （434485492@qq.com）
- feat: 新增扩展组件 tooltip [e12e9be](http://git.souche.com/souche-ui/som-ui/commit/e12e9be) （434485492@qq.com）
- feat: 新增扩展组件 tooltip [062f0fe](http://git.souche.com/souche-ui/som-ui/commit/062f0fe) （434485492@qq.com） 

### [3.1.2](http://git.souche.com/souche-ui/som-ui/compare/v3.1.1...v3.1.2)
2018-03-07

- feat: toast UI更新  
- selector-c 增加滑动 [db1c9e7](http://git.souche.com/souche-ui/som-ui/commit/db1c9e7) （434485492@qq.com） 


### [3.0.6](http://git.souche.com/souche-ui/som-ui/compare/v3.0.5...v3.0.6)
2018-03-05

- ref: 修改tower引用 [149b0ee](http://git.souche.com/souche-ui/som-ui/commit/149b0ee) （434485492@qq.com）
- feat: 增加视频播放组件 [f2bd1c2](http://git.souche.com/souche-ui/som-ui/commit/f2bd1c2) （wangkuan@souche.com） 


### [3.0.5](http://git.souche.com/souche-ui/som-ui/compare/v3.0.4...v3.0.5)
2018-03-02

- fix: 删除无关文件 [a4fbd06](http://git.souche.com/souche-ui/som-ui/commit/a4fbd06) （huahuachen99@163.com）
- fix: slider一张图交互修改 [927626e](http://git.souche.com/souche-ui/som-ui/commit/927626e) （huahuachen99@163.com） 


### [3.0.4](http://git.souche.com/souche-ui/som-ui/compare/v3.0.2...v3.0.4)
2018-02-26

- feat: add init [bfca0fb](http://git.souche.com/souche-ui/som-ui/commit/bfca0fb) （wangkuan@souche.com）


### [3.0.2](http://git.souche.com/souche-ui/som-ui/compare/v3.0.1...v3.0.2)
2018-02-12

- 新增组件
    - Input / FormGroup

### [3.0.1](http://git.souche.com/souche-ui/som-ui/compare/v3.0.0...v3.0.1)
2018-02-09

- 迁移 ScrollRefresh 为扩展组件

### [3.0.0](http://git.souche.com/souche-ui/som-ui/compare/v2.18.0...v3.0.0)
2018-02-09

**更改组件目录结构，有业务逻辑组件以及大文件转为扩展组件单独安装**

- 以下组件迁移为扩展组件
    - ActionPicker / Slider / CitySelectorC / CarSelectorC / SelectorItem

- 新增扩展组件
    - ImageViewer / CitySelectorB / CarSelectorB 

### [2.18.0](http://git.souche.com/souche-ui/som-ui/compare/v2.17.3...v2.18.0)
2018-02-01

- Loading Toast 支持单独引入


### [2.17.3](http://git.souche.com/souche-ui/som-ui/compare/v2.17.2...v2.17.3)
2018-01-23

- feat: 轮播图增加大的样式属性 [8a99415](http://git.souche.com/souche-ui/som-ui/commit/8a99415) （wangkuan@souche.com） 


### [2.17.2](http://git.souche.com/souche-ui/som-ui/compare/v2.17.1...v2.17.2)
2018-01-19

- feat: 选择城市，全国可控制 [e2a2d3f](http://git.souche.com/souche-ui/som-ui/commit/e2a2d3f) （wangkuan@souche.com） 


### [2.17.1](http://git.souche.com/souche-ui/som-ui/compare/v2.17.0...v2.17.1)
2018-01-11

- style: 修改样式 [f68bd8d](http://git.souche.com/souche-ui/som-ui/commit/f68bd8d) （huahuachen99@163.com） 

### [2.17.0](http://git.souche.com/souche-ui/som-ui/compare/v2.16.1...v2.17.0)
2018-01-11

- 新增组件
    - Slider

### [2.16.1](http://git.souche.com/souche-ui/som-ui/compare/v2.15.5...v2.16.1)
2017-12-26

- fix: 修复calc bug [0fc9d1c](http://git.souche.com/souche-ui/som-ui/commit/0fc9d1c) （434485492@qq.com） 
- fix: 修复超出回弹 和按钮互换 [d3d8b05](http://git.souche.com/souche-ui/som-ui/commit/d3d8b05) （434485492@qq.com）
- fix: 修复按钮位置精度问题 [ac0b804](http://git.souche.com/souche-ui/som-ui/commit/ac0b804) （434485492@qq.com） 

### [2.15.5](http://git.souche.com/souche-ui/som-ui/compare/v2.15.4...v2.15.5)
2017-12-26

- feat: range组件优化 [80071f2](http://git.souche.com/souche-ui/som-ui/commit/80071f2) （434485492@qq.com）
- build: use `clog` to generate the changelog [a25ef60](http://git.souche.com/souche-ui/som-ui/commit/a25ef60) （chuangker@foxmail.com） 


### [2.15.4](http://git.souche.com/souche-ui/som-ui/compare/v2.15.3...v2.15.4)
2017-12-21

- Range组件添加下标提示颜色 属性 [97ec779](http://git.souche.com/souche-ui/som-ui/commit/97ec779) （434485492@qq.com）

### [2.15.3](http://git.souche.com/souche-ui/som-ui/compare/v2.15.2...v2.15.3)
2017-12-18

- fix: vue2.5.11 验证props require 报错 [e806a50](http://git.souche.com/souche-ui/som-ui/commit/e806a50) （434485492@qq.com） 
 

### [2.15.1](http://git.souche.com/souche-ui/som-ui/compare/v2.15.0...v2.15.1)
2017-12-15

- 城市、品牌选择组件增加自定义基准颜色api [36fc82e](http://git.souche.com/souche-ui/som-ui/commit/36fc82e) （434485492@qq.com） 


### [2.15.0](http://git.souche.com/souche-ui/som-ui/compare/v2.14.7...v2.15.0)
2017-12-14

- 新增组件
    - ActionPicker

### [2.14.7](http://git.souche.com/souche-ui/som-ui/compare/v2.14.6...v2.14.7)
2017-12-11

- ScrollRefresh
    - styles: up 区域 margin 改 padding [16edcdf](http://git.souche.com/souche-ui/som-ui/commit/16edcdf) （caitianqi@souche.com）

### [2.14.6](http://git.souche.com/souche-ui/som-ui/compare/v2.14.1...v2.14.6)
2017-12-08

- Button 新增 delayTime 属性[60f6d98](http://git.souche.com/souche-ui/som-ui/commit/60f6d98) （wangkuan@souche.com） 

- Confirm
    - 修改confirm事件 [64d6990](http://git.souche.com/souche-ui/som-ui/commit/64d6990) （434485492@qq.com） 

- Loading
    - 修复 loading 组件引入动态加载图标方式[35ee8c0](http://git.souche.com/souche-ui/som-ui/commit/35ee8c0) （wangkuan@souche.com） 
    - 更新loading文档 [c05fd6b](http://git.souche.com/souche-ui/som-ui/commit/c05fd6b) （434485492@qq.com）
    - ref: 删除自定义loading图案 [70f314e](http://git.souche.com/souche-ui/som-ui/commit/70f314e) （434485492@qq.com）

- BlankPage
    - 删除空白页文字样式 [993f23b](http://git.souche.com/souche-ui/som-ui/commit/993f23b) （434485492@qq.com） 


### [2.14.1](http://git.souche.com/souche-ui/som-ui/compare/v2.14.0...v2.14.1)
2017-12-07

- 新增组件
    - Switch / Confirm / Loading

- BlankPage 空白页去除背景色 [af49856](http://git.souche.com/souche-ui/som-ui/commit/af49856)（434485492@qq.com）

### [2.14.0](http://git.souche.com/souche-ui/som-ui/compare/v2.13.0...v2.14.0)
2017-12-06

- 新增组件 
    - Button


### [2.13.0](http://git.souche.com/souche-ui/som-ui/compare/v2.12.6...v2.13.0)
2017-12-06

- 新增组件 
    - BlankPage

### [2.12.6](http://git.souche.com/souche-ui/som-ui/compare/v2.12.5...v2.12.6)
2017-12-06

- Range 
    -修复空标签渲染问题 [387c6b0](http://git.souche.com/souche-ui/som-ui/commit/387c6b0) （434485492@qq.com） 


### [2.12.5](http://git.souche.com/souche-ui/som-ui/compare/v2.12.0...v2.12.5)
2017-12-05
- ScrollRefresh
    - 上拉加载增加无数据试的提示区域 [575cfab](http://git.souche.com/souche-ui/som-ui/commit/575cfab) （caitianqi@souche.com） 
    - feat: 上拉组件增加reset方法 [b2fdcfe](http://git.souche.com/souche-ui/som-ui/commit/b2fdcfe) （caitianqi@souche.com）
    - fix: 上拉下拉同时存在时会冲突 [bd3d1a8](http://git.souche.com/souche-ui/som-ui/commit/bd3d1a8) （caitianqi@souche.com） 
    - fix: 图片上传到服务器 [2bf0495](http://git.souche.com/souche-ui/som-ui/commit/2bf0495) （caitianqi@souche.com）
    - fix: 当下拉刷新禁用时，页面不滑动 [0364ed9](http://git.souche.com/souche-ui/som-ui/commit/0364ed9) （caitianqi@souche.com） 
 

### [2.12.0](http://git.souche.com/souche-ui/som-ui/compare/v2.11.0...v2.12.0)
2017-12-04

- Range 组件优化
    - 修改range文档 [1f7ead4](http://git.souche.com/souche-ui/som-ui/commit/1f7ead4) （434485492@qq.com）
    - 添加range [c2a5b95](http://git.souche.com/souche-ui/som-ui/commit/c2a5b95) （434485492@qq.com） 



### [2.10.3](http://git.souche.com/souche-ui/som-ui/compare/v2.10.2...v2.10.3)
2017-11-23

- 修复城市与车辆选择器在 iOS Safari 最后一行被浏览器盖住不能选择 [24d17d7](http://git.souche.com/souche-ui/som-ui/commit/24d17d7) （434485492@qq.com） 
  

### [2.10.1](http://git.souche.com/souche-ui/som-ui/compare/v2.10.0...v2.10.1)
2017-11-21

-  修复toast引用错误 [f7fa297](http://git.souche.com/souche-ui/som-ui/commit/f7fa297) （2424880409@qq.com） 

### [2.10.0](http://git.souche.com/souche-ui/som-ui/compare/v2.9.6...v2.10.0)
2017-11-21

- CitySelector
    - 修复省份多选时，预选中全国时，没有选中全国问题 [3236d4d](http://git.souche.com/souche-ui/som-ui/commit/3236d4d) （xuyue@hunktimes.com）
    - 修改说明文档选中返回数据格式 [1bdfced](http://git.souche.com/souche-ui/som-ui/commit/1bdfced) （xuyue@hunktimes.com）
    - 代码重构,记录城市的父省份code [4283342](http://git.souche.com/souche-ui/som-ui/commit/4283342) （xuyue@hunktimes.com） 


### [2.9.6](http://git.souche.com/souche-ui/som-ui/compare/v2.9.5...v2.9.6)
2017-11-18

- 规范 css 命名 [6779f49](http://git.souche.com/souche-ui/som-ui/commit/6779f49) （434485492@qq.com）

- CarSelector
    - 不限品牌是否显示可配置 （434485492@qq.com）
    - 修复车辆选择字母列表重复 （434485492@qq.com）
    - 删除无用代码 （434485492@qq.com）

- CitySelector
    - 不限品牌是否显示可配置 （434485492@qq.com）

- CarSelector / CitySelector
    - 修复 CitySelector 与 CarSelector iOS 微信滚动问题 [a632b0b](http://git.souche.com/souche-ui/som-ui/commit/a632b0b) （434485492@qq.com） 
    - 兼容低版本浏览器 [2bcd874](http://git.souche.com/souche-ui/som-ui/commit/2bcd874) （434485492@qq.com） 
    - 修复带标题的滑动问题 [0199249](http://git.souche.com/souche-ui/som-ui/commit/0199249) （434485492@qq.com） 


### [2.9.1](http://git.souche.com/souche-ui/som-ui/compare/v2.8.3...v2.9.1)
2017-11-16

- 新增 Sticky 组件
- 修复 Sticky 组件示例引入错误 [531488c](http://git.souche.com/souche-ui/som-ui/commit/531488c) （wangkuan@souche.com） 
 
### [2.8.3](http://git.souche.com/souche-ui/som-ui/compare/v2.7.0...v2.8.3)
2017-11-14

- CitySelector / CarSelector
    - 更改文件名
    - 抽离公用 selector-item 组件
    - 请求统一使用@souche-f2e/http-request
    - 城市选择支持自定义数据源
    - fix: 兼容性 [22518cb](http://git.souche.com/souche-ui/som-ui/commit/22518cb) （434485492@qq.com） 
    - fix: 修复二级菜单滚动bug [f31aca0](http://git.souche.com/souche-ui/som-ui/commit/f31aca0) （434485492@qq.com）
    - 修复二级菜单滚动bug [dcee9c8](http://git.souche.com/souche-ui/som-ui/commit/dcee9c8) （434485492@qq.com）  


### [2.7.0](http://git.souche.com/souche-ui/som-ui/compare/v2.6.0...v2.7.0)
2017-11-14

- 新增组件 ScrollRefresh 

### [2.6.0](http://git.souche.com/souche-ui/som-ui/compare/v2.4.1...v2.6.0)
2017-11-13

- 新增组件 NoticeBar / ActionSheet

### [2.4.1](http://git.souche.com/souche-ui/som-ui/compare/v2.3.2...v2.4.1)
2017-10-31

- 新增组件 Range


### [2.3.2](http://git.souche.com/souche-ui/som-ui/compare/v2.2.3...v2.3.2)
2017-10-30

- 新增组件 
    - Toast

- feat: 修改toast命名bug [458ddc0](http://git.souche.com/souche-ui/som-ui/commit/458ddc0) （wangkuan@souche.com） 


### [2.2.3](http://git.souche.com/souche-ui/som-ui/compare/v2.1.0...v2.2.3)
2017-10-26

- CarSelector
    - 支持二级菜单
    - 修复滑动取消后选中错误
    - CarSelector 修改属性名 [c838e78](http://git.souche.com/souche-ui/som-ui/commit/c838e78) （jianglinghao@souche.com）
    - CarSelector 修复弹框动效 [9e7b4f6](http://git.souche.com/souche-ui/som-ui/commit/9e7b4f6) （jianglinghao@souche.com） 

### [2.1.0](http://git.souche.com/souche-ui/som-ui/compare/v2.0.0...v2.1.0)
2017-10-19

- 新增组件 CitySelector / CarSelector


### [2.0.0](http://git.souche.com/souche-ui/som-ui/compare/v0.1.0...v2.0.0)
2017-09-25

- 新增组件 AnimateNumber


### 0.1.0
2017-07-03

- 0.1.0 发布

- 新增组件
    - CarPicker / AreaPicker
