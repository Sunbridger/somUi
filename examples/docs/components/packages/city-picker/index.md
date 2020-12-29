## CityPicker city-picker

### 代码演示

::: demo city-picker
scene设置为1 ，即默认值，选择到省份
:::

### API
注意：涉及到参考的，请按括号中的标题搜索本页面

#### CityPicker
| 参数 | 说明 | 类型  | 可选值 | 是否必填 | 默认值 |
| -- | --------- | ----- | --- | ---- | -- |
| scene | 地区选择器场景选择，批量设置选择器属性 | Number/string | 1: 选择到单个省份结束 2: 单个省份，选择到单个城市 3:单省份，单城市，单城区或者县 4: 单个省份，选择多个城市 5:选择单/多个省份 6:选择多组省份的多个城市; | 否 | 1 |
| activedValue | 预选中的数据, [格式具体说明](#/packages/city-picker#yu-xuan-ze-can-shu) | object | — | 否 | 无 |
| provinceDataUrl | 省份请求地址，数据格式参考（省份/城市/城区传入数据格式）或外部请求函数返回promise对象即可 | string/function  | — | 否 | https://dic.souche.com/api/v1/queryDictionaries/load.jsonp?type=area |
| cityDataUrl | 城市请求地址,数据格式参考；url的参数，parent，省份的code(允许自定义传参字段名，参考"自定义URL参数") 或外部请求函数返回promise对象即可  | string/function  | — | 否 | https://dic.souche.com/api/v1/queryDictionaries/load.jsonp?type=area |
| districtDataUrl | 城区请求地址,数据格式参考;url的参数，parent，城市的code(允许自定义传参字段名，参考"自定义URL参数") 或外部请求函数返回promise对象即可  | string/function  | — | 否 | https://dic.souche.com/api/v1/queryDictionaries/load.jsonp?type=area |
| showAlphaToast | 点击字母表的字母时，是否在页面中间显示字母的toast | boolean | — | 否 | true |
| showAll | scene为1的情况下，允许配置是否显示全国选项;scene为其他值时设置无效； | boolean | — | 否 | true |
| showUnlimitCity | scene为1,2的情况下，允许配置是否显示不限城市选项;scene为其他值时设置无效； | boolean | — | 否 | true |
| showUnlimitDistrict | scene为1,2,3的情况下，允许配置是否显示不限区／县选项;scene为其他值时设置无效； | boolean | — | 否 | true |
| labelActivedColor  | 选项被选中时的颜色 | string  | — | 否 | #FF571A |
| confirmButtonColor | 多选情况下，底部确认按钮的颜色 | string  | — | 否 | #FF571A |

#### CityPicker Events
| 事件名  | 说明 | 返回值 |
| --- | ---- | -------- |
| onSelected | 选择完成事件 | 选中的省份或者城市数据;数据格式参考(activedValue(预选中数据格式)/selected事件返回值) |
| onSelectProvince | 选择省份变化 | 选中的省份数据; |

#### 组件中的部分方法说明
| 方法名 | 说明  | 方法定义 | 参数格式 | 返回值 |
| --- | --- | -------- | ------- | ------ |
| openCitySection | 打开城市选择，显示某个省份下的城市数据 | function(provinceObj) | { code: '01977', name: '广东省'} | 无 |

#### 组件slot
| slot名称 | 说明 |
| -------- | ---- |
| 无 | 在该部分展示我的历史等模块，使用<a href="#/components/selector-item">selector-item</a>子组件，可以为该部分内容定义索引 |
| loading | 在第一级页面数据请求到前展示loading，位于组件正中间位置 | 

### 贡献者
| 类型 | 参与者 |
|---------- |-------------------------------- |
| 维护者 | 许悦 |
| 设计师 | 王菲菲 |

#### 预选择参数
<span id="activedValue">activedValue(预选中数据格式)/selected事件返回值</span>

选中全国的情况:
```
{
    isWholeCountrySelected: true
}
```

```
省份，城市，区或者县均为单选的情况下:
{
    province: {
        code: '01977',
        name: '广东'
    },
    city: {
        code: '02052',
        name: '江门'
    },
    district: {
        code: '440781',
        name: '台山市'
    }
}
```

```
省份或者城市多选的情况下:
{
    province: [{
        code: '01977',
        name: '广东',
        city: [{
            code: '02052',
            name: '江门',
            district: [{
                code: '440781',
                name: '台山市'
            }]
        }]
    }]
}
```

#### 自定义城市传参字段方式（城区自定义请求参数参考此配置方式）：

默认情况下：url设置为：https://dic.souche.com/api/v1/queryDictionaries/load.jsonp?type=area，则请求时，会添加参数parent="省份code"

自定义字段：url设置为：https://dic.souche.com/api/v1/queryDictionaries/load.jsonp?type=area&provinceCode=，则请求时，会赋值provinceCode="省份code"

两种方式的区别：自定义请求参数时，需要将参数名添加在链接的末尾；


#### [省份/城市/城区传入数据格式](https://dic.souche.com/api/v1/queryDictionaries/load.jsonp?type=area&callback=__jsonp0)

> extProps.letter字段，对于省份来说是必须的字段；城市或者区是非必须字段；extProps.letter字段，可以为一级的字段letter，不需要作为extProps的子字段；
```
{
    code: '',
    name: '',
    extProps: {
        letter: ''
    }
}
```
