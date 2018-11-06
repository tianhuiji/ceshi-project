<template>
    <div class="components-click-popup">
        <div class="slide" v-show="visible">
            显示内容---ov1--{{lable}}---{{visible}}
            <br>
            <div class="text-right">
                <a href="####"  class="closed" @click="closed">关闭窗口</a>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "popup",
        props:[
            'lable', 'hide',
            'visible'
        ],
        methods:{
            closed(){
                this.$emit("update:visible",false);
            }
        }
    }
</script>

<style lang="scss" ref="stylesheet/scss" scoped>
.components-click-popup{
    .slide{
        width: 100%;
        height: 1rem;
        border: 1px solid #000;
    }
    .text-right{
        text-align: right;
    }
    .closed{
        padding: 0.2rem;
        background-color: antiquewhite;
    }
}
</style>