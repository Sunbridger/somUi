const fs = require('fs');
const path = require('path');

const getTemplate = (name) => (`<style lang="css" scoped>

</style>

<template>
    <view>
    </view>
</template>

<script>

export default {
    name: 'pk-${name}'
}
</script>

`)
// 创建目录

function creatVue(name) {
    if (!name) return;
    const dir = path.resolve(__dirname, '../src/components', name);
    fs.mkdir(dir, (error) => {
        if (!error) {
            console.log('创建目录成功, 开始在该目录下新建文件');
            fs.writeFile(`${dir}/${name}.vue`, getTemplate(name), 'utf8', (err) => {
                if (!err) {
                    console.log('vue文件写入完成');
                    creatStyle(name);
                }
            });
        }
    });
}

function creatStyle(name) {
    const stylePath = path.resolve(__dirname, `../src/styles/${name}.css`);
    fs.writeFile(stylePath, '', 'utf8', (err) => {
        if (!err) {
            console.log('css文件写入完成');
        }
    });
}

creatVue();
