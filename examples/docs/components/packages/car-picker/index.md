## CarPicker car-picker

### 代码演示

::: demo car-picker
car-picker
:::

### API

#### CarPicker
| 参数 | 说明 | 类型| 可选值 | 是否必填 | 默认值 |
| ---- | ----- | ------------- | ----------- | -------- | -- |
| scene| 选择器场景选择，批量设置选择器属性 | number/string | 1:单品牌<br/>2:单品牌，单车系<br/>3：单品牌，单车系，单车型<br/>4:单品牌，单车系，多车型，同时允许选择到车系就结束选择<br/>5：单品牌，多车系 <br/> 6: 多品牌<br/>7: 多品牌，多车系<br/>8:多品牌，多车系，多车型 | 否  | 1 |
| brandDataUrl  | 品牌数据获取 url, 也可自行定义获取数据的方法，请封装为 promise | string/ function | —  | 否  | https://car-model.souche.com/brand/brands.jsonp  |
| seriesDataUrl | 车系数据获取 url; url 参数名，brand_code (允许自定义参数字段，参考“自定义URL参数”)。 也可自行定义获取数据的方法，请封装为 promise | string / function | — | 否  | https://car-model.souche.com/series/getSeriesByBrand.jsonp |
| modelDataUrl | 车型数据获取 url; url 参数名，series_code(允许自定义参数字段，参考“自定义URL参数”), 也可自行定义获取数据的方法，请封装为 promise| string / function | — | 否 | https://car-model.souche.com/model/getModelBySeries.jsonp |
| activedValue  | 预选择的数据，[格式具体说明](#/packages/car-picker#yu-xuan-ze-can-shu) | array | —  | 否  | —  | — | — | —  |
| modelSelectText | 在可选到车系和可选到车型时，选择车型的名称| string| — | 否  | 选车型 |
| showAlphaToast| 点击字母表的字母时，是否在页面中间显示字母的toast| Boolean  | — | 否  | true|
| showUnlimitBrand| 品牌单选的情况下，配置显示不限品牌选项；scene为其他值时设置无效； | Boolean  | — |
| showUnlimitSeries  | 车系单选的情况下，配置显示不限车系选项；scene为其他值时设置无效； | Boolean  | — | 否  | true|
| showUnlimitModel| 车型单选的情况下，配置显示不限车型选项；scene为其他值时设置无效； | Boolean  | — | 否  | true|
| labelActivedColor  | 选项被选中时的颜色 | string| — | 否  | #FF571A|
| confirmButtonColor | 多选情况下，底部确认按钮的颜色| string| — | 否  | #FF571A|
| filterModelMethod | 当你需要过滤车型展示时，传入的过滤车型条件的函数 | function | —  | —  | —  |

#### CarPicker Events
| 事件名| 说明 | 返回值 |
| --- | ------------ | ---- |
| onSelected | 选择完成事件 | 选中的品牌，系列或者车型数据 |
| onSelectedBrand | 选中品牌事件 | 选中的品牌数据 |
| on-series-click | 点击车系事件, 仅在它不是最后一个选项时触发 | 点击的车系数据 |

#### 组件中的部分方法说明
| 方法名  | 说明 | 方法定义 | 参数格式 | 返回值 |
| --- | ------------ | ---- | ----------- | ------ |
| openSeriesSection | 显示车型选择器的车系选择栏 | Function(brandObj) | {code: 'brand-12', name: '阿尔法罗密欧'} | 无 |
| filterModelData | 过滤显示车型的方法，传入每一个车型项 item 给你的 filterModelMethod 进行过滤。 | —  | —  | —  |
| hideSideGroup | 手动隐藏车型选择子弹窗 | —  | —  | —  |

#### 组件slot
| slot名称 | 说明 |
| -------- | ------ |
| default | 在第一级页面展示我的历史等模块，使用 [selector-item](#/packages/selector-item) 子组件，可以为该部分内容定义索引 |
| modelFilter | 在车型选择页面中自定义筛选项显示 | 
| loading | 在第一级页面数据请求到前展示loading，位于组件正中间位置 | 

### 贡献者
| 类型 | 参与者 |
|---------- |-------------------------------- |
| 维护者 | 许悦 |
| 设计师 | 王菲菲 |

#### 自定义URL参数

自定义车系传参字段方式（车型自定义请求参数参考此配置方式）：
 
默认情况下：url设置为：https://car-model.souche.com/series/getSeriesByBrand.jsonp，则请求时，会添加参数brand_code="品牌code"
 
自定义字段：url设置为：https://car-model.souche.com/series/getSeriesByBrand.jsonp?brandCode=，则请求时，会赋值brandCode="品牌code"

两种方式的区别：自定义请求参数时，需要将参数名添加在链接的末尾；


#### [品牌格式](https://car-model.souche.com/brand/brands.jsonp&callback=_jsonp0)
```
{
    code: '品牌的编码',
    name: '品牌的名称',
    initialsLetter: '品牌拼音首字母',
    image: '品牌的图片'
}
```

#### [车系格式](https://car-model.souche.com/series/getSeriesByBrand.jsonp?brand_code=brand-12&callback=_jsonp1)
```
{
    code: '车系的编码',
    name: '车系的名称',
    subBrandName:'车系子品牌名称' // 车系需要分类时请传入
}
```

#### [车型格式](https://car-model.souche.com/model/getModelBySeries.jsonp?series_code=series-50440&callback=__jsonp2)
```
{
    code: '车型的编码',
    name: '车型的名称',
    modelYear: '车型的年份'
}
```

#### 预选择参数
<span id="activedValue">activedValue(预选中数据格式)/selected事件返回值</span>
选择了不限品牌，或者全部品牌:
```
{
    isAllBrandSelected: true
}
```
品牌，车型，车系均为单选的情况下:
```
{
    brand: {
        code: "brand-15",
        name: "奥迪",
        image: "http://img.souche.com/files/carproduct/brand/brand-15.png"
    },
    series: {
        code: "series-51093",
        name: "奥迪Q2L"
    },
    model: {
        code: "228513",
        name: "2018款 奥迪Q2L 35TFSI 时尚动感型"
    }
}
```
品牌，车型，车系存在多选的情况下:
```
{
    brand: [{
        code: "brand-15",
        name: "奥迪",
        image: "http://img.souche.com/files/carproduct/brand/brand-15.png",
        series: [{
            code: "series-51093",
            name: "奥迪Q2L",
            model: [{
                code: "228513",
                name: "2018款 奥迪Q2L 35TFSI 时尚动感型"
            }]
        }]
    }]
}
```
> 在场景2的情况下，选中车系就返回时，没有model字段; activedValue,通过model字段有没有值判断之前是选择到车系还是选择到车型

