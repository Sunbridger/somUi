<template>
    <div>
        <p>基本用法</p>
        <som-list>
            <som-input placeholder="提示文字" title="注册日期"></som-input>
            <som-input placeholder="请输入" title="电话号码" required></som-input>
            <som-input title="二至五字" :min="2" :max="5"></som-input>
            <som-input title="隐藏清除" :show-clear="false" autocapitalize="characters"></som-input>
            <som-input title='禁止输入' disabled v-model="disabledValue"></som-input>
        </som-list>

        <p>自定义右侧，使用 label-width 使左侧宽度一致</p>
        <som-list label-width="60px">
            <som-input placeholder="提示文字" title="日期">
                <som-icon name="date" slot="right"></som-icon>
            </som-input>
            <som-input title='价格区间' type="number-range" v-model="rangeVal" @on-change="change">
                <span slot="right" :style="{ 'color': '#1a1a1a' }">万元</span>
            </som-input>
            <som-input title="验证码" class="weui-vcode">
                <som-button slot="right" mini>获取验证码</som-button>
            </som-input>
        </som-list>

        <p>定义检验类型</p>
        <som-list>
            <som-input :is-type="checkPhone" title="电话号码" type="number"></som-input>
            <som-input :is-type="checkIdCard" title="身份证号" type="number"></som-input>
        </som-list>

        <p>mask 格式化</p>
        <som-list>
            <som-input title="手机格式" mask="999 9999 9999" v-model="maskValue" :max="13"></som-input>
            <som-input title="座机格式" mask="9999 9999" v-model="maskValue2" :max="9"></som-input>
            <som-input title="货币格式" mask="9,999,999,9.00" v-model="maskValue3" :max="14"></som-input>
            <som-input title="日期格式" mask="9999-99" v-model="maskValue4"></som-input>
        </som-list>

        <p>debounce = 1000</p>
        <som-list>
            <som-input title='debounce' :debounce="1000" @on-change="change" v-model="debounceValue"></som-input>
        </som-list>

        <p>事件</p>
        <som-list>
            <som-input title="focus事件" placeholder="focus me!" :show-clear="true" @on-focus="onFocus"></som-input>
            <som-input label-width="72px" title="回车事件" type="text" v-model="enterText" @on-enter="onEnter"></som-input>
        </som-list>

        <p>确认输入</p>
        <som-list>
            <som-input title="请输入6位数字" type="number" placeholder="" v-model="password" :min="6" :max="6" @on-change="change"></som-input>
            <som-input title="请确认6位数字" v-model="password2" type="number" placeholder="" :equal-with="password"></som-input>
        </som-list>
        <br>
    </div>
</template>

<script>
export default {
    data () {
        return {
            password: '123465',
            password2: '',
            enterText: '',
            valid1: false,
            valid2: false,
            rangeVal: {
                min: 12,
                max: 33
            },
            checkPhone: function (value) {
                return {
                    valid: (/^1[3|4|5|8][0-9]\d{4,8}$/).test(value),
                    msg: '请输入正确电话号码'
                }
            },
            checkIdCard: function (value) {
                return {
                    valid: (/\d{17}[\dX]$/).test(value) && value.length === 18,
                    msg: '请输入正确证件号'
                }
            },
            style: '',
            disabledValue: 'hello',
            debounceValue: '',
            maxValue: '',
            maskValue: '13545678910',
            maskValue2: '80829876',
            maskValue3: '12233112',
            maskValue4: '201807'
        }
    },
    methods: {
        change (val) {
            console.log('on change', val)
        },
        onBlur (val) {
            console.log('on blur', val)
        },
        onFocus (val, $event) {
            console.log('on focus', val, $event)
        },
        onEnter (val) {
            console.log('click enter!', val)
        }
    }
};
</script>

<style scoped>
p {
    margin: 10px;
    padding: 0;
    font-size: 12px;
    color: #666;
}

</style>
