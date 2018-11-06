<template>
    <div>
        <h2>~~~HomeChild~~~~~</h2>
        <br>
        <br>
        <hr>

        {{vmsg}}
        <br>
        <button @click="vhomeFun()" class="vhomechild-button">获取home.vue方法</button>

    </div>
</template>

<script>
    export default {
        name: "HomeChild",
        data(){
            return{
                vhomeChildmsg:"这是houmechild 的属性"
            }
        },
        methods:{
            vhomeChildFun(){
                alerr("这是homeChild方法！！！")
            }
        },
        mounted(){

        },
        props:['vmsg','vhomeFun']//传值。。。
    }
</script>

<style scoped>
    .vhomechild-button{
        border: 1px solid #fefefe;
    }
</style>