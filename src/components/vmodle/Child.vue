<template>
    <div class="components-vmodle-child">
        <input type="text" :value="value" :placeholder="placeholder" @input="input" />
    </div>
</template>

<script>
    export default {
        name: "Child",
        props:[
            'placeholder',
            'value'
        ],
        computed:{
            // currentValue:function () {
            //     return this.value
            // }
        },
        methods:{
            input:function(val){
                //console.log(val,"[[]");
                //console.log(val.target);
                this.$emit('input', val.target.value);
                // var value = event.target.value;
                // this.$emit('input', value); //触发 input 事件，并传入新值
            }
        }
    }
</script>

<style lang="scss" ref="stylesheet/scss" scoped>
div.components-vmodle-child{
    padding: 20px;
    input{
        border: 1px solid saddlebrown;
    }
}
</style>