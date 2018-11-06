<template>
    <div>
        <h2>~~~home---页面</h2>
        <br>
        <br>
        <hr>
        <br>

        <router-view :vmsg="msg" :vhomeFun="vhomeFun" ref="child"></router-view>

        <!--<div id="box">-->
                <!--aaa-->
        <!--</div>-->
        <button @click="getRefFun()" ref="button">获取ref</button>
    </div>
</template>

<script>
    import ft from "../../module/index";
    export default {
        name: "Home",
        data(){
            return{
                msg:"这是的homevue-信息"
            }
        },
        methods:{
            vhomeFun(){
                alert("这是home.vue的方法")
            },
            getRefFun(){
                console.log(this.$refs.child)
            }
        },
        components:{

        },
        mounted(){
            // var box = `测试内容`;
            // if (2>1){
            //     box +=`2>1`;
            // }else{
            //     box +=`false`;
            // }
            //
            // document.getElementById("box").innerHTML=ft();

            console.log(this.$refs.child)

        }
    }



</script>

<style scoped>

</style>