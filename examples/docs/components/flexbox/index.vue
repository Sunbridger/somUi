<template>
    <div>
        <p>水平</p>
        <som-flexbox>
            <som-flexbox-item><div class="flex-demo">1</div></som-flexbox-item>
            <som-flexbox-item><div class="flex-demo">2</div></som-flexbox-item>
            <som-flexbox-item><div class="flex-demo">3</div></som-flexbox-item>
            <som-flexbox-item><div class="flex-demo">4</div></som-flexbox-item>
            <som-flexbox-item><div class="flex-demo">5</div></som-flexbox-item>
        </som-flexbox>

        <p>水平无间隙</p>
        <som-flexbox :gutter="0">
            <som-flexbox-item><div class="flex-demo">1</div></som-flexbox-item>
            <som-flexbox-item><div class="flex-demo">2</div></som-flexbox-item>
            <som-flexbox-item><div class="flex-demo">3</div></som-flexbox-item>
            <som-flexbox-item><div class="flex-demo">4</div></som-flexbox-item>
        </som-flexbox>

        <p>垂直</p>
        <som-flexbox orient="vertical">
            <som-flexbox-item><div class="flex-demo">1</div></som-flexbox-item>
            <som-flexbox-item><div class="flex-demo">2</div></som-flexbox-item>
        </som-flexbox>

        <p>网格</p>
        <som-flexbox>
            <som-flexbox-item :span="4"><div class="flex-demo">1/3</div></som-flexbox-item>
            <som-flexbox-item><div class="flex-demo">2/3</div></som-flexbox-item>
        </som-flexbox>
   
        <p>flex-wrap</p>
        <som-flexbox wrap="wrap">
            <som-flexbox-item :span="1/3"><div class="flex-demo">1/3</div></som-flexbox-item>
            <som-flexbox-item :span="1/3"><div class="flex-demo">1/3</div></som-flexbox-item>
            <som-flexbox-item :span="1/3"><div class="flex-demo">1/3</div></som-flexbox-item>
            <som-flexbox-item :span="1/3"><div class="flex-demo">1/3</div></som-flexbox-item>
            <som-flexbox-item :span="1/3"><div class="flex-demo">1/3</div></som-flexbox-item>
            <som-flexbox-item :span="1/3"><div class="flex-demo">1/3</div></som-flexbox-item>
            <som-flexbox-item :span="1/3"><div class="flex-demo">1/3</div></som-flexbox-item>
            <som-flexbox-item :span="1/3"><div class="flex-demo">1/3</div></som-flexbox-item>
            <som-flexbox-item :span="1/3"><div class="flex-demo">1/3</div></som-flexbox-item>
        </som-flexbox>

    </div>
</template>

<style scoped> 
p {
    margin: 10px;
    padding: 0;
    font-size: 12px;
    color: #666;
}
.flex-demo {
  text-align: center;
  background-color: #D9D9D9;
  border-radius: 4px;
  background-clip: padding-box;
  line-height: 32px;
}
</style>
