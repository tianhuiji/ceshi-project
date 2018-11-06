<template>
    <div class="components-click-popup">
        <div class="slide" >
            显示内容---ov1--{{lable}}---{{visible}}
            <br>
            <br>
            <div class="text-right">
                <a href="####"  class="closed" @click="submit">事件触发</a>
            </div>
            <br>
            <input typeof="text" ref="input" value=""/>
            <br>

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
            submit(){

            },
            getVal(){
                 this.$refs.input.focus();
            }
        }
    }
</script>

<style lang="scss" ref="stylesheet/scss" scoped>
    .components-click-popup{
        border: 1px solid #000;
        .slide{
            width: 100%;
            height: 3rem;


        }
        .text-right{
            text-align: right;
        }
        .closed{
            padding: 0.2rem;
            background-color: antiquewhite;
        }

        &.redborder{
            border:1px solid red;
        }
        input{
            border: 1px solid #666;
        }
    }
</style>