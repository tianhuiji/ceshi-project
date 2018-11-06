<template>
    <div>
ffffff
        <br>
        <button @click="clickFun">点击</button>
        <br>

    </div>
</template>

<script>
    import axios from "utils/axios";
    const API_PATH = process.env.apis.default.path;
     const UPLOAD_PIC_URL = `${API_PATH}/api/jumpnewwindow`;

    //var newWin = window.open('about:blank');

    // 建议给一个提示信息
    //newWin.document.body.innerHTML = '加载中...';
    // ajax().done(function() {
    //     // 重定向
    //     newWin.location.href = 'url';
    // });

    export default {
        name: "JumpNewWindow",
        data() {
          return {

          }
        },
        mounted(){

        },
        methods:{
            init() {

                var newWin = window.open('about:blank');
                newWin.document.body.innerHTML = '加载中...';
                axios
                    .get(UPLOAD_PIC_URL)
                    .then(response => {

                        let href = response.data.value.resultUrl;

                        //window.open(href);
                        // this.$router.push({
                        //     path: href
                        // })
                        //console.log('///')
                        //this.jumpFun();

                        newWin.location.href = href;
                        alert(111)

                    })
            },
            clickFun() {
                this.init();
            }
        },

    }
</script>

<style scoped>

</style>