<template>
    <div>

        {{message}}-----{{this.$store.state.count}}----{{count}}
        <br>
        <h1>news~~~</h1>
        <br>
        <button @click="getMsg()">点击获取信息</button>

        <br>
        <br>
        <button @click="getCount()">设置count值</button>
        <br>
        <br>


        <input type="text" value=""/>

        <br>
        <a href="javascript:void(0)" @click="toLogin()">跳转到登录页面---</a>

    </div>
</template>

<script>

    import { mapState } from 'vuex';

    export default {
        name: "news",
        data(){
            return{

            }
        },
        // computed: {
        //     ...mapState([
        //         'message'
        //     ])
        // },
        computed:mapState([
            'message','count'
        ]),
        methods:{
          getMsg(){
              this.$store.commit('message',"this-is-news");
          },
            getCount(){
                this.$store.commit('inCount')
            },
            toLogin(){
              // this.$router.push({
              //     path:"/spa/login"
              // })
                $app.$router.push({
                    name:"login",
                    query:{
                        next: $app.$route.name
                    }
                });
                //$app or  this == this
            }
        },
        mounted(){
            //console.log(this.$route.meta.keepAlive)

        }



    }
</script>

<style scoped>

</style>