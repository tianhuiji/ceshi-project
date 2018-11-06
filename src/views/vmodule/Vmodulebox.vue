<template>
    <div>
        <h2>parent</h2>
        <hr>
        {{values}}
        <c-child placeholder="默认提示" v-model="values"></c-child>
        <br>
        {{email}}
        <c-child placeholder="地址email" v-model="email"></c-child>
        <button style="border: 1px saddlebrown solid" @click="fun">点点点</button>
    </div>
</template>

<script>
    import cChild from 'components/vmodle/Child';

    export default {
        name: "vmodulebox",
        data(){
          return{
            values:"默认提示",
              email:"邮箱地址@"
          }
        },
        methods:{
          fun(){
              console.log(this.email)
          }
        },
        components:{
             cChild
        }
    }
</script>

<style scoped>

</style>