<template>
    <div>
        {{this.$store.state.message}}----{{this.$store.state.count}}


        <br>
        <h1>~~~list</h1>
        <br>

        {{message}}---{{count}}

        <br>

        <h4>不需要保持--keep-alive </h4>
        <input type="text" value=""/>

    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data () {
            return {
                title: 'ERROR!',
            }
        }
        ,
        computed:{
            ...mapState([
                         'message','count'
                     ])
        } ,
        // mounted: function () {
        //     this.$store.commit('message', '404 Not Found！');
        // }



    }
</script>

<style scoped>

</style>