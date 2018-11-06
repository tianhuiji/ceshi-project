<template>
    <div>
        ~~~
    </div>
</template>

<script>

    const API_PATH_EGGSHELL = process.env.apis.eggshell.path;
    const API_PATH_APP = process.env.apis.app.path;

    const API_LIST = `${API_PATH_APP}/api/v1/bill/detail`;


    export default {
        name: "detail",
        data(){
            return{
                list:[]
            }
        },
        methods:{

        }
        ,
        mounted(){

        }
    }
</script>

<style scoped>

</style>